"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMeasurementStore } from "@/lib/measurement-store";

const formSchema = z.object({
  strike: z.number().min(0).max(360),
  dip: z.number().min(0).max(90),
  type: z.string(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface MeasurementFormProps {
  onComplete?: () => void;
}

export function MeasurementForm({ onComplete }: MeasurementFormProps) {
  const addMeasurement = useMeasurementStore((state) => state.addMeasurement);

  const form = useForm<FormValues>({
    defaultValues: {
      strike: 0,
      dip: 0,
      type: "bedding",
      notes: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    addMeasurement({
      strike: values.strike,
      dip: values.dip,
      type: values.type,
      notes: values.notes,
    });

    form.reset();
    onComplete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="strike"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Strike (°)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="0-360" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Measure clockwise from north (0-360°)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dip (°)</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    placeholder="0-90" 
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>Angle from horizontal (0-90°)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Structure Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select structure type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bedding">Bedding</SelectItem>
                  <SelectItem value="foliation">Foliation</SelectItem>
                  <SelectItem value="joint">Joint</SelectItem>
                  <SelectItem value="fault">Fault</SelectItem>
                  <SelectItem value="vein">Vein</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input placeholder="Additional observations..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="submit">Add Measurement</Button>
          {onComplete && (
            <Button type="button" variant="outline" onClick={onComplete}>
              Complete Measurements
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
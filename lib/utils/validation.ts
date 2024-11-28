import * as z from "zod";

export const measurementSchema = z.object({
  strike: z.string().transform(val => parseInt(val)).pipe(
    z.number().min(0).max(360)
  ),
  dip: z.string().transform(val => parseInt(val)).pipe(
    z.number().min(0).max(90)
  ),
  type: z.string(),
  notes: z.string().optional(),
});

export type MeasurementFormData = z.infer<typeof measurementSchema>;
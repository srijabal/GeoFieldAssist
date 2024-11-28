import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { type Measurement, useMeasurementStore } from "@/lib/measurement-store";

export function MeasurementsTable() {
  const { measurements, deleteMeasurement, clearMeasurements } = useMeasurementStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={clearMeasurements}
          disabled={measurements.length === 0}
        >
          Clear All
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Strike</TableHead>
              <TableHead>Dip</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {measurements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No measurements recorded
                </TableCell>
              </TableRow>
            ) : (
              measurements.map((measurement) => (
                <TableRow key={measurement.id}>
                  <TableCell>{measurement.id}</TableCell>
                  <TableCell>{measurement.strike}°</TableCell>
                  <TableCell>{measurement.dip}°</TableCell>
                  <TableCell className="capitalize">{measurement.type}</TableCell>
                  <TableCell>{measurement.notes || "-"}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMeasurement(measurement.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
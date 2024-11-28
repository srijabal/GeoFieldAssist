import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { useCaptureStore } from "@/lib/capture-store";
import { AnalysisDisplay } from "./analysis-display";
import { format } from "date-fns";

export function CapturesTable() {
  const { captures, deleteCapture, clearCaptures } = useCaptureStore();
  const [selectedCapture, setSelectedCapture] = useState<number | null>(null);

  const selectedData = captures.find(c => c.id === selectedCapture);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={clearCaptures}
          disabled={captures.length === 0}
        >
          Clear All
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Rock Type</TableHead>
              <TableHead>Measurements</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {captures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No captures recorded
                </TableCell>
              </TableRow>
            ) : (
              captures.map((capture) => (
                <TableRow key={capture.id}>
                  <TableCell>
                    {format(new Date(capture.timestamp), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>{capture.analysis.rockType}</TableCell>
                  <TableCell>{capture.measurements.length} records</TableCell>
                  <TableCell>
                    {capture.transcription ? (
                      <span className="text-sm text-muted-foreground">
                        {capture.transcription.slice(0, 50)}...
                      </span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedCapture(capture.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Capture Details</DialogTitle>
                          </DialogHeader>
                          {selectedData && (
                            <div className="grid gap-6">
                              <div className="aspect-video relative bg-muted rounded-lg overflow-hidden h-40">
                                <img
                                  src={selectedData.imageUrl}
                                  alt="Rock sample"
                                  className="object-cover"
                                />
                              </div>
                              
                              <AnalysisDisplay analysis={selectedData.analysis} />
                              
                              {selectedData.transcription && (
                                <div className="space-y-2">
                                  <h3 className="font-semibold">Voice Notes</h3>
                                  <p>{selectedData.transcription}</p>
                                  {selectedData.audioUrl && (
                                    <audio controls src={selectedData.audioUrl} className="w-full" />
                                  )}
                                </div>
                              )}
                              
                              {selectedData.measurements.length > 0 && (
                                <div className="space-y-2">
                                  <h3 className="font-semibold">Measurements</h3>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Strike</TableHead>
                                        <TableHead>Dip</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Notes</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {selectedData.measurements.map((m, i) => (
                                        <TableRow key={i}>
                                          <TableCell>{m.strike}°</TableCell>
                                          <TableCell>{m.dip}°</TableCell>
                                          <TableCell className="capitalize">{m.type}</TableCell>
                                          <TableCell>{m.notes || "-"}</TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteCapture(capture.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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

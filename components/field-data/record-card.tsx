"use client";

import Image from "next/image";
import { format } from "date-fns";
import { Mic, MapPin, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { FieldRecord } from "@/lib/stores/field-data-store";

interface RecordCardProps {
  record: FieldRecord;
  onDelete: (id: number) => void;
}

export function RecordCard({ record, onDelete }: RecordCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Record #{record.id}</CardTitle>
            <CardDescription>
              {format(new Date(record.timestamp), "PPP p")}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => onDelete(record.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src={record.imageUrl}
            alt={`Rock sample #${record.id}`}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold">Analysis</h4>
          <p className="text-sm text-muted-foreground">{record.description}</p>
        </div>

        {record.strike && record.dip && (
          <div className="flex gap-2">
            <Badge variant="secondary">Strike: {record.strike}°</Badge>
            <Badge variant="secondary">Dip: {record.dip}°</Badge>
            {record.type && (
              <Badge variant="outline" className="capitalize">
                {record.type}
              </Badge>
            )}
          </div>
        )}

        {record.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {record.location.latitude.toFixed(6)}, {record.location.longitude.toFixed(6)}
            </span>
          </div>
        )}

        {record.voiceNotes.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Voice Notes
              </h4>
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {record.voiceNotes.map((note) => (
                    <Card key={note.id}>
                      <CardContent className="p-3">
                        <p className="text-sm">{note.transcription}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(note.timestamp), "p")}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        {record.notes && (
          <p className="text-sm text-muted-foreground">{record.notes}</p>
        )}
      </CardFooter>
    </Card>
  );
}
"use client";

import { useFieldDataStore } from "@/lib/stores/field-data-store";
import { RecordCard } from "@/components/field-data/record-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";

export default function FieldDataPage() {
  const { records, deleteRecord } = useFieldDataStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6" />
            <CardTitle>Field Data Records</CardTitle>
          </div>
          <CardDescription>View and manage your collected field data</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            onDelete={deleteRecord}
          />
        ))}
      </div>
    </div>
  );
}
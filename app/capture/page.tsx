"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaptureFlow } from "@/components/capture/capture-flow";
import { CapturesTable } from "@/components/capture/table";
import { PlusCircle, Table as TableIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Rock Structure Analysis</h1>
      <Tabs defaultValue="capture">
        <TabsList>
          <TabsTrigger value="capture">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Capture
          </TabsTrigger>
          <TabsTrigger value="data">
            <TableIcon className="h-4 w-4 mr-2" />
            Captured Data
          </TabsTrigger>
        </TabsList>
        <TabsContent value="capture" className="mt-6">
          <CaptureFlow />
        </TabsContent>
        <TabsContent value="data" className="mt-6">
          <CapturesTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}

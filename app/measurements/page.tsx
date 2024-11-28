"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2, List, Circle } from "lucide-react";
import { Stereonet } from "@/components/stereonet";
import { MeasurementForm } from "@/components/measurement-form";
import { MeasurementsTable } from "@/components/measurements-table";
import { useMeasurementStore } from "@/lib/measurement-store";

export default function MeasurementsPage() {
  const measurements = useMeasurementStore(state => state.measurements);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-6 w-6" />
              <CardTitle>Structural Measurements</CardTitle>
            </div>
            <CardDescription>Record and analyze structural measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <MeasurementForm />
              <Stereonet measurements={measurements} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <List className="h-6 w-6" />
              <CardTitle>Measurement Data</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table">
              <TabsList className="mb-4">
                <TabsTrigger value="table">
                  <List className="h-4 w-4 mr-2" />
                  Table View
                </TabsTrigger>
                <TabsTrigger value="stereonet">
                  <Circle className="h-4 w-4 mr-2" />
                  Stereonet
                </TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <MeasurementsTable />
              </TabsContent>
              <TabsContent value="stereonet">
                <div className="flex justify-center">
                  <Stereonet measurements={measurements} />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
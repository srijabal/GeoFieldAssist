import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map as MapIcon } from "lucide-react"

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapIcon className="h-6 w-6" />
            <CardTitle>Field Location Map</CardTitle>
          </div>
          <CardDescription>View and manage your geological field locations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[600px] w-full bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Map integration coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
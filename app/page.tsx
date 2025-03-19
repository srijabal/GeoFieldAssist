import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mountain, Camera, Mic, Map } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <Mountain className="h-16 w-16 mb-4 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to GeoFieldAssist
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Your AI-powered geological field assistant for advanced rock classification,
          data collection, and visualization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:w-1/2 lg:mx-auto lg:gap-12 lg: gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="h-5 w-5 mr-2" />
              Rock Classification
            </CardTitle>
            <CardDescription>
              Upload images for AI-powered rock identification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/capture">
              <Button className="w-full">
                Start Capturing
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Map className="h-5 w-5 mr-2" />
              Measurements
            </CardTitle>
            <CardDescription>
            Record structural measurements and observations

            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/measurements">
              <Button className="w-full" variant="secondary">
                Record Measurements
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to start your geological fieldwork?
        </h2>
        <Link href="/capture">
          <Button size="lg" className="animate-pulse">
            Begin Data Collection
          </Button>
        </Link>
      </div>
    </div>
  )
}
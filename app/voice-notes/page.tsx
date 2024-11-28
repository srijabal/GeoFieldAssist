import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VoiceNotesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Mic className="h-6 w-6" />
            <CardTitle>Voice Notes</CardTitle>
          </div>
          <CardDescription>Record and transcribe field observations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid place-items-center gap-4 p-8">
            <Button size="lg" variant="outline" className="h-24 w-24 rounded-full">
              <Mic className="h-8 w-8" />
            </Button>
            <p className="text-muted-foreground">Press to start recording</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
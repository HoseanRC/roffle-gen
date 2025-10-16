import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Card } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { generateDescription } from "@/lib/generator"

function App() {
  const [roffleText, setRoffleText] = useState("Hey folks...")
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-full flex-col items-center justify-center bg-background">
        <Card className="flex flex-col items-center justify-center gap-4 p-8 w-150 h-150">
          <div className="text-2xl font-bold h-full text-center content-center">
            {roffleText}
          </div>
          <Button variant="secondary" className="w-fit" onClick={() => {
            setRoffleText(generateDescription())
          }}>
            Generate
          </Button>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default App

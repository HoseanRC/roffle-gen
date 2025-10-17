import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Card } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { generateDescription } from "@/lib/generator"
import { motion, AnimatePresence } from "motion/react"
import { GitBranch, PenLine } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'

const GOOGLE_FONTS = [
  "Lobster",
  "Poppins",
  "Merriweather",
  "Montserrat",
  "Playfair Display",
  "Roboto Slab",
  "Roboto Mono",
  "Licorice",
  "Josefin Sans",
  "Archivo Black",
  "Oswald",
  "Raleway",
  "Cormorant Garamond",
  "Source Sans Pro",
  "BBH Sans Bogle",
  "Alfa Slab One",
  "Play",
  "Frijole",
]


function App() {
  const [roffleText, setRoffleText] = useState("Hey folks...")
  const [fontFamily, setFontFamily] = useState<string>('Inter')

  useEffect(() => {
    GOOGLE_FONTS.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@400;700&display=swap`
      document.head.appendChild(link);
    });
  }, []);

  async function handleGenerate() {
    setRoffleText(generateDescription())
    setFontFamily(GOOGLE_FONTS[Math.floor(Math.random() * GOOGLE_FONTS.length)])
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-full flex-col items-center justify-center bg-background">
        <Card
          className="flex flex-col items-center justify-center gap-4 p-8 h-full w-120 max-w-full transition-all duration-300 overflow-hidden"
        >
          <Button variant="secondary" className="w-fit content-center" onClick={() =>
            window.open("https://github.com/hoseanrc/roffle-gen", "_blank")
          }>
            <SiGithub /> GitHub <GitBranch />
          </Button>
          <div className='h-full w-full flex items-center justify-center overflow-auto tp-10'>
            <AnimatePresence mode="wait">
              <motion.p
                key={roffleText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-2xl font-bold max-h-full"
                style={{ fontFamily: `'${fontFamily}', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial` }}
              >
                {roffleText}
              </motion.p>
            </AnimatePresence>
          </div>
          <Button variant="secondary" className="w-fit" onClick={handleGenerate}>
            <PenLine /> Generate
          </Button>
        </Card>
      </div>
    </ThemeProvider>
  )
}

export default App

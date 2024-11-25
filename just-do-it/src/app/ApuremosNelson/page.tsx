"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayIcon, PauseIcon, RotateCcwIcon } from 'lucide-react'

export default function CountdownTimer() {
  const [time, setTime] = useState(75 * 60) // 1 hora y 15 minutos en segundos
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      setIsRunning(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, time])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTime(75 * 60)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Cronómetro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold text-center" aria-live="polite">
          {formatTime(time)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button onClick={toggleTimer} aria-label={isRunning ? "Pausar cronómetro" : "Iniciar cronómetro"}>
          {isRunning ? <PauseIcon className="h-4 w-4 mr-2" /> : <PlayIcon className="h-4 w-4 mr-2" />}
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Button>
        <Button onClick={resetTimer} variant="outline" aria-label="Reiniciar cronómetro">
          <RotateCcwIcon className="h-4 w-4 mr-2" />
          Reiniciar
        </Button>
      </CardFooter>
    </Card>
  )
}


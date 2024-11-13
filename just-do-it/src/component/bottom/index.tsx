'use client'

import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-4 text-foreground">Test Button</h1>
      <Button variant="default">Click me</Button>
      <Button variant="destructive" className="mt-2">Danger</Button>
      <Button variant="outline" className="mt-2">Outline</Button>
      <Button variant="secondary" className="mt-2">Secondary</Button>
      <Button variant="ghost" className="mt-2">Ghost</Button>
      <Button variant="link" className="mt-2">Link</Button>
    </div>
  )
}
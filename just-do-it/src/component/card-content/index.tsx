import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileIcon, ImageIcon, VideoIcon } from 'lucide-react'

interface ContentCardProps {
  id: string
  url: string
  type: 'image' | 'pdf' | 'video'
}

export function ContentCard({ id, url, type }: ContentCardProps) {
  const Icon = type === 'image' ? ImageIcon : type === 'pdf' ? FileIcon : VideoIcon

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center h-40 bg-muted rounded-md">
          <Icon className="h-20 w-20 text-muted-foreground" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.open(url, '_blank')}>
          Ver {type === 'image' ? 'Imagen' : type === 'pdf' ? 'PDF' : 'Video'}
        </Button>
        <span className="text-sm text-muted-foreground">ID: {id}</span>
      </CardFooter>
    </Card>
  )
}

export default ContentCard
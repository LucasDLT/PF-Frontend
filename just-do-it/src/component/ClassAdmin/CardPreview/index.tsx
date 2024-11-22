import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, User, Calendar } from 'lucide-react'

interface ClassPreviewProps {
  classData: {
    name: string
    description: string
    image: string
    location: string
    teacher: string
    schedule: string[]
    capacity: number
  }
}

export function ClassPreview({ classData }: ClassPreviewProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{classData.name}</CardTitle>
        <CardDescription>{classData.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {classData.image && (
          <img src={classData.image} alt={classData.name} className="w-full h-48 object-cover rounded-md" />
        )}
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{classData.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{classData.teacher || 'No asignado'}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>{classData.schedule.join(', ') || 'No hay horarios seleccionados'}</span>
        </div>
      </CardContent>
      <CardFooter>
        <p>Capacidad máxima: {classData.capacity} estudiantes</p>
      </CardFooter>
    </Card>
  )
}


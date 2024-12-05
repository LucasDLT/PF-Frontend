'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


interface ContentItem {
  id: string
  routine: string
  title: string
}

export default function PremiumContent() {

  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN
  const [data, setData] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token, userSession } = useAuth()
  const [shouldFetch, setShouldFetch] = useState(false)
  const ROUTE = useRouter()

  // Verificamos si `token` y `userSession` existen y si la membresía está activa
  useEffect(() => {
    if (!token || !userSession || userSession.membership_status === 'inactive') {
      ROUTE.push("/") // Redirige a la página principal si no está autorizado
    } else {
      setShouldFetch(true)
    }
  }, [token, userSession, ROUTE])

  useEffect(() => {
    if (!shouldFetch) return

    const fetchData = async () => {
      try {
        const response = await fetch(`${DOMAIN}/routines`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [DOMAIN, token, shouldFetch]);

  const getContentType = (url: string) => {
    if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
      return 'image';
    }
    if (url.match(/\.pdf$/)) {
      return 'pdf';
    }
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'video';
    }
    return 'unknown';
  }

  const scrollContent = (elementId: string, direction: 'left' | 'right') => {
    const element = document.getElementById(elementId);
    if (element) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderContent = (type: 'image' | 'pdf' | 'video') => {
    const filteredContent = data.filter(item => getContentType(item.routine) === type)
    const sectionId = `content-${type}`;

    return (
      <div className="relative">
        <div id={sectionId} className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {filteredContent.map(item => (
            <div key={item.id} className="flex-none w-64 h-64 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-[0_0_1px_rgba(255,255,0,0.3)] border-[1px] border-yellow-300 border-opacity-30">
              {type === 'image' && (
                <div className="w-full h-full relative">
                  <Image 
                    src={item.routine} 
                    alt={item.title} 
                    layout="fill" 
                    objectFit="cover"
                  />
                </div>
              )}

              {type === 'pdf' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <h3 className="text-yellow-300 text-center mb-4">{item.title}</h3>
                  <a 
                    href={item.routine} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-yellow-300 hover:text-yellow-100 transition-colors duration-200"
                  >
                    Ver PDF
                  </a>
                </div>
              )}

              {type === 'video' && (
                <div className="w-full h-full">
                  <iframe
                    width="100%"
                    height="100%"
                    src={item.routine.replace("watch?v=", "embed/")}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-yellow-500 hover:text-black transition-colors duration-200"
          onClick={() => scrollContent(sectionId, 'left')}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-yellow-500 hover:text-black transition-colors duration-200"
          onClick={() => scrollContent(sectionId, 'right')}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="flex-none w-64 h-64" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!token) {
    return (
      <Alert>
        <AlertTitle>No autorizado</AlertTitle>
        <AlertDescription>Por favor, inicia sesión para ver el contenido premium.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-800 to-black text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center">Contenido Premium</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Imágenes</h2>
        {renderContent('image')}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">PDFs</h2>
        {renderContent('pdf')}
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Videos</h2>
        {renderContent('video')}
      </section>
    </div>
  )
}

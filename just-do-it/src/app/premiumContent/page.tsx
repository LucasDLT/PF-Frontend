'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context'
import { ContentCard } from '@/component/card-content'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

interface ContentItem {
  id: string
  url: string
  type: 'image' | 'pdf' | 'video'
}

export default function PremiumContent() {
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN
  const [data, setData] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { token } = useAuth()
  const [shouldFetch, setShouldFetch] = useState(false)

  useEffect(() => {
    if (token) {
      setShouldFetch(true)
    }
  }, [token])

  useEffect(() => {
    if (!shouldFetch) return

    const fetchData = async () => {
      try {
        const response = await fetch(`https://${DOMAIN}/routines`, {
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

  const renderContent = (type: 'image' | 'pdf' | 'video') => {
    const filteredContent = data.filter(item => item.type === type)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContent.map(item => (
          <ContentCard key={item.id} {...item} />
        ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-[200px] w-full" />
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
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Contenido Premium</h1>
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


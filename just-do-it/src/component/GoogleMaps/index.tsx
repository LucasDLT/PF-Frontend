"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import styles from './MyMap.module.css'

const containerStyle = {
  width: '100%',
  height: '400px',
}

const center = {
  lat: -32.889458,
  lng: -68.845839,
}

const mendozaBounds = {
  north: -32.0,
  south: -34.0,
  west: -69.6,
  east: -67.5,
}

const libraries: ("places")[] = ['places']

export interface MyMapProps {
  eventLocation: string
  eventAddress: string
  setEventAddress: (address: string) => void
  setEventLocation: (location: string) => void
  mapUrl?: string
}

export default function MyMap({ eventAddress, setEventAddress, setEventLocation, mapUrl }: MyMapProps) {
  const [markerPosition, setMarkerPosition] = useState(center)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    if (mapUrl) {
      const [lat, lng] = mapUrl.split(',').map(Number)
      if (!isNaN(lat) && !isNaN(lng)) {
        setMarkerPosition({ lat, lng })
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng })
        }
      }
    }
  }, [mapUrl])

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      const newLocation = `${lat}, ${lng}`
      setMarkerPosition({ lat, lng })
      setEventLocation(newLocation)

      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          setEventAddress(results[0].formatted_address)
        }
      })
    }
  }, [setEventLocation, setEventAddress])

  const onLoadAutocomplete = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance)
  }, [])

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()

      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location
        const newLocation = `${location.lat()}, ${location.lng()}`

        setMarkerPosition({ lat: location.lat(), lng: location.lng() })
        setEventLocation(newLocation)
        setEventAddress(place.formatted_address || '')

        if (mapRef.current) {
          mapRef.current.panTo(location)
          mapRef.current.setZoom(15)
        }
      }
    }
  }, [autocomplete, setEventLocation, setEventAddress])

  const onLoadMap = useCallback((map: google.maps.Map) => {
    mapRef.current = map
  }, [])

  return (
    <Card className={styles.card}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!} libraries={libraries}>
        <div className={styles.wrapper}>
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
            options={{
              bounds: mendozaBounds,
              componentRestrictions: { country: 'ar' },
            }}
          >
            <Input
              type="text"
              placeholder="Busca una ubicación"
              className={styles.input}
              defaultValue={eventAddress}
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={markerPosition}
            zoom={12}
            onClick={handleMapClick}
            onLoad={onLoadMap}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </div>
      </LoadScript>
    </Card>
  )
}

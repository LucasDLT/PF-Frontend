"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api'
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import styles from './EditClassMap.module.css'

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

interface EditClassMapProps {
  defaultLocation: string
  onLocationChange: (location?: string) => void
}

export default function EditClassMap({ defaultLocation, onLocationChange }: EditClassMapProps) {
  const [markerPosition, setMarkerPosition] = useState(center)
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null)
  const mapRef = useRef<google.maps.Map | null>(null)
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (defaultLocation) {
      const [lat, lng] = defaultLocation.split(',').map(Number)
      if (!isNaN(lat) && !isNaN(lng)) {
        setMarkerPosition({ lat, lng })
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng })
        }
      }
    }
  }, [defaultLocation])

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      const newLocation = `${lat}, ${lng}`
      setMarkerPosition({ lat, lng })
      onLocationChange(newLocation)

      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          setAddress(results[0].formatted_address)
        }
      })
    }
  }, [onLocationChange])

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
        onLocationChange(newLocation)
        setAddress(place.formatted_address || '')

        if (mapRef.current) {
          mapRef.current.panTo(location)
          mapRef.current.setZoom(15)
        }
      }
    }
  }, [autocomplete, onLocationChange])

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
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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


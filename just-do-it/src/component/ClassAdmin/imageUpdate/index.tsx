import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from 'lucide-react'
import styles from './ImageUploader.module.css'

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        setImageUrl(imageUrl)
        onImageUpload(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Label htmlFor="image" className={styles.label}>Imagen de la Clase</Label>
      <div className={styles.uploadContainer}>
        <Input 
          id="image" 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className={styles.inputHidden} 
        />
        <Button 
          type="button" 
          onClick={() => document.getElementById('image')?.click()} 
          className={styles.uploadButton}
        >
          <Upload className={styles.icon} /> Subir Imagen
        </Button>
        {imageUrl && <img src={imageUrl} alt="Vista previa" className={styles.previewImage} />}
      </div>
    </div>
  )
}

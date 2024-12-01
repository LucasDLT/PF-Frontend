"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';
import styles from './ImageUploader.module.css';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  initialImage?: string;
}

export function ImageUploader({ onImageUpload, initialImage }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(initialImage || '');

  useEffect(() => {
    if (initialImage) {
      setImageUrl(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Previsualización local
    const objetoUrl = URL.createObjectURL(selectedFile);
    setImageUrl(objetoUrl);
    onImageUpload(objetoUrl); // Notifica al componente padre (previsualización inicial)

    // Subida a Cloudinary
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'just-do-it'); // Reemplazar con tu preset de Cloudinary

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/lucasebas/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      const uploadedUrl = data.secure_url;

      setImageUrl(uploadedUrl); // Actualiza la previsualización con la URL real
      onImageUpload(uploadedUrl); // Notifica al componente padre (URL final de Cloudinary)
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un error al subir la imagen. Inténtalo nuevamente.');
    }
  };

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
  );
}


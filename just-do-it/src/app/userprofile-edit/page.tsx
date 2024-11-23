'use client';
import { Avatar,  AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {  Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './edicionperfil.module.css';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useAuth } from '@/context';
import { toast } from 'sonner';

export default function EdicionPerfil() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT;
  const route = useRouter();
  const { data: session } = useSession();
  const { token, userSession, setSession } = useAuth();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleChange = () => {
    route.push('/userprofile');
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    const objetoUrl = URL.createObjectURL(selectedFile);
    setImageUrl(objetoUrl);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', 'just-do-it');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/lucasebas/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form
      className={styles.container}
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const nameField = form.elements.namedItem('name') as HTMLInputElement;
        const emailField = form.elements.namedItem('email') as HTMLInputElement;
        const phoneField = form.elements.namedItem('phone') as HTMLInputElement;
        const addressField = form.elements.namedItem(
          'address',
        ) as HTMLInputElement;
        const countryField = form.elements.namedItem(
          'country',
        ) as HTMLInputElement;
        const bioField = form.elements.namedItem('bio') as HTMLTextAreaElement;

        if (
          !nameField ||
          !emailField ||
          !phoneField ||
          !addressField ||
          !bioField
        ) {
          console.error('Faltan campos obligatorios en el formulario');
          return;
        }

        const formData = {
          name: nameField.value,
          email: emailField.value,
          phone: phoneField.value,
          address: addressField.value,
          country: countryField.value,
          bio: bioField.value,
          image: imageUrl || '',
        };

        console.log('Datos que se enviarán como JSON:', formData);

        const userId = userSession?.id;
        if (!userId) {
          console.error('No se encontró el ID del usuario');
          return;
        }

        const response = await fetch(
          `http://localhost:${PORT}/users/${userId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          },
        );

        const data = await response.json();
        setSession(data);

        console.log('Datos que devuelve el servidor:', data);
        if (window.confirm('¿Estás seguro de que deseas guardar los cambios?')) {
          toast.success('Perfil editado con éxito!');
        } else {
          toast.error('No se guardaron los cambios.');
        }
        
      }}
    >
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Editar Perfil</h1>
          <Button onClick={handleChange} className={styles.buttonSave}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>
      <div className={styles.form}>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className={styles.avatarWrapper}>
                <Avatar className={styles.avatar}>
                  {imageUrl ? (
                    <AvatarImage alt="Foto de perfil" src={imageUrl} />
                  ) : (
                    <h3 className={styles.name}>
                      {session?.user.name || userSession?.name}
                    </h3>
                  )}
                </Avatar>
                <div className={styles.cameraIcon}>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    id="file-input"
                    className={styles.hiddenFileInput}
                  />
                  <label htmlFor="file-input" className={styles.cameraLabel}>
                    <img
                      src="/camera.png"
                      alt="Cambiar foto"
                      className={styles.cameraImage}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="grid gap-6">
              <div className={styles.formGroup}>
                <Label htmlFor="name" className={styles.label}>
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={session?.user.name || userSession?.name}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="email" className={styles.label}>
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={session?.user.email || userSession?.email}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="phone" className={styles.label}>
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={userSession?.phone}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="country" className={styles.label}>
                  País
                </Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={userSession?.country}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="address" className={styles.label}>
                  Dirección
                </Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={userSession?.address}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="bio" className={styles.label}>
                  Biografía
                </Label>
                <Textarea
                  className={`${styles.textarea} min-h-[100px]`}
                  id="bio"
                  name="bio"
                  defaultValue={userSession?.bio || ''}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

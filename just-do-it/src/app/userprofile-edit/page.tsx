'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CameraIcon, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './edicionperfil.module.css';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useAuth } from '@/context';

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
      console.log(data);
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
        const usernameField = form.elements.namedItem(
          'username',
        ) as HTMLInputElement;
        const emailField = form.elements.namedItem('email') as HTMLInputElement;
        const phoneField = form.elements.namedItem('phone') as HTMLInputElement;
        const locationField = form.elements.namedItem(
          'location',
        ) as HTMLInputElement;
        const bioField = form.elements.namedItem('bio') as HTMLTextAreaElement;

        const formData = new FormData();
        formData.append('file', file!);
        formData.append('name', nameField.value);
        formData.append('username', usernameField.value);
        formData.append('email', emailField.value);
        formData.append('phone', phoneField.value);
        formData.append('location', locationField.value);
        formData.append('bio', bioField.value);
        formData.append('imageUrl', imageUrl!);

        const userId = userSession?.id;

        if (!userId) {
          console.error('No se encontró el ID del usuario');
          return;
        }

        const response = await fetch(
          `http://localhost:${PORT}/users/${userId}`,
          {
            method: 'PUT',
            body: formData,
          },
        );

        const data = await response.json();
        setSession(data);

        console.log(data);
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
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className={styles.avatarWrapper}>
                <Avatar className={styles.avatar}>
                  {imageUrl ? (
                    <AvatarImage alt="Foto de perfil" src={imageUrl} />
                  ) : (
                    <AvatarFallback className={styles.avatarFallback}>
                      {session?.user.name || userSession?.name}
                    </AvatarFallback>
                  )}
                </Avatar>

                <Button size="icon" className={styles.avatarButton}>
                  <CameraIcon className="h-4 w-4" />
                </Button>

                <input type="file" onChange={handleImageChange} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Editar Foto de Perfil</h2>
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
                  Ubicación
                </Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={userSession?.country}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <Label htmlFor="location" className={styles.label}>
                  Ubicación
                </Label>
                <Input
                  id="location"
                  name="location"
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
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

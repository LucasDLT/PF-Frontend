"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CameraIcon, Save } from 'lucide-react';
import styles from './edicionperfil.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context';
import { useState } from 'react';
import { toast } from 'sonner';

export default function EdicionPerfil() {

  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN;


  const route = useRouter();
  const { token, userSession, setSession } = useAuth();
  const [imageUrl, setImageUrl] = useState<string | null>(userSession?.image || null);
  const [formData, setFormData] = useState({
    name: userSession?.name || '',
    email: userSession?.email || '', 
    phone: userSession?.phone || '',
    country: userSession?.country || '',
    address: userSession?.address || '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;


    const form = new FormData();
    form.append('file', selectedFile);
    form.append('upload_preset', 'just-do-it');
    
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/lucasebas/image/upload',
        {
          method: 'POST',
          body: form,

        },

      );

      const data = await response.json();

      if (response.ok && data.secure_url) {
        setImageUrl(data.secure_url);
      } else {
        throw new Error(data.message || 'Error al cargar la imagen');
      }
    } catch (error) {

      console.error('Error al cargar la imagen:', error);
      toast.error('Hubo un error al cargar la imagen.',
        {

          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '8px',
          },
        });
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { password: '', confirmPassword: '' };

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      isValid = false;
    } else if (formData.password && !/[A-Z]/.test(formData.password)) {
      newErrors.password = 'La contraseña debe contener al menos una letra mayúscula';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

  
 
    const { email, ...updatedData } = { ...formData, image: imageUrl };


    try {
      const response = await fetch(`${DOMAIN}/users/${userSession.id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,  // Reemplazar token aquí si es necesario
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();

  

        if (data.userData) {
          setSession(data.userData);
          toast.success('Perfil actualizado correctamente!');
          route.push('/userprofile');
        } else {
          throw new Error('Datos de usuario no encontrados en la respuesta del servidor.');
        }
      } else {
        const errorData = await response.json();
        toast.error(`Error al actualizar los datos: ${errorData.message}`, {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '15px',
            borderRadius: '8px',
          },
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al actualizar los datos.', {
        style: {
          background: 'red',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '15px',
          borderRadius: '8px',
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Editar Perfil</h1>
          <Button className={styles.saveButton} onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Cambios
          </Button>
        </div>
      </div>
      <div className={styles.cardContainer}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="relative flex flex-col items-center">
                  <Avatar className="w-24 h-24 border-2 border-gray-300 rounded-full">
                    <AvatarImage
                      alt="Foto de perfil"
                      src={imageUrl || '/placeholder.svg?height=96&width=96'}
                    />
                    <AvatarFallback className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-600 font-bold">
                      JDI
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-400 text-white rounded-full shadow-lg hover:bg-yellow-500"
                    onClick={() =>
                      document.getElementById('file-input')?.click()
                    }
                  >
                    <CameraIcon className="w-4 h-4" />
                  </Button>

                  <input
                    id="file-input"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 font-sans">
                  Editar Foto de Perfil
                </h2>
              </div>
              <div className={styles.grid}>
                <div>
                  <Label htmlFor="name" className={styles.label}>
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder={userSession?.name || 'Escribe tu nombre'}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                {/* Mantener el campo de correo visible pero sin enviarlo */}
                <div>
                  <Label htmlFor="email" className={styles.label}>
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    placeholder={userSession?.email || 'Escribe tu correo'}
                    onChange={handleChange}
                    className={styles.input}
                    disabled
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className={styles.label}>
                    Teléfono
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    placeholder={userSession?.phone || 'Escribe tu teléfono'}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div>
                  <Label htmlFor="country" className={styles.label}>
                    País
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    placeholder={userSession?.country || 'Escribe tu país'}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div>
                  <Label htmlFor="address" className={styles.label}>
                    Dirección
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    placeholder={userSession?.address || 'Escribe tu dirección'}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className={styles.label}>
                    Nueva contraseña
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}


                    placeholder="Escribe una nueva contraseña"
nChange={handleChange}
                    className={styles.input}
                  />
                  {errors.password && (

                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>

                 

                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className={styles.label}>
                    Confirmar nueva contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}


                    onChange={handleChange}
                    className={styles.input}
                  />
                  {errors.confirmPassword && (

                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>

                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

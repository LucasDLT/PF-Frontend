'use client';

import {
  CalendarIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context';
import styles from './PanelAdmin.module.css'; // Importamos el CSS adicional

export default function PanelAdmin() {
  const { userSession } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="container mx-auto">
        <h1 className={styles.layoutHeader}>
          Panel de Administración de Eventos
        </h1>
      </div>

      <div className="flex-grow bg-gray-100 py-6">
        <div className="container mx-auto px-4 max-w-7xl">
          <Card className="shadow-xl">
            <CardHeader className={`${styles.cardHeaderCustom} flex justify-between items-center`}>
              <Avatar className={styles.avatarCustom}>
                <AvatarImage src={userSession?.image} alt="User Image" />
                <AvatarFallback>{userSession?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-3xl font-bold text-white cursor-default">
                {userSession?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.cardContentCustom}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                {/* Información del Usuario */}
                <Card className="shadow-md bg-white">
                  <CardHeader className="border-b border-gray-200">
                    <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                      <UserIcon className="text-xl mr-2 text-blue-500" />
                      Información del Usuario
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="cursor-default space-y-4 p-4">
                    <div className="text-l font-semibold text-gray-800 flex items-center">
                      <UserIcon className="text-l mr-2 text-blue-500" />
                      <p className="text-gray-700">{userSession?.name}</p>
                    </div>
                    <div className="text-l font-semibold text-gray-800 flex items-center">
                      <MailIcon className="text-l mr-2 text-blue-500" />
                      <p className="text-gray-700">{userSession?.email}</p>
                    </div>
                    <div className="text-l font-semibold text-gray-800 flex items-center">
                      <MapPinIcon className="text-l mr-2 text-blue-500" />
                      <p className="text-gray-700">{userSession?.address}</p>
                    </div>
                    <div className="text-l font-semibold text-gray-800 flex items-center">
                      <PhoneIcon className="text-l mr-2 text-blue-500" />
                      <p className="text-gray-700">{userSession?.phone}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Clases */}
                <Card className="shadow-md bg-white">
                  <CardHeader className="border-b border-gray-200">
                    <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2 text-blue-500" />
                      Tus Clases
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

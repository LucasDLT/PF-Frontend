"use client"
import { useSession} from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>You must be logged in to view your profile.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold text-center">Mi Perfil</h1>
      <div className="mt-4">
        <div className="flex justify-center">
          <img
            src={session.user?.image}
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl">Nombre: {session.user?.name}</h2>
          <p className="text-xl">Correo electronico: {session.user?.email}</p>
        </div>
        
      </div>
    </div>
  );
};



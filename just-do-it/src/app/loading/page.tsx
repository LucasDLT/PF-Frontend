'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/context'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingView() {
  const PORT = process.env.NEXT_PUBLIC_APP_API_PORT
  const API_URL = `${process.env.NEXT_PUBLIC_APP_API_DOMAIN}:${process.env.NEXT_PUBLIC_APP_API_PORT}`
  const DOMAIN = process.env.NEXT_PUBLIC_APP_API_DOMAIN

  const { setToken, setSession } = useAuth()
  const { data: session } = useSession()
  const Router = useRouter()

  const [isRegistered, setIsRegistered] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const registerUser = async () => {
      if (session && session.user && !isRegistered) {
        try {
          const response = await fetch(`${DOMAIN}/auth/signup/third/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: session.user.name,
              email: session.user.email,
              image: session.user.image,
            }),
          })

          if (response.status === 403) {
            toast.error("Has sido baneado de esta aplicación, por favor contáctanos para más información.", {
              position: "top-center",
            })
            Router.push("/login")
            return
          }

          if (response.ok) {
            const data = await response.json()
            setSession(data.userData)
            setToken(data.token)
            setIsRegistered(true)
            setShowSuccess(true)
            // Delay redirect to show success message
            setTimeout(() => {
              Router.push("/")
            }, 2000)
          } else {
            console.error('Error registering user')
          }
        } catch (error) {
          console.error('Error:', error)
        }
      }
    }

    if (session && session.user && !isRegistered) {
      registerUser()
    }
  }, [session, PORT, setToken, setSession, isRegistered, Router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="w-16 h-16 text-[#C5F32C] animate-spin" aria-hidden="true" />
            <p className="mt-6 text-xl font-bold text-white" aria-live="polite">
              Cargando...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-[#C5F32C] mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              ¡Bienvenido!
            </h2>
            <p className="text-xl text-[#C5F32C]">
              {session?.user?.name}
            </p>
            <p className="mt-2 text-gray-400">
              Has iniciado sesión con éxito
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


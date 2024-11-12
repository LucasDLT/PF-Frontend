'use client'

import { useState } from 'react'
import { Menu, X, User, UserCog, LogOut } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'INICIO', href: '#' },
    { label: 'SEDES', href: '#' },
    { label: 'SERVICIOS', href: '#' },
    { label: 'PLANES', href: '#' },
    { label: 'CONTÁCTANOS', href: '#' },
  ]

  return (
    <nav className="bg-black border-yellow-400 border shadow-lg shadow-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white font-bold text-xl">Logo</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-400 focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                {/* Mobile Navigation Items */}
                {menuItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <a href={item.href} className="w-full">
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                {/* User Profile Options */}
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil Usuario</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserCog className="mr-2 h-4 w-4" />
                  <span>Perfil Admin</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
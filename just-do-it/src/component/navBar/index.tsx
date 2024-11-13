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

export default function NavbarApp() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { label: 'INICIO', href: '#' },
    { label: 'SEDES', href: '#' },
    { label: 'SERVICIOS', href: '#' },
    { label: 'PLANES', href: '#' },
    { label: 'INICIO', href: '#' },
    { label: 'CONTÁCTANOS', href: '#' },
  ]

  const NavMenu = ({ isMobile = false }) => (
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
      <DropdownMenuContent align={isMobile ? "end" : "start"} className="w-56 bg-black border border-yellow-400">
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <a href={item.href} className="text-white hover:text-yellow-400 text-xs">
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator className="bg-yellow-400" />
        <DropdownMenuItem asChild>
          <a href="#" className="text-white hover:text-yellow-400 text-xs">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil Usuario</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="#" className="text-white hover:text-yellow-400 text-xs">
            <UserCog className="mr-2 h-4 w-4" />
            <span>Perfil Admin</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="#" className="text-white hover:text-yellow-400 text-xs">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar Sesión</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <nav className="bg-black border-yellow-400 border shadow-lg shadow-yellow-400/20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white font-bold text-sm">Logo</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <NavMenu />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavMenu isMobile={true} />
          </div>
        </div>
      </div>
    </nav>
  )
}
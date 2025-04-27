"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Image from "next/image"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <div className="relative h-10 w-10 mr-2">
                <Image
                  src="/logo.png"
                  alt="Website Vulnerability Scanner Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">WebVulnScan</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              <NavLink href="/" active={isActive("/")} onClick={closeMenu}>
                Home
              </NavLink>
              <NavLink href="/scan" active={isActive("/scan")} onClick={closeMenu}>
                Scan
              </NavLink>
              <NavLink href="/about" active={isActive("/about")} onClick={closeMenu}>
                About
              </NavLink>
            </div>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-4" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex md:hidden items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="mr-2" aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <span className="h-6 w-6">✕</span> : <span className="h-6 w-6">☰</span>}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/" active={isActive("/")} onClick={closeMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink href="/scan" active={isActive("/scan")} onClick={closeMenu}>
              Scan
            </MobileNavLink>
            <MobileNavLink href="/about" active={isActive("/about")} onClick={closeMenu}>
              About
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        active
          ? "text-[#2563EB] dark:text-[#3B82F6]"
          : "text-gray-700 hover:text-[#2563EB] dark:text-gray-300 dark:hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, active, onClick, children }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        active
          ? "bg-[#2563EB]/10 text-[#2563EB] dark:bg-[#2563EB]/20 dark:text-[#3B82F6]"
          : "text-gray-700 hover:bg-gray-100 hover:text-[#2563EB] dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
      }`}
    >
      {children}
    </Link>
  )
}

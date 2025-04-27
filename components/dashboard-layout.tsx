"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { BarChart3, Shield, Clock, FileText, Settings, LogOut, Bell, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <Shield className="h-6 w-6 text-[#2563EB]" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SecureScan</span>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            <SidebarItem
              icon={<BarChart3 className="h-5 w-5" />}
              label="Dashboard"
              href="/dashboard"
              active={isActive("/dashboard") && !isActive("/dashboard/")}
            />
            <SidebarItem
              icon={<Shield className="h-5 w-5" />}
              label="Start Scan"
              href="/dashboard/scan"
              active={isActive("/dashboard/scan")}
            />
            <SidebarItem
              icon={<Clock className="h-5 w-5" />}
              label="Scan History"
              href="/dashboard/history"
              active={isActive("/dashboard/history")}
            />
            <SidebarItem
              icon={<FileText className="h-5 w-5" />}
              label="Reports"
              href="/dashboard/reports"
              active={isActive("/dashboard/reports")}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              href="/dashboard/settings"
              active={isActive("/dashboard/settings")}
            />
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex flex-col h-full bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <Shield className="h-6 w-6 text-[#2563EB]" />
                      <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SecureScan</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-5 w-5" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex-1 px-2 py-4 space-y-1">
                    <MobileSidebarItem
                      icon={<BarChart3 className="h-5 w-5" />}
                      label="Dashboard"
                      href="/dashboard"
                      active={isActive("/dashboard") && !isActive("/dashboard/")}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MobileSidebarItem
                      icon={<Shield className="h-5 w-5" />}
                      label="Start Scan"
                      href="/dashboard/scan"
                      active={isActive("/dashboard/scan")}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MobileSidebarItem
                      icon={<Clock className="h-5 w-5" />}
                      label="Scan History"
                      href="/dashboard/history"
                      active={isActive("/dashboard/history")}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MobileSidebarItem
                      icon={<FileText className="h-5 w-5" />}
                      label="Reports"
                      href="/dashboard/reports"
                      active={isActive("/dashboard/reports")}
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <MobileSidebarItem
                      icon={<Settings className="h-5 w-5" />}
                      label="Settings"
                      href="/dashboard/settings"
                      active={isActive("/dashboard/settings")}
                      onClick={() => setIsMenuOpen(false)}
                    />
                  </nav>
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleLogout()
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Shield className="h-6 w-6 text-[#2563EB]" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">SecureScan</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                3
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, href, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active
          ? "bg-[#2563EB]/10 text-[#2563EB]"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
      }`}
    >
      <span className={`mr-3 ${active ? "text-[#2563EB]" : ""}`}>{icon}</span>
      {label}
    </Link>
  )
}

function MobileSidebarItem({ icon, label, href, active, onClick }) {
  return (
    <Link
      href={href}
      className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
        active
          ? "bg-[#2563EB]/10 text-[#2563EB]"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
      }`}
      onClick={onClick}
    >
      <span className={`mr-3 ${active ? "text-[#2563EB]" : ""}`}>{icon}</span>
      {label}
    </Link>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Shield,
  Clock,
  FileText,
  Settings,
  LogOut,
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the dashboard
const recentScans = [
  {
    id: 1,
    target: "example.com",
    date: "2023-06-15 14:30",
    riskLevel: "high",
    vulnerabilities: 12,
  },
  {
    id: 2,
    target: "test-server.org",
    date: "2023-06-14 09:15",
    riskLevel: "medium",
    vulnerabilities: 7,
  },
  {
    id: 3,
    target: "api.myservice.com",
    date: "2023-06-12 16:45",
    riskLevel: "low",
    vulnerabilities: 3,
  },
  {
    id: 4,
    target: "staging.app.io",
    date: "2023-06-10 11:20",
    riskLevel: "medium",
    vulnerabilities: 5,
  },
]

const cveAlerts = [
  {
    id: "CVE-2023-1234",
    title: "Critical RCE in Apache HTTP Server",
    severity: "high",
    date: "2023-06-14",
  },
  {
    id: "CVE-2023-5678",
    title: "SQL Injection in MySQL",
    severity: "medium",
    date: "2023-06-13",
  },
  {
    id: "CVE-2023-9012",
    title: "Cross-Site Scripting in WordPress",
    severity: "medium",
    date: "2023-06-12",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/")
  }

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Unknown</Badge>
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "low":
        return <Info className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
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
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <SidebarItem
              icon={<Shield className="h-5 w-5" />}
              label="Start Scan"
              href="/dashboard/scan"
              active={activeTab === "scan"}
              onClick={() => setActiveTab("scan")}
            />
            <SidebarItem
              icon={<Clock className="h-5 w-5" />}
              label="Scan History"
              href="/dashboard/history"
              active={activeTab === "history"}
              onClick={() => setActiveTab("history")}
            />
            <SidebarItem
              icon={<FileText className="h-5 w-5" />}
              label="Reports"
              href="/dashboard/reports"
              active={activeTab === "reports"}
              onClick={() => setActiveTab("reports")}
            />
            <SidebarItem
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              href="/dashboard/settings"
              active={activeTab === "settings"}
              onClick={() => setActiveTab("settings")}
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
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, John Doe</p>
              </div>

              <div className="mt-4 md:mt-0 flex space-x-3">
                <TabsList className="hidden md:flex">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="scans">Scans</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>

                <Button asChild className="bg-[#22C55E] hover:bg-[#16A34A] text-white">
                  <Link href="/dashboard/scan">Scan New Website</Link>
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                    <Shield className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-gray-500">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Vulnerabilities Found</CardTitle>
                    <AlertTriangle className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-gray-500">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Fixed Issues</CardTitle>
                    <FileText className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-gray-500">+18% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Scans */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Scans</CardTitle>
                  <CardDescription>Your latest security assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentScans.map((scan) => (
                      <div
                        key={scan.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-white">{scan.target}</span>
                          <span className="text-sm text-gray-500">{scan.date}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center">{getRiskBadge(scan.riskLevel)}</div>
                            <span className="text-sm text-gray-500">{scan.vulnerabilities} issues</span>
                          </div>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/reports/${scan.id}`}>
                              <ChevronRight className="h-5 w-5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                      <Link href="/dashboard/history">View All Scans</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* CVE Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Latest CVE Alerts</CardTitle>
                  <CardDescription>Recent vulnerabilities you should be aware of</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cveAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="mr-3 mt-0.5">{getSeverityIcon(alert.severity)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-white">{alert.title}</span>
                            <span className="text-xs text-gray-500">{alert.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-[#2563EB]">{alert.id}</span>
                            <Badge className="ml-2 text-xs" variant="outline">
                              New
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline">View All Alerts</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scans" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scan History</CardTitle>
                  <CardDescription>All your previous security assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentScans.map((scan) => (
                      <div
                        key={scan.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-white">{scan.target}</span>
                          <span className="text-sm text-gray-500">{scan.date}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center">{getRiskBadge(scan.riskLevel)}</div>
                            <span className="text-sm text-gray-500">{scan.vulnerabilities} issues</span>
                          </div>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/dashboard/reports/${scan.id}`}>
                              <ChevronRight className="h-5 w-5" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Latest CVE vulnerabilities and patches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cveAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="mr-3 mt-0.5">{getSeverityIcon(alert.severity)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900 dark:text-white">{alert.title}</span>
                            <span className="text-xs text-gray-500">{alert.date}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-[#2563EB]">{alert.id}</span>
                            <Badge className="ml-2 text-xs" variant="outline">
                              New
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            This vulnerability affects systems running the affected software. Update to the latest
                            version to mitigate risk.
                          </p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, href, active, onClick }) {
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

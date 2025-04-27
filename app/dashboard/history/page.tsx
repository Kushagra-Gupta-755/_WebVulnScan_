"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, AlertTriangle, AlertCircle, Info, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for scan history
const scanHistory = [
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
  {
    id: 5,
    target: "dev.example.com",
    date: "2023-06-08 13:10",
    riskLevel: "high",
    vulnerabilities: 15,
  },
  {
    id: 6,
    target: "internal.company.net",
    date: "2023-06-05 10:45",
    riskLevel: "low",
    vulnerabilities: 2,
  },
  {
    id: 7,
    target: "api.thirdparty.com",
    date: "2023-06-03 15:20",
    riskLevel: "medium",
    vulnerabilities: 8,
  },
  {
    id: 8,
    target: "legacy.example.org",
    date: "2023-06-01 09:30",
    riskLevel: "high",
    vulnerabilities: 18,
  },
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")

  const filteredScans = scanHistory.filter((scan) => {
    const matchesSearch = scan.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === "all" || scan.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

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

  const getRiskIcon = (risk) => {
    switch (risk) {
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
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scan History</h1>
            <p className="text-gray-500 dark:text-gray-400">View and manage your previous security scans</p>
          </div>

          <Button asChild className="mt-4 md:mt-0 bg-[#22C55E] hover:bg-[#16A34A] text-white">
            <Link href="/dashboard/scan">New Scan</Link>
          </Button>
        </div>

        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Filter Scans</CardTitle>
            <CardDescription>Search and filter your scan history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by domain or IP..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risks</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle>Scan Results</CardTitle>
            <CardDescription>
              {filteredScans.length} {filteredScans.length === 1 ? "scan" : "scans"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredScans.length > 0 ? (
                filteredScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="hidden md:block">{getRiskIcon(scan.riskLevel)}</div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{scan.target}</div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Calendar className="mr-1 h-3 w-3" />
                          {scan.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center justify-end mb-1">{getRiskBadge(scan.riskLevel)}</div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{scan.vulnerabilities} issues</span>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/dashboard/reports/${scan.id}`}>
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No scans found matching your filters
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

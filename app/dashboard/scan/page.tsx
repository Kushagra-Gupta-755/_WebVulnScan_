"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Server, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "@/components/dashboard-layout"

export default function ScanPage() {
  const router = useRouter()
  const [target, setTarget] = useState("")
  const [nmapEnabled, setNmapEnabled] = useState(true)
  const [niktoEnabled, setNiktoEnabled] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])

  const startScan = () => {
    if (!target) return

    setScanning(true)
    setProgress(0)
    setLogs(["Initializing scan..."])

    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 5

        if (newProgress >= 100) {
          clearInterval(interval)
          setScanning(false)
          router.push("/dashboard/reports/new")
          return 100
        }

        // Add log messages at different stages
        if (prev < 10 && newProgress >= 10) {
          setLogs((prev) => [...prev, "Performing host discovery..."])
        } else if (prev < 25 && newProgress >= 25) {
          setLogs((prev) => [
            ...prev,
            `${nmapEnabled ? "Starting Nmap port scan..." : "Nmap scan disabled, skipping..."}`,
          ])
        } else if (prev < 40 && newProgress >= 40) {
          setLogs((prev) => [...prev, "Identifying open services..."])
        } else if (prev < 60 && newProgress >= 60) {
          setLogs((prev) => [
            ...prev,
            `${niktoEnabled ? "Starting Nikto web vulnerability scan..." : "Nikto scan disabled, skipping..."}`,
          ])
        } else if (prev < 80 && newProgress >= 80) {
          setLogs((prev) => [...prev, "Checking for common web vulnerabilities..."])
        } else if (prev < 90 && newProgress >= 90) {
          setLogs((prev) => [...prev, "Mapping findings to CVE database..."])
        } else if (prev < 95 && newProgress >= 95) {
          setLogs((prev) => [...prev, "Generating report..."])
        }

        return newProgress
      })
    }, 500)

    return () => clearInterval(interval)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Start New Scan</h1>
          <p className="text-gray-500 dark:text-gray-400">Configure and run a security assessment</p>
        </div>

        <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle>Scan Configuration</CardTitle>
            <CardDescription>Configure your target and scanning tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="target">Target Web Server (URL/IP)</Label>
                <Input
                  id="target"
                  placeholder="e.g., example.com or 192.168.1.1"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="bg-white dark:bg-gray-800"
                  disabled={scanning}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#2563EB]" />
                    <Label htmlFor="nmap" className="font-medium">
                      Enable Nmap Scan
                    </Label>
                  </div>
                  <Switch id="nmap" checked={nmapEnabled} onCheckedChange={setNmapEnabled} disabled={scanning} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Server className="h-5 w-5 text-[#2563EB]" />
                    <Label htmlFor="nikto" className="font-medium">
                      Enable Nikto Scan
                    </Label>
                  </div>
                  <Switch id="nikto" checked={niktoEnabled} onCheckedChange={setNiktoEnabled} disabled={scanning} />
                </div>
              </div>

              <Button
                onClick={startScan}
                disabled={!target || scanning}
                className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white h-12 text-base"
                size="lg"
              >
                {scanning ? "Scanning..." : "Start Scan"}
                {!scanning && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {scanning && (
          <Card className="border-2 border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-[#22C55E] mr-2 animate-pulse" />
                Scan in Progress
              </CardTitle>
              <CardDescription>Please wait while we scan your target</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 h-60 overflow-y-auto font-mono text-sm">
                  {logs.map((log, index) => (
                    <div key={index} className="py-1">
                      <span className="text-[#22C55E]">$</span> {log}
                    </div>
                  ))}
                  {scanning && (
                    <div className="py-1 flex items-center">
                      <span className="text-[#22C55E]">$</span>
                      <span className="ml-1 animate-pulse">_</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

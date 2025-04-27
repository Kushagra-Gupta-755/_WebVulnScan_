"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScannerService } from "@/lib/scannerService"
import { Vulnerability } from "@/lib/scannerService"

export function ScanForm() {
  const router = useRouter()
  const [url, setUrl] = useState("")
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentOperation, setCurrentOperation] = useState("")
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])

  const startScan = async () => {
    if (!url || scanning) return

    try {
      setScanning(true)
      setProgress(0)
      setCurrentOperation("Initializing scan...")
      setVulnerabilities([])

      const scanner = new ScannerService()
      
      // Update progress for different scan phases
      const updateProgress = (phase: string, value: number) => {
        setProgress(value)
        setCurrentOperation(phase)
      }

      updateProgress("Checking security headers...", 20)
      const result = await scanner.scanUrl(url)
      
      updateProgress("Processing results...", 90)
      setVulnerabilities(result.vulnerabilities)
      
      // Store results in localStorage for the results page
      localStorage.setItem('scanResults', JSON.stringify(result))
      
      updateProgress("Scan complete!", 100)
      
      // Navigate to results page after a brief delay
      setTimeout(() => {
        router.push('/results')
      }, 1000)
    } catch (error: any) {
      console.error('Scan error:', error)
      setCurrentOperation(`Error: ${error?.message || 'An unknown error occurred'}`)
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium">
              Target URL
            </label>
            <Input
              id="url"
              placeholder="Enter website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={scanning}
            />
          </div>
          <Button
            onClick={startScan}
            disabled={!url || scanning}
            className="w-full"
          >
            {scanning ? "Scanning..." : "Start Scan"}
          </Button>
        </div>
      </Card>

      {scanning && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{currentOperation}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </div>
        </Card>
      )}

      {vulnerabilities.length > 0 && !scanning && (
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Vulnerabilities Found</h3>
            <div className="space-y-2">
              {vulnerabilities.map((vuln) => (
                <div
                  key={vuln.id}
                  className={`p-4 rounded-lg ${
                    vuln.severity === 'high'
                      ? 'bg-red-50 text-red-700'
                      : vuln.severity === 'medium'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  <h4 className="font-medium">{vuln.name}</h4>
                  <p className="text-sm mt-1">{vuln.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
} 
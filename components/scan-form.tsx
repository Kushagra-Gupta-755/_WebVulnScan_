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
      <Card className="p-6 border-2">
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
              className="border-2"
            />
          </div>
          <Button
            onClick={startScan}
            disabled={!url || scanning}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {scanning ? "Scanning..." : "Start Scan"}
          </Button>
        </div>
      </Card>

      {scanning && (
        <Card className="p-6 border-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{currentOperation}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-gray-200" />
            </div>
          </div>
        </Card>
      )}

      {vulnerabilities.length > 0 && !scanning && (
        <Card className="p-6 border-2">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Vulnerabilities Found</h3>
            <div className="space-y-2">
              {vulnerabilities.map((vuln) => (
                <div
                  key={vuln.id}
                  className={`p-4 rounded-lg border ${
                    vuln.severity === 'high'
                      ? 'bg-[#FFE5E5] border-[#CC0000]'
                      : vuln.severity === 'medium'
                      ? 'bg-[#FFF0E1] border-[#FF8C00]'
                      : 'bg-[#FFF9E5] border-[#FFD700]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900">{vuln.name}</h4>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                        vuln.severity === 'high'
                          ? 'bg-[#CC0000]'
                          : vuln.severity === 'medium'
                          ? 'bg-[#FF8C00]'
                          : 'bg-[#FFD700] text-gray-900'
                      }`}
                    >
                      {vuln.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm mt-2 text-gray-700">{vuln.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
} 
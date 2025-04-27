"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanResult } from "@/lib/scannerService"
import { Download, ArrowLeft } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<ScanResult | null>(null)

  useEffect(() => {
    const storedResults = localStorage.getItem('scanResults')
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }
  }, [])

  const downloadReport = () => {
    if (!results) return

    const report = `
Security Scan Report
===================
Target: ${results.target}
Scan Date: ${results.scanDate}

Vulnerability Summary
-------------------
Total Issues: ${results.summary.total}
High Severity: ${results.summary.high}
Medium Severity: ${results.summary.medium}
Low Severity: ${results.summary.low}

Detailed Findings
---------------
${results.vulnerabilities.map(vuln => `
[${vuln.severity.toUpperCase()}] ${vuln.name}
${vuln.cve ? `CVE: ${vuln.cve}` : ''}
Description: ${vuln.description}
Details: ${vuln.details}
Recommendation: ${vuln.recommendation}
References:
${vuln.references.map(ref => `- ${ref}`).join('\n')}
`).join('\n')}
    `.trim()

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `security-scan-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!results) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">No scan results available.</p>
            <Button
              onClick={() => router.push('/scan')}
              className="mt-4 mx-auto block"
            >
              Start New Scan
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push('/scan')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          New Scan
        </Button>
        <Button
          onClick={downloadReport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scan Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold">{results.summary.total}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 bg-red-50">
                  <p className="text-sm text-red-600">High Severity</p>
                  <p className="text-2xl font-bold text-red-700">{results.summary.high}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 bg-yellow-50">
                  <p className="text-sm text-yellow-600">Medium Severity</p>
                  <p className="text-2xl font-bold text-yellow-700">{results.summary.medium}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 bg-blue-50">
                  <p className="text-sm text-blue-600">Low Severity</p>
                  <p className="text-2xl font-bold text-blue-700">{results.summary.low}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Target Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">URL</p>
                  <p className="font-medium">{results.target}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scan Date</p>
                  <p className="font-medium">{results.scanDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Vulnerabilities</h3>
              <div className="space-y-4">
                {results.vulnerabilities.map((vuln) => (
                  <Card key={vuln.id} className="overflow-hidden">
                    <div
                      className={`p-4 ${
                        vuln.severity === 'high'
                          ? 'bg-red-50'
                          : vuln.severity === 'medium'
                          ? 'bg-yellow-50'
                          : 'bg-blue-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{vuln.name}</h4>
                          {vuln.cve && (
                            <p className="text-sm text-muted-foreground">
                              CVE: {vuln.cve}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            vuln.severity === 'high'
                              ? 'bg-red-100 text-red-700'
                              : vuln.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {vuln.severity}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <h5 className="text-sm font-medium">Description</h5>
                        <p className="text-sm text-muted-foreground">
                          {vuln.description}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Details</h5>
                        <p className="text-sm text-muted-foreground">
                          {vuln.details}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Recommendation</h5>
                        <p className="text-sm text-muted-foreground">
                          {vuln.recommendation}
                        </p>
                      </div>
                      {vuln.references.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium">References</h5>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {vuln.references.map((ref, index) => (
                              <li key={index}>
                                <a
                                  href={ref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                >
                                  {ref}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

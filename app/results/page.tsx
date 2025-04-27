"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScanResult } from "@/lib/scannerService"
import { Download, ArrowLeft, FileText } from "lucide-react"
import { generatePDFReport } from "@/lib/pdfGenerator"

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

  const downloadPDFReport = () => {
    if (!results) return
    generatePDFReport(results)
  }

  if (!results) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6 border-2">
          <CardContent className="p-6">
            <p className="text-center">No scan results available.</p>
            <Button
              onClick={() => router.push('/scan')}
              className="mt-4 mx-auto block bg-blue-600 hover:bg-blue-700"
            >
              Start New Scan
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 space-y-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push('/scan')}
          className="flex items-center gap-2 border-2 border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          New Scan
        </Button>
        <div className="flex gap-2">
          <Button
            onClick={downloadReport}
            variant="outline"
            className="flex items-center gap-2 border-2 border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
          >
            <Download className="h-4 w-4" />
            Download TXT
          </Button>
          <Button
            onClick={downloadPDFReport}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FileText className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="border-2 border-gray-700 bg-gray-800 shadow-xl">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl text-gray-100">Scan Results</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-2 border-gray-700 bg-gray-800 shadow-md">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-gray-400">Total Issues</p>
                  <p className="text-3xl font-bold text-gray-100">{results.summary.total}</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-red-900 bg-red-900/30 shadow-md">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-red-300">High Severity</p>
                  <p className="text-3xl font-bold text-red-200">{results.summary.high}</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-orange-800 bg-orange-900/30 shadow-md">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-orange-300">Medium Severity</p>
                  <p className="text-3xl font-bold text-orange-200">{results.summary.medium}</p>
                </CardContent>
              </Card>
              <Card className="border-2 border-yellow-800 bg-yellow-900/30 shadow-md">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-yellow-300">Low Severity</p>
                  <p className="text-3xl font-bold text-yellow-200">{results.summary.low}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 bg-gray-800 p-6 rounded-lg border-2 border-gray-700">
              <h3 className="text-xl font-bold text-gray-100">Target Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm font-medium text-gray-400">URL</p>
                  <p className="text-lg font-semibold text-gray-100">{results.target}</p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <p className="text-sm font-medium text-gray-400">Scan Date</p>
                  <p className="text-lg font-semibold text-gray-100">{results.scanDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-100">Vulnerabilities</h3>
              <div className="space-y-4">
                {results.vulnerabilities.map((vuln) => (
                  <Card key={vuln.id} className="overflow-hidden border-2 border-gray-700 bg-gray-800 shadow-lg">
                    <div
                      className={`p-4 ${
                        vuln.severity === 'high'
                          ? 'bg-red-900/50 border-b border-red-700'
                          : vuln.severity === 'medium'
                          ? 'bg-orange-900/50 border-b border-orange-700'
                          : 'bg-yellow-900/50 border-b border-yellow-700'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold text-gray-100">{vuln.name}</h4>
                          {vuln.cve && (
                            <p className="text-sm text-gray-300">
                              CVE: {vuln.cve}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-bold ${
                            vuln.severity === 'high'
                              ? 'bg-red-900 text-red-100'
                              : vuln.severity === 'medium'
                              ? 'bg-orange-900 text-orange-100'
                              : 'bg-yellow-900 text-yellow-100'
                          }`}
                        >
                          {vuln.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4 bg-gray-800">
                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-gray-300">Description</h5>
                        <p className="text-base text-gray-200">
                          {vuln.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-gray-300">Details</h5>
                        <p className="text-base text-gray-200">
                          {vuln.details}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-bold text-gray-300">Recommendation</h5>
                        <p className="text-base text-gray-200">
                          {vuln.recommendation}
                        </p>
                      </div>
                      {vuln.references.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-bold text-gray-300">References</h5>
                          <ul className="list-disc list-inside text-base space-y-1">
                            {vuln.references.map((ref, index) => (
                              <li key={index}>
                                <a
                                  href={ref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 hover:underline"
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

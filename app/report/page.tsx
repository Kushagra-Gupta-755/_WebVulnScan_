"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ReportPage() {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const [format, setFormat] = useState<string | null>(null)

  const downloadReport = (reportFormat: string) => {
    setDownloading(true)
    setFormat(reportFormat)

    // Simulate download
    setTimeout(() => {
      setDownloading(false)
      setDownloaded(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Security Report</h1>
          <p className="text-gray-600 dark:text-gray-300">Download your comprehensive security report</p>
        </div>

        <Card className="mb-8 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle>Report Summary</CardTitle>
            <CardDescription>Overview of the security assessment for example.com</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Target</div>
                  <div className="font-medium text-gray-900 dark:text-white">example.com</div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Scan Date</div>
                  <div className="font-medium text-gray-900 dark:text-white">{new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Vulnerability Summary</div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-red-600 dark:text-red-400 font-bold text-lg">3</div>
                    <div className="text-sm">High</div>
                  </div>
                  <div>
                    <div className="text-amber-600 dark:text-amber-400 font-bold text-lg">5</div>
                    <div className="text-sm">Medium</div>
                  </div>
                  <div>
                    <div className="text-green-600 dark:text-green-400 font-bold text-lg">4</div>
                    <div className="text-sm">Low</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Report Contents</div>
                <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Executive Summary</li>
                  <li>Vulnerability Details</li>
                  <li>Risk Assessment</li>
                  <li>Remediation Recommendations</li>
                  <li>Technical Appendix</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {downloaded && (
          <Alert className="mb-8 bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E] dark:bg-[#22C55E]/20 dark:border-[#22C55E]/30">
            <CheckCircle className="h-5 w-5" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your report has been downloaded in {format?.toUpperCase()} format.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2 text-[#2563EB]" />
                PDF Report
              </CardTitle>
              <CardDescription>Download a comprehensive PDF report with all findings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => downloadReport("pdf")}
                className="w-full bg-[#2563EB] hover:bg-[#1E40AF] text-white"
                disabled={downloading}
              >
                {downloading && format === "pdf" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#1E3A8A]" />
                DOCX Report
              </CardTitle>
              <CardDescription>Download an editable DOCX report for further customization</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => downloadReport("docx")}
                className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white"
                disabled={downloading}
              >
                {downloading && format === "docx" ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Download DOCX
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Link href="/results" className="text-[#2563EB] hover:underline mr-4">
            Back to Results
          </Link>
          <Link href="/scan" className="text-[#2563EB] hover:underline">
            Start a New Scan
          </Link>
        </div>
      </div>
    </div>
  )
}

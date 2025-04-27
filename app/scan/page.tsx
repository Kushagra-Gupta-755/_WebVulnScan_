import { Metadata } from "next"
import { ScanForm } from "@/components/scan-form"

export const metadata: Metadata = {
  title: "Security Scanner",
  description: "Scan websites for security vulnerabilities",
}

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-[#1F2937]">
      <div className="container mx-auto py-10 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-100">Web Security Scanner</h1>
          <p className="text-lg text-gray-300">
            Enter a URL to scan for common web vulnerabilities and security misconfigurations
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <ScanForm />
        </div>
      </div>
    </div>
  )
}

import { Metadata } from "next"
import { ScanForm } from "@/components/scan-form"

export const metadata: Metadata = {
  title: "Security Scanner",
  description: "Scan websites for security vulnerabilities",
}

export default function ScanPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-3xl font-bold text-center">Website Security Scanner</h1>
        <p className="text-muted-foreground text-center max-w-[600px]">
          Enter a URL to scan for security vulnerabilities, including SSL/TLS issues,
          missing security headers, open ports, and more.
        </p>
        <div className="w-full max-w-[600px]">
          <ScanForm />
        </div>
      </div>
    </div>
  )
}

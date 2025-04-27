import Link from "next/link"
import { ArrowRight, Shield, FileText, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import Image from "next/image"

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 relative">
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white mt-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] to-[#0F172A] py-20 px-4 md:px-6 lg:px-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="relative h-24 w-24">
              <Image
                src="/logo.png"
                alt="Website Vulnerability Scanner Logo"
                width={96}
                height={96}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Automated Web Server Security Assessment
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Scan & Secure Your Web Server with AI-powered Insights - 100% Free
          </p>
          <Button
            size="lg"
            className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium px-8 py-6 rounded-lg text-lg group"
            asChild
          >
            <Link href="/scan">
              Start Scanning Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Comprehensive Security Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-[#2563EB]" />}
              title="Nmap & Nikto Scanning"
              description="Detect open ports, services, and web server misconfigurations with industry-standard security tools."
            />
            <FeatureCard
              icon={<Database className="h-10 w-10 text-[#2563EB]" />}
              title="CVE Vulnerability Mapping"
              description="Automatically map discovered vulnerabilities to the NIST CVE database for comprehensive information."
            />
            <FeatureCard
              icon={<FileText className="h-10 w-10 text-[#2563EB]" />}
              title="PDF Report Generation"
              description="Generate and download comprehensive security reports in PDF or DOCX format with actionable recommendations."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard
              number="1"
              title="Enter Web Server URL/IP"
              description="Provide the address of the web server you want to scan."
            />
            <StepCard
              number="2"
              title="Run Scan"
              description="Execute Nmap & Nikto scans to identify vulnerabilities."
            />
            <StepCard
              number="3"
              title="View Results & CVE Mapping"
              description="Review detailed findings mapped to known vulnerabilities."
            />
            <StepCard
              number="4"
              title="Download Fix Report"
              description="Get a comprehensive report with remediation steps."
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

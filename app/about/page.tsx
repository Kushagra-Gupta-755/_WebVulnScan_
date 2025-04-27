import Link from "next/link"
import { Shield, Mail, Github, Linkedin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1F2937]">
      <div className="container mx-auto py-10 space-y-8">
        {/* Mission Section */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-100">Our Mission</h1>
          <p className="text-lg text-gray-300">
            At Web Vulnerability Scanner, our mission is simple — to help developers, businesses, and security enthusiasts build safer web applications.
            We believe that security should be accessible, fast, and integrated into every stage of web development.
          </p>
        </section>

        {/* What We Do Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">What We Do</h2>
          <p className="text-lg text-gray-300">
            We provide a modern, real-time web security scanning tool that identifies common vulnerabilities in web applications.
            Our scanner performs deep security checks like:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
            <li>HTTP security headers analysis</li>
            <li>SSL/TLS configuration validation</li>
            <li>Common vulnerability detection</li>
            <li>Sensitive information exposure checks</li>
            <li>Server and technology stack fingerprinting</li>
          </ul>
          <p className="text-lg text-gray-300">
            All results are compiled into detailed, easy-to-understand reports that empower developers to take action immediately.
          </p>
        </section>

        {/* Why Choose Us Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-100">Real-Time Scanning</h3>
                <p className="text-gray-300">Instantly identify potential vulnerabilities as you build.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-100">Developer-Friendly</h3>
                <p className="text-gray-300">Simple, clear, and actionable reports without jargon.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-100">Built with Modern Tech</h3>
                <p className="text-gray-300">Powered by Next.js, TypeScript, Tailwind CSS, and industry-trusted libraries.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-100">Open and Transparent</h3>
                <p className="text-gray-300">We encourage contributions and improvements through our open-source platform.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Vision Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100">Our Vision</h2>
          <p className="text-lg text-gray-300">
            We aim to make proactive web security a natural part of every development workflow, creating a safer internet for everyone — one scan at a time.
          </p>
        </section>

        {/* Quote Section */}
        <section className="mt-12">
          <blockquote className="text-2xl font-semibold text-center text-gray-100 italic">
            "Fast. Reliable. Developer-friendly scanning."
          </blockquote>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-100">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-100">Kushagra Gupta</h3>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-100">Anmol Salaria</h3>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-100">Suyash Saxena</h3>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-600 bg-gray-800">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-100">Akshat Tyagi</h3>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

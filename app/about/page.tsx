import Link from "next/link"
import { Shield, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Footer from "@/components/footer"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="relative h-16 w-16">
                <Image
                  src="/logo.png"
                  alt="Website Vulnerability Scanner Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              About Our Security Assessment Tool
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Learn more about our mission to improve web security</p>
          </div>

          <Card className="mb-12 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 text-[#2563EB] mr-2" />
                Why Web Security Matters
              </CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                In today's interconnected digital landscape, web security is more critical than ever. Websites and web
                applications are the primary interface between organizations and their users, making them prime targets
                for cyberattacks.
              </p>

              <h3>The Growing Threat Landscape</h3>
              <p>
                Cyber threats are constantly evolving, with attackers developing increasingly sophisticated methods to
                exploit vulnerabilities in web applications. Common threats include:
              </p>
              <ul>
                <li>
                  <strong>Injection Attacks:</strong> SQL, NoSQL, OS, and LDAP injection flaws occur when untrusted data
                  is sent to an interpreter as part of a command or query.
                </li>
                <li>
                  <strong>Broken Authentication:</strong> Authentication and session management functions are often
                  implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens.
                </li>
                <li>
                  <strong>Cross-Site Scripting (XSS):</strong> XSS flaws occur when an application includes untrusted
                  data in a new web page without proper validation or escaping.
                </li>
                <li>
                  <strong>Security Misconfigurations:</strong> Security misconfiguration is the most commonly seen
                  issue, often resulting from insecure default configurations, incomplete configurations, or verbose
                  error messages.
                </li>
              </ul>

              <h3>The Cost of Security Breaches</h3>
              <p>The consequences of security breaches can be severe and far-reaching:</p>
              <ul>
                <li>
                  <strong>Financial Loss:</strong> The average cost of a data breach is now estimated at $4.35 million
                  globally.
                </li>
                <li>
                  <strong>Reputational Damage:</strong> Loss of customer trust can have long-lasting effects on an
                  organization's reputation and bottom line.
                </li>
                <li>
                  <strong>Regulatory Penalties:</strong> Non-compliance with regulations like GDPR, HIPAA, or PCI DSS
                  can result in significant fines.
                </li>
                <li>
                  <strong>Operational Disruption:</strong> Security incidents can disrupt normal business operations,
                  leading to downtime and lost productivity.
                </li>
              </ul>

              <h3>Our Approach to Web Security</h3>
              <p>
                Our Web Server Security Assessment tool is designed to help organizations identify and address security
                vulnerabilities before they can be exploited. By combining industry-standard tools like Nmap and Nikto
                with a user-friendly interface, we make it easier for security professionals to:
              </p>
              <ul>
                <li>Discover open ports and services that could be exploited</li>
                <li>Identify known vulnerabilities in web servers and applications</li>
                <li>Receive actionable recommendations for remediation</li>
                <li>Generate comprehensive reports for stakeholders</li>
              </ul>

              <p>
                Regular security assessments are a critical component of a robust security program. By proactively
                identifying and addressing vulnerabilities, organizations can significantly reduce their risk of
                security breaches and protect their valuable assets.
              </p>

              <h3>Our Free and Open Approach</h3>
              <p>
                We believe that web security should be accessible to everyone. That's why we've made our tool completely
                free to use, with no registration required. Our mission is to help improve the security posture of
                websites across the internet by providing powerful security assessment tools to all organizations,
                regardless of size or budget.
              </p>

              <h3>Contact Us</h3>
              <p>Have questions, feedback, or need assistance? Feel free to reach out to our team at:</p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 text-[#2563EB] mr-2" />
                <a href="mailto:support@webvulnscan.com" className="text-[#2563EB] hover:underline">
                  support@webvulnscan.com
                </a>
              </p>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link href="/" className="text-[#2563EB] hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

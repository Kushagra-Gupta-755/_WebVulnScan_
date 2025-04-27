"use client"

import { useState } from "react"
import {
  Download,
  FileText,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Info,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for the scan results
const mockResults = {
  target: "example.com",
  scanDate: new Date().toLocaleString(),
  summary: {
    total: 12,
    high: 3,
    medium: 5,
    low: 4,
  },
  vulnerabilities: [
    {
      id: "CVE-2021-44228",
      name: "Log4j Remote Code Execution",
      severity: "high",
      description:
        "A remote code execution vulnerability in Apache Log4j library that allows attackers to execute arbitrary code on the affected server.",
      details:
        "The vulnerability exists due to improper input validation in the JNDI lookup feature. An attacker can exploit this by sending a specially crafted request that includes a malicious JNDI lookup pattern.",
      recommendation:
        "Update to Log4j 2.15.0 or later. If updating is not possible, set the system property 'log4j2.formatMsgNoLookups' to 'true' or remove the JndiLookup class from the classpath.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2021-44228"],
    },
    {
      id: "CVE-2022-22965",
      name: "Spring Framework RCE",
      severity: "high",
      description:
        "A remote code execution vulnerability in Spring Framework that allows attackers to execute arbitrary code on the affected server.",
      details:
        "The vulnerability exists in the Spring Core module and affects applications running on JDK 9+. It allows an attacker to access a Spring MVC or Spring WebFlux application running on JDK 9+ through data binding.",
      recommendation: "Update to Spring Framework 5.3.18 or 5.2.20, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22965"],
    },
    {
      id: "CVE-2021-42013",
      name: "Apache HTTP Server Path Traversal",
      severity: "high",
      description:
        "A path traversal vulnerability in Apache HTTP Server that allows attackers to map URLs to files outside the expected document root.",
      details:
        "The fix for CVE-2021-41773 in Apache HTTP Server 2.4.50 was insufficient. An attacker could use a path traversal attack to map URLs to files outside the directories configured by Alias-like directives.",
      recommendation: "Update to Apache HTTP Server 2.4.51 or later.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2021-42013"],
    },
    {
      id: "CVE-2022-22954",
      name: "VMware Workspace ONE Access SSTI",
      severity: "medium",
      description:
        "A server-side template injection vulnerability in VMware Workspace ONE Access that allows attackers to execute arbitrary code on the affected server.",
      details:
        "The vulnerability exists due to improper input validation in the Freemarker template engine. An attacker can exploit this by sending a specially crafted request that includes malicious template expressions.",
      recommendation:
        "Apply the patches provided by VMware or implement the workarounds described in the security advisory.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22954"],
    },
    {
      id: "CVE-2022-1388",
      name: "F5 BIG-IP iControl REST Auth Bypass",
      severity: "medium",
      description:
        "An authentication bypass vulnerability in F5 BIG-IP iControl REST that allows attackers to bypass authentication and execute arbitrary system commands.",
      details:
        "The vulnerability exists due to improper authentication in the iControl REST interface. An attacker can exploit this by sending a specially crafted request that bypasses authentication checks.",
      recommendation:
        "Update to the versions recommended by F5 in their security advisory or implement the provided mitigation measures.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-1388"],
    },
    // More medium vulnerabilities...
    {
      id: "CVE-2022-22963",
      name: "Spring Cloud Function SpEL Injection",
      severity: "medium",
      description:
        "A Spring Expression Language (SpEL) injection vulnerability in Spring Cloud Function that allows attackers to execute arbitrary code.",
      details:
        "The vulnerability exists due to improper input validation in the routing functionality. An attacker can exploit this by sending a specially crafted request that includes malicious SpEL expressions.",
      recommendation: "Update to Spring Cloud Function 3.1.7, 3.2.3, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22963"],
    },
    {
      id: "CVE-2022-22947",
      name: "Spring Cloud Gateway Code Injection",
      severity: "medium",
      description:
        "A code injection vulnerability in Spring Cloud Gateway that allows attackers to execute arbitrary remote functions.",
      details:
        "The vulnerability exists due to improper input validation in the API endpoints. An attacker can exploit this by sending a specially crafted request that includes malicious code.",
      recommendation: "Update to Spring Cloud Gateway 3.1.1, 3.0.7, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22947"],
    },
    {
      id: "CVE-2022-22950",
      name: "Spring Framework DoS",
      severity: "medium",
      description:
        "A denial-of-service vulnerability in Spring Framework that allows attackers to cause excessive memory consumption.",
      details:
        "The vulnerability exists due to improper handling of patterns in the PatternParseException. An attacker can exploit this by sending a specially crafted request that includes malicious patterns.",
      recommendation: "Update to Spring Framework 5.3.16, 5.2.20, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22950"],
    },
    // Low vulnerabilities
    {
      id: "CVE-2022-22976",
      name: "Spring Security CSRF Protection Bypass",
      severity: "low",
      description: "A cross-site request forgery (CSRF) protection bypass vulnerability in Spring Security.",
      details:
        "The vulnerability exists due to improper validation of the CSRF token in certain scenarios. An attacker can exploit this to bypass CSRF protection mechanisms.",
      recommendation: "Update to Spring Security 5.5.7, 5.6.3, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22976"],
    },
    {
      id: "CVE-2022-22968",
      name: "Spring Framework DoS",
      severity: "low",
      description:
        "A denial-of-service vulnerability in Spring Framework that allows attackers to cause excessive CPU consumption.",
      details:
        "The vulnerability exists due to improper handling of patterns in the PathPatternParser. An attacker can exploit this by sending a specially crafted request that includes malicious patterns.",
      recommendation: "Update to Spring Framework 5.3.17, 5.2.20, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22968"],
    },
    {
      id: "CVE-2022-22970",
      name: "Spring Expression DoS",
      severity: "low",
      description:
        "A denial-of-service vulnerability in Spring Expression that allows attackers to cause excessive CPU consumption.",
      details:
        "The vulnerability exists due to improper handling of certain expressions. An attacker can exploit this by sending a specially crafted request that includes malicious expressions.",
      recommendation: "Update to Spring Framework 5.3.20, 5.2.22, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22970"],
    },
    {
      id: "CVE-2022-22971",
      name: "Spring Expression DoS",
      severity: "low",
      description:
        "A denial-of-service vulnerability in Spring Expression that allows attackers to cause excessive memory consumption.",
      details:
        "The vulnerability exists due to improper handling of certain expressions. An attacker can exploit this by sending a specially crafted request that includes malicious expressions.",
      recommendation: "Update to Spring Framework 5.3.20, 5.2.22, or later versions.",
      references: ["https://nvd.nist.gov/vuln/detail/CVE-2022-22971"],
    },
  ],
}

export default function ReportPage({ params }) {
  const [expandedVulnerabilities, setExpandedVulnerabilities] = useState<string[]>([])

  const toggleVulnerability = (id: string) => {
    setExpandedVulnerabilities((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const downloadReport = (format: "pdf" | "docx") => {
    // In a real application, this would trigger a download
    alert(`Downloading report in ${format.toUpperCase()} format`)
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "low":
        return <Info className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Report</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Target: {mockResults.target} | Scan Date: {mockResults.scanDate}
            </p>
          </div>

          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button onClick={() => downloadReport("pdf")} className="bg-[#2563EB] hover:bg-[#1E40AF] text-white">
              <Download className="mr-2 h-4 w-4" />
              PDF
            </Button>
            <Button onClick={() => downloadReport("docx")} className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white">
              <FileText className="mr-2 h-4 w-4" />
              DOCX
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="md:col-span-4 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle>Vulnerability Summary</CardTitle>
              <CardDescription>Overview of detected vulnerabilities by severity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{mockResults.summary.total}</div>
                  <div className="text-gray-600 dark:text-gray-400">Total Issues</div>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-700 dark:text-red-400">{mockResults.summary.high}</div>
                  <div className="text-red-600 dark:text-red-300">High Severity</div>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">
                    {mockResults.summary.medium}
                  </div>
                  <div className="text-amber-600 dark:text-amber-300">Medium Severity</div>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-700 dark:text-green-400">{mockResults.summary.low}</div>
                  <div className="text-green-600 dark:text-green-300">Low Severity</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="all">All ({mockResults.summary.total})</TabsTrigger>
            <TabsTrigger value="high">High ({mockResults.summary.high})</TabsTrigger>
            <TabsTrigger value="medium">Medium ({mockResults.summary.medium})</TabsTrigger>
            <TabsTrigger value="low">Low ({mockResults.summary.low})</TabsTrigger>
          </TabsList>

          {["all", "high", "medium", "low"].map((severity) => (
            <TabsContent key={severity} value={severity} className="space-y-4">
              {mockResults.vulnerabilities
                .filter((vuln) => severity === "all" || vuln.severity === severity)
                .map((vulnerability) => (
                  <Collapsible
                    key={vulnerability.id}
                    open={expandedVulnerabilities.includes(vulnerability.id)}
                    onOpenChange={() => toggleVulnerability(vulnerability.id)}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex items-center space-x-3">
                        {getSeverityIcon(vulnerability.severity)}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{vulnerability.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{vulnerability.id}</div>
                        </div>
                        <Badge className={`ml-2 ${getSeverityColor(vulnerability.severity)}`}>
                          {vulnerability.severity}
                        </Badge>
                      </div>
                      {expandedVulnerabilities.includes(vulnerability.id) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Description</h4>
                          <p className="text-gray-700 dark:text-gray-300">{vulnerability.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Details</h4>
                          <p className="text-gray-700 dark:text-gray-300">{vulnerability.details}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Recommendation</h4>
                          <p className="text-gray-700 dark:text-gray-300">{vulnerability.recommendation}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">References</h4>
                          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                            {vulnerability.references.map((ref, index) => (
                              <li key={index}>
                                <a
                                  href={ref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[#2563EB] hover:underline flex items-center"
                                >
                                  {ref}
                                  <ExternalLink className="h-3 w-3 ml-1" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

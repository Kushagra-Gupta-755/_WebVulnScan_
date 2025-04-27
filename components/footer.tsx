import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center mb-4">
            <div className="relative h-8 w-8 mr-2">
              <Image
                src="/logo.png"
                alt="Website Vulnerability Scanner Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">WebVulnScan</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm text-center max-w-md mb-6">
            Automated web server security assessment with AI-powered insights. Free to use for everyone.
          </p>

          <div className="flex space-x-6 mb-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#3B82F6]">
              Home
            </Link>
            <Link
              href="/scan"
              className="text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#3B82F6]"
            >
              Scan
            </Link>
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-[#2563EB] dark:hover:text-[#3B82F6]"
            >
              About
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} WebVulnScan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

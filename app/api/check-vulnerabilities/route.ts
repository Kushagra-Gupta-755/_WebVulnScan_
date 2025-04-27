import { NextResponse } from 'next/server'
import axios from 'axios'
import { load } from 'cheerio'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await axios.get(url, {
      validateStatus: null,
      headers: {
        'User-Agent': 'Security Scanner/1.0'
      }
    })

    const $ = load(response.data)
    const insecureScripts: string[] = []
    
    // Check for insecure scripts
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src')
      if (src && !src.startsWith('https://')) {
        insecureScripts.push(src)
      }
    })

    // Check robots.txt
    const sensitivePaths: string[] = []
    try {
      const robotsResponse = await axios.get(`${url}/robots.txt`, {
        validateStatus: null,
        timeout: 5000
      })
      
      if (robotsResponse.status === 200) {
        const sensitivePatterns = ['/admin', '/backup', '/config', '/db', '/logs']
        const robotsContent = robotsResponse.data.toLowerCase()
        
        sensitivePatterns.forEach(pattern => {
          if (robotsContent.includes(pattern)) {
            sensitivePaths.push(pattern)
          }
        })
      }
    } catch (error) {
      console.error('Error checking robots.txt:', error)
    }

    // Check for additional vulnerabilities
    const additionalVulnerabilities = []

    // Check for server information disclosure
    const server = response.headers['server']
    if (server) {
      additionalVulnerabilities.push({
        id: 'SERVER_INFO_DISCLOSURE',
        name: 'Server Information Disclosure',
        severity: 'low',
        description: 'Server header reveals detailed version information',
        details: `Server header: ${server}`,
        recommendation: 'Configure your server to remove or obscure the Server header',
        references: [
          'https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/02-Fingerprint_Web_Server'
        ]
      })
    }

    // Check for missing X-Content-Type-Options header
    if (!response.headers['x-content-type-options']) {
      additionalVulnerabilities.push({
        id: 'MISSING_CONTENT_TYPE_OPTIONS',
        name: 'Missing X-Content-Type-Options Header',
        severity: 'low',
        description: 'The X-Content-Type-Options header is not set',
        details: 'This header prevents MIME-sniffing attacks',
        recommendation: 'Add the X-Content-Type-Options: nosniff header',
        references: [
          'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options'
        ]
      })
    }

    return NextResponse.json({
      insecureScripts,
      sensitivePaths,
      additionalVulnerabilities
    })
  } catch (error) {
    console.error('Error checking vulnerabilities:', error)
    return NextResponse.json(
      { error: 'Failed to check vulnerabilities' },
      { status: 500 }
    )
  }
} 
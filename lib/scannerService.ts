import axios from 'axios';
import { load } from 'cheerio';

export interface Vulnerability {
  id: string;
  name: string;
  severity: 'high' | 'medium' | 'low';
  cve?: string;
  description: string;
  details: string;
  recommendation: string;
  references: string[];
}

export interface ScanResult {
  target: string;
  scanDate: string;
  vulnerabilities: Vulnerability[];
  summary: {
    total: number;
    high: number;
    medium: number;
    low: number;
  };
}

export class ScannerService {
  async scanUrl(url: string): Promise<ScanResult> {
    const normalizedUrl = this.normalizeUrl(url);
    const vulnerabilities: Vulnerability[] = [];

    try {
      // Basic HTTP Security Headers Check
      await this.checkSecurityHeaders(normalizedUrl, vulnerabilities);
      
      // Check for common vulnerabilities
      await this.checkCommonVulnerabilities(normalizedUrl, vulnerabilities);
      
      // Check SSL/TLS (browser-compatible version)
      await this.checkSSLTLS(normalizedUrl, vulnerabilities);

    } catch (error: unknown) {
      console.error('Scan error:', error);
      vulnerabilities.push({
        id: 'SCAN_ERROR',
        name: 'Scan Error',
        severity: 'high',
        description: 'An error occurred during the scan',
        details: error instanceof Error ? error.message : 'Unknown error occurred',
        recommendation: 'Please check if the URL is accessible and try again',
        references: []
      });
    }

    // Calculate summary
    const summary = {
      total: vulnerabilities.length,
      high: vulnerabilities.filter(v => v.severity === 'high').length,
      medium: vulnerabilities.filter(v => v.severity === 'medium').length,
      low: vulnerabilities.filter(v => v.severity === 'low').length
    };

    return {
      target: normalizedUrl,
      scanDate: new Date().toLocaleString(),
      vulnerabilities,
      summary
    };
  }

  private normalizeUrl(url: string): string {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    return url;
  }

  private async checkSecurityHeaders(url: string, vulnerabilities: Vulnerability[]): Promise<void> {
    try {
      const response = await axios.get('/api/check-headers', {
        params: { url }
      });

      const headers = response.data.headers;
      const securityHeaders = [
        'strict-transport-security',
        'x-content-type-options',
        'x-frame-options',
        'x-xss-protection',
        'content-security-policy'
      ];

      securityHeaders.forEach(header => {
        if (!headers[header.toLowerCase()]) {
          vulnerabilities.push({
            id: `MISSING_HEADER_${header.toUpperCase()}`,
            name: `Missing Security Header: ${header}`,
            severity: 'medium',
            description: `The security header "${header}" is missing`,
            details: `Security headers help protect against various attacks. The "${header}" header is recommended.`,
            recommendation: `Add the "${header}" security header to your server responses.`,
            references: [
              'https://owasp.org/www-project-secure-headers/',
              `https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/${header}`
            ]
          });
        }
      });
    } catch (error) {
      console.error('Header check error:', error);
    }
  }

  private async checkSSLTLS(url: string, vulnerabilities: Vulnerability[]): Promise<void> {
    try {
      const response = await axios.get('/api/check-ssl', {
        params: { url }
      });

      const { protocol } = response.data;
      
      if (protocol && (protocol === 'TLSv1.1' || protocol === 'TLSv1.0' || protocol === 'SSLv3')) {
        vulnerabilities.push({
          id: 'WEAK_SSL_TLS',
          name: 'Weak SSL/TLS Configuration',
          severity: 'high',
          description: 'The server supports outdated SSL/TLS protocols',
          details: 'Outdated SSL/TLS protocols have known vulnerabilities and should not be used.',
          recommendation: 'Disable support for TLS 1.1 and below. Only enable TLS 1.2 and TLS 1.3.',
          references: [
            'https://www.acunetix.com/blog/articles/tls-vulnerabilities-attacks-final-part/',
            'https://www.openssl.org/docs/man1.1.1/man1/ciphers.html'
          ]
        });
      }
    } catch (error) {
      console.error('SSL/TLS check error:', error);
    }
  }

  private async checkCommonVulnerabilities(url: string, vulnerabilities: Vulnerability[]): Promise<void> {
    try {
      const response = await axios.get('/api/check-vulnerabilities', {
        params: { url }
      });

      const { data } = response;
      
      // Check for insecure scripts
      if (data.insecureScripts && data.insecureScripts.length > 0) {
        vulnerabilities.push({
          id: 'INSECURE_EXTERNAL_SCRIPTS',
          name: 'Insecure External Scripts',
          severity: 'medium',
          description: 'The page includes external scripts loaded over insecure connections',
          details: 'Loading external scripts over HTTP can lead to man-in-the-middle attacks',
          recommendation: 'Ensure all external resources are loaded over HTTPS',
          references: [
            'https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration'
          ]
        });
      }

      // Check for sensitive information exposure
      if (data.sensitivePaths && data.sensitivePaths.length > 0) {
        vulnerabilities.push({
          id: 'SENSITIVE_INFO_EXPOSURE',
          name: 'Sensitive Information Exposure',
          severity: 'medium',
          description: 'robots.txt contains potentially sensitive directory information',
          details: `Found sensitive paths: ${data.sensitivePaths.join(', ')}`,
          recommendation: 'Review and remove any sensitive paths from robots.txt',
          references: [
            'https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/01-Information_Gathering/01-Conduct_Search_Engine_Discovery_Reconnaissance_for_Information_Leakage'
          ]
        });
      }

      // Add any additional vulnerabilities from the API response
      if (data.additionalVulnerabilities) {
        vulnerabilities.push(...data.additionalVulnerabilities);
      }
    } catch (error) {
      console.error('Common vulnerabilities check error:', error);
    }
  }
} 
# Web Vulnerability Scanner

A modern web application security scanner built with Next.js that helps identify common security vulnerabilities in web applications.

## Features

- Real-time vulnerability scanning
- Security headers analysis
- SSL/TLS configuration checks
- Common vulnerability detection
- Sensitive information exposure checks
- Detailed vulnerability reports
- Downloadable scan results

## Tech Stack

- Next.js 13+
- TypeScript
- Tailwind CSS
- Axios
- Cheerio

## Security Checks

The scanner performs the following security checks:

1. **Security Headers**
   - HSTS (HTTP Strict Transport Security)
   - X-Content-Type-Options
   - X-Frame-Options
   - X-XSS-Protection
   - Content Security Policy

2. **SSL/TLS Configuration**
   - Protocol version detection
   - Weak protocol identification

3. **Common Vulnerabilities**
   - Insecure script sources
   - Sensitive information exposure
   - Server information disclosure

4. **Information Disclosure**
   - Robots.txt analysis
   - Server header information
   - Technology stack detection

## API Routes

- `/api/check-headers`: Analyzes security headers
- `/api/check-ssl`: Checks SSL/TLS configuration
- `/api/check-vulnerabilities`: Scans for common vulnerabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


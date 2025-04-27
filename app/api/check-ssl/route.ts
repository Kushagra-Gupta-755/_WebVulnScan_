import { NextResponse } from 'next/server'
import https from 'https'
import tls from 'tls'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const { hostname } = new URL(url)
    
    return new Promise((resolve) => {
      const socket = tls.connect({
        host: hostname,
        port: 443,
        servername: hostname,
      }, () => {
        const protocol = socket.getProtocol()
        socket.end()
        resolve(NextResponse.json({ protocol }))
      })

      socket.on('error', (error) => {
        console.error('SSL/TLS error:', error)
        resolve(NextResponse.json(
          { error: 'Failed to check SSL/TLS configuration' },
          { status: 500 }
        ))
      })
    })
  } catch (error) {
    console.error('Error checking SSL/TLS:', error)
    return NextResponse.json(
      { error: 'Failed to check SSL/TLS configuration' },
      { status: 500 }
    )
  }
} 
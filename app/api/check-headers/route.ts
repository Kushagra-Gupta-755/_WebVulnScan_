import { NextResponse } from 'next/server'
import axios from 'axios'

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

    return NextResponse.json({ headers: response.headers })
  } catch (error) {
    console.error('Error checking headers:', error)
    return NextResponse.json(
      { error: 'Failed to check headers' },
      { status: 500 }
    )
  }
} 
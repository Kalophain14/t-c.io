import { NextRequest, NextResponse } from 'next/server'

function isEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 3 &&
    value.length < 320 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  )
}

function isNonEmptyString(value: unknown, max = 5000): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max
}

export async function POST(req: NextRequest) {
  let body: unknown = null
  try {
    body = (await req.json()) as unknown
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const {
    name, email, message, website,
  } = body as Record<string, unknown>

  if (isNonEmptyString(website, 500)) {
    return NextResponse.json({ ok: true })
  }

  if (!isNonEmptyString(name, 200) || !isEmail(email) || !isNonEmptyString(message, 5000)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const backendUrl = process.env.BACKEND_URL

  if (!backendUrl) {
    console.error('[contact] BACKEND_URL is not configured')
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) {
      let text = ''
      try { text = await res.text() } catch { /* ignore */ }
      console.error('[contact] backend rejected', { status: res.status, body: text.slice(0, 500) })
      return NextResponse.json({ error: 'Failed to send' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    const isAbort = err instanceof Error && err.name === 'AbortError'
    console.error('[contact] backend error', { message: err instanceof Error ? err.message : String(err), isAbort })
    return NextResponse.json({ error: 'Failed to send' }, { status: isAbort ? 504 : 502 })
  }
}

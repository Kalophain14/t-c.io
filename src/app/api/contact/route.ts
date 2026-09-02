import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (body.website) return NextResponse.json({ ok: true })
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'
    const res = await fetch(`${backendUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: body.name, email: body.email, message: body.message }),
    })
    if (!res.ok) throw new Error('Backend error')
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// Force this route to be dynamic (not pre-rendered during build)
export const dynamic = 'force-dynamic';

// Lazy initialization of Resend
let resend: Resend | null = null;
function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

// Sanitize HTML to prevent XSS
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(request: Request) {
  try {
    // Rate limiting: 5 requests per hour per IP
    const clientIp = getClientIp(request);
    const rateLimitResult = rateLimit(clientIp, {
      limit: 5,
      windowMs: 60 * 60 * 1000, // 1 hour
    });

    if (!rateLimitResult.success) {
      const resetDate = new Date(rateLimitResult.reset);
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          resetAt: resetDate.toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { name, email, phone, company, message, honeypot } = body;

    // Honeypot check - if filled, it's likely a bot
    if (honeypot) {
      console.warn('Honeypot triggered from IP:', clientIp);
      // Return success to fool bots, but don't actually send email
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validate required fields
    if (!name || !email || !company || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Length validation
    if (message.length < 20 || message.length > 2000) {
      return NextResponse.json({ error: 'Message must be between 20 and 2000 characters' }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPhone = phone ? sanitizeHtml(phone) : 'No proporcionado';
    const sanitizedCompany = sanitizeHtml(company);
    const sanitizedMessage = sanitizeHtml(message);

    // Send email using Resend
    const { data, error } = await getResend().emails.send({
      from: 'ONCA IT Website <noreply@oncait.com.ar>',
      to: ['mail@oncait.com.ar'],
      reply_to: email,
      subject: `Nuevo contacto de ${sanitizedName} - ${sanitizedCompany}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Teléfono:</strong> ${sanitizedPhone}</p>
        <p><strong>Empresa:</strong> ${sanitizedCompany}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitizedMessage}</p>
        <hr>
        <p style="font-size: 12px; color: #666;">IP: ${clientIp}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      {
        headers: {
          'X-RateLimit-Limit': '5',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

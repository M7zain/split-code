import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { field_id, lang_id } = await req.json();

    if (!field_id || !lang_id) {
      return NextResponse.json(
        { error: 'Field ID and Language ID are required.' },
        { status: 400 }
      );
    }

    // Insert into 'interested' table for user's field preference
    await sql`
      INSERT INTO public.interested (user_id, field_id)
      VALUES (${userId}, ${field_id})
      ON CONFLICT (user_id, field_id) DO NOTHING;  -- Prevent duplicate entries
    `;

    // Insert into 'knows' table for user's programming language preference
    await sql`
      INSERT INTO public.knows (user_id, lang_id)
      VALUES (${userId}, ${lang_id})
      ON CONFLICT (user_id, lang_id) DO NOTHING;  -- Prevent duplicate entries
    `;

    return NextResponse.json(
      { message: 'Preferences saved successfully.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error saving preferences:', error);

    return NextResponse.json(
      { message: 'Error saving preferences', error: error.message },
      { status: 500 }
    );
  }
}

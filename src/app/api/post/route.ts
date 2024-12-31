import { NextResponse, NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { title, position, content, difficulty, field, language } = body;

    if (!title || !position || !content) {
      return NextResponse.json({ error: 'Title, position, and content are required' }, { status: 400 });
    }

    await sql`
      INSERT INTO posts (user_id, title, position, content, difficulty, field_id, lang_id)
      VALUES (${userId}, ${title}, ${position}, ${content}, ${difficulty}, ${field}, ${language})
    `;

    return NextResponse.json({ message: 'Split created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error creating split', error: error.message },
      { status: 500 }
    );
  }
}

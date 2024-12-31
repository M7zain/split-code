import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  }

  try {
    const { post_id, user_id } = await req.json();

    if (!post_id || !user_id) {
      return NextResponse.json({ error: 'Post ID and User ID are required.' }, { status: 400 });
    }

    // Insert application into the database using Vercel Postgres
    await sql`
      INSERT INTO applications (post_id, user_id, created_at)
      VALUES (${post_id}, ${user_id}, NOW());
    `;

    return NextResponse.json({ message: 'Application submitted successfully.' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error submitting application',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

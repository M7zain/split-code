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
    const { post_id, user_id } = await req.json();

    if (!post_id || !user_id) {
      return NextResponse.json({ error: 'Post ID and User ID are required.' }, { status: 400 });
    }

    // Check if the user has already applied to the post
    const existingApplication = await sql`
      SELECT * FROM applications 
      WHERE post_id = ${post_id} AND user_id = ${user_id}
    `;

    if (existingApplication.rowCount > 0) {
      return NextResponse.json(
        { message: 'You have already applied to this post.' },
        { status: 400 }
      );
    }

    // Insert new application
    await sql`
      INSERT INTO applications (post_id, user_id, applied_at)
      VALUES (${post_id}, ${user_id}, NOW());
    `;

    return NextResponse.json({ message: 'Application submitted successfully.' }, { status: 200 });
  } catch (error: any) {
    console.error('Error submitting application:', error);

    return NextResponse.json(
      {
        message: 'Error submitting application',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

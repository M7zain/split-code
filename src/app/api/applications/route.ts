import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Fetch all users who applied to posts created by the authenticated user
    const result = await sql`
      SELECT 
        a.post_id,
        a.user_id AS applicant_id,
        u.first_name,
        u.last_name,
        a.applied_at,
        p.title AS post_title
      FROM applications a
      JOIN posts p ON a.post_id = p.id
      JOIN users u ON a.user_id = u.user_id
      WHERE p.user_id = ${userId}
      ORDER BY a.applied_at DESC;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ message: 'No applications found for your posts.' }, { status: 404 });
    }

    const applications = result.rows;

    return NextResponse.json({ applications }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching applications:', error);

    return NextResponse.json(
      {
        message: 'Error fetching applications',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

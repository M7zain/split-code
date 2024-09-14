import { NextResponse , NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    // Ensure request body is parsed
    const body = await req.json();

    // Extract userId from authentication
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Extract title and description from request body
    const { title, position , content , difficulty } = body;

    // Validate input
    if (!title || !position || !content) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    // Insert new split into database
    await sql`
      INSERT INTO posts (user_id, title, position , content, difficulty)
      VALUES (${userId} ,${title}, ${position} ,${content}, ${difficulty})
    `;

    return NextResponse.json({ message: 'Split created successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error creating split',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);  // Parse the query parameters
  const id = searchParams.get('id');          // Get the 'id' parameter

  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Post ID is missing' }, { status: 400 });
  }

  try {
    const { rows } = await sql`
      SELECT * FROM posts 
      WHERE id = ${id}
    `;
    return NextResponse.json(rows);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error fetching post',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

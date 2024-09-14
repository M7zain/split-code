import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'not authenticated' }, { status: 401 });
  }

  try {
    const { rows } = await sql`SELECT * FROM posts`; // Query using Vercel Postgres client
    return NextResponse.json(rows); // Return the rows as JSON
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error fetching posts',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

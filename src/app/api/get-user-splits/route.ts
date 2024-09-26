import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server';

// Define a type for saved post rows
type SavedPostRow = {
  post_id: string; // Adjust type if needed (e.g., number if IDs are numbers)
};

export async function GET(req: NextRequest) {

  const {searchParams} = new URL(req.url); 
  const visited_user_id = searchParams.get("visited_user_id");

  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {

    const { rows } = await sql `
      SELECT * 
      FROM posts 
      WHERE user_id = ${visited_user_id};
    `;


    return NextResponse.json(rows); // Return the post details as JSON
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

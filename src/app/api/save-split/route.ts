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

    const {post_id} = body; 

    // Insert new split into database
    await sql`
      INSERT INTO saved_posts (user_id, post_id)
      VALUES (${userId} ,${post_id})`;

    return NextResponse.json({ message: 'Split saved' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error saving split',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}


export async function DELETE(req: NextRequest) {
    try {
      const body = await req.json();
      const { userId } = getAuth(req);
  
      if (!userId) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }
  
      const { post_id } = body;
  
      // Remove the saved post from the database
      await sql`
        DELETE FROM saved_posts
        WHERE user_id = ${userId} AND post_id = ${post_id}`;
  
      return NextResponse.json({ message: 'Split unsaved' }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json(
        {
          message: 'Error unsaving split',
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
  

import { NextResponse, NextRequest } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = getAuth(req);

    const { id, title, position, content, difficulty } = body;

    
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    if (!id || !title || !position || !content) {
      return NextResponse.json({ error: 'ID, title, position, and content are required' }, { status: 400 });
    }

    // Fetch the post from the database to check the post's user_id
    const post = await sql`
      SELECT user_id FROM posts WHERE id = ${id};
    `;

    if (post.rowCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postOwnerId = post.rows[0].user_id;

    // Check if the authenticated user is the owner of the post
    if (postOwnerId !== userId) {
      return NextResponse.json({ error: 'You do not have permission to edit this post' }, { status: 403 });
    }

    // Update the post
    const result = await sql`
      UPDATE posts
      SET title = ${title}, position = ${position}, content = ${content}, difficulty = ${difficulty}
      WHERE id = ${id};
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 }) ;
    }
    
    console.log(userId); 
    return NextResponse.json({ message: 'Post updated successfully' }, { status: 200 });
    
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error updating post',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

import { getAuth } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const post_id = searchParams.get("id");

  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Fetch the post from the database to check the post's user_id
    const post = await sql`SELECT user_id FROM posts WHERE id = ${post_id};`;

    if (post.rowCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postOwnerId = post.rows[0].user_id;

    // Check if the authenticated user is the owner of the post
    if (postOwnerId !== userId) {
      return NextResponse.json({ error: 'You do not have permission to delete this post' }, { status: 403 });
    }

    // Delete the post if the user is authorized
    await sql`DELETE FROM posts WHERE id = ${post_id};`;

    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error deleting post',
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

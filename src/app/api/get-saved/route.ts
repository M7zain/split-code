import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server';

// Define a type for saved post rows
type SavedPostRow = {
  post_id: string; // Adjust type if needed (e.g., number if IDs are numbers)
};

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Get saved post IDs for the authenticated user
    const savedPosts = await sql`
      SELECT post_id 
      FROM saved_posts 
      WHERE user_id = ${userId}`;
    
    // Check if there are saved posts
    if (savedPosts.rowCount === 0) {
      return NextResponse.json({ message: 'No saved posts found' }, { status: 404 });
    }

    // Create a list of post IDs to fetch details from the posts table
    const postIds = (savedPosts.rows as SavedPostRow[]).map((row) => row.post_id);

    // If no postIds, return early
    if (postIds.length === 0) {
      return NextResponse.json({ message: 'No posts found' }, { status: 404 });
    }

    // Dynamically generate SQL query with parameterized IDs
    const placeholders = postIds.map((_, index) => `$${index + 1}`).join(',');
    const query = `
      SELECT * 
      FROM posts 
      WHERE id IN (${placeholders});
    `;

    // Execute the SQL query with parameterized postIds
    const result = await sql.query(query, postIds);

    return NextResponse.json(result.rows); // Return the post details as JSON
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

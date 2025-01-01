import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server";
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: 'Post ID is missing' }, { status: 400 });
  }

  try {
    const { rows } = await sql`
      SELECT 
        posts.*, 
        fields.name AS field_name, 
        prog_lang.name AS prog_lang_name
      FROM posts
      LEFT JOIN fields ON posts.field_id = fields.field_id
      LEFT JOIN prog_lang ON posts.lang_id = prog_lang.lang_id
      WHERE posts.id = ${id}
    `;
    return NextResponse.json(rows);
  } catch (error: any) {
    console.log(error);
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

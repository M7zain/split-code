import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const fields = await sql`SELECT * FROM fields`;
    const languages = await sql`SELECT * FROM prog_lang`;

    return NextResponse.json({
      fields: fields.rows,
      languages: languages.rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error fetching fields and languages', error: error.message },
      { status: 500 }
    );
  }
}

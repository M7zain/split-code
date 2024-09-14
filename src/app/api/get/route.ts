import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getAuth } from "@clerk/nextjs/server"
import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req : NextApiRequest, res: NextApiResponse) {

  const {userId} = getAuth(req);

  if(!userId){ 
    return res.status(401).json({error:'not authenticated'}); 
  }

  try {
    const { rows } = await sql`SELECT * FROM posts`;  // Query using Vercel Postgres client
    
    return NextResponse.json(rows);  // Return the rows as JSON
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

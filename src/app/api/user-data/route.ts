
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req :NextRequest) {
    const { searchParams } = new URL(req.url);  // Parse the query parameters
    const user_id  = searchParams.get('user_id');    // Get the 'user_id' parameter
    
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
      // If no 'user_id' parameter is provided in the query string
  if (!user_id) {
    return NextResponse.json({ error: "'user_id' parameter is missing" }, { status: 400 });
  }
  
    try {
        const response = await clerkClient.users.getUser(user_id);
        return NextResponse.json(response);

    }catch(error: any){ 
        return NextResponse.json(   {
            message: 'Error fetching user',
            error: error.message,
          },
          {
            status: 500,
          }); 
    }

   

}
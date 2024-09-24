import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {


    const {searchParams} = new URL(req.url); 
    const searchQuery = searchParams.get('searchQuery'); 

    const {userId} = getAuth(req);


    if(!searchQuery){ 
        return NextResponse.json({error: "search query missing "},{ status: 401 }); 

    }

    if(!userId){ 
        return NextResponse.json({
            error: "user not authenticated."
        },{status:401}); 
        
    }

    try{ 
        // Matches users with the string `test` matched in multiple user attributes.
        const { data, totalCount } = await clerkClient.users.getUserList({
            query: searchQuery,
          }); 
        
          return NextResponse.json(data); 

    }catch(error){ 
        NextResponse.json({ 
        error: error
        },{status: 500,});

    }
    
}
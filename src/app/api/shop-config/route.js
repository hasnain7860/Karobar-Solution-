import { NextResponse } from "next/server";
import { db } from "../../../lib/firebaseAdmin"; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  try {
    // FIX: Admin SDK Syntax use karo (Chaining method)
    // Client collection name 'client' hai (tumhare data ke hisab se)
    const docRef = db.collection("client").doc(id);
    const userDoc = await docRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    // Config Parsing
    let firebaseConfig = userData.AdminFirebaseObject; 
    
    if (typeof firebaseConfig === 'string') {
      try {
        firebaseConfig = JSON.parse(firebaseConfig);
      } catch (e) {
        console.error("Config parse error", e);
        return NextResponse.json({ error: "Invalid Shop Config" }, { status: 500 });
      }
    }

    const responseData = {
      shopName: userData.onlineStore?.displayName || userData.name || "Online Store", 
      config: firebaseConfig,
      phone: userData.phone || "",
      address: userData.address || ""
    };

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server Error", details: error.message }, { status: 500 });
  }
}



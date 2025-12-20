import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebaseAdmin"; // Relative import jaisa tumne kaha

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID missing" }, { status: 400 });
  }

  try {
    // 1. Main Database se User dhoondo
    const userDocRef = doc(db, "users", id);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    // 2. Data Prepare karo
    // Note: Hum Maan ke chal rahe hain ke tumne 'firebaseConfig' string ki bajaye object save kiya hai.
    // Agar string hai to JSON.parse karlena.
    let firebaseConfig = userData.firebaseConfig;
    
    // Agar tumne string save ki hai (jaisa pehle bataya tha), to parse karo:
    if (typeof firebaseConfig === 'string') {
      try {
        firebaseConfig = JSON.parse(firebaseConfig);
      } catch (e) {
        console.error("Config parse error", e);
      }
    }

    const responseData = {
      shopName: userData.businessName || "Online Store",
      config: firebaseConfig,
      // Shop details (Phone, Address) bhi bhej sakte ho agar DB mein hain
      phone: userData.phone || "",
      address: userData.address || ""
    };

    // 3. Response Return karo with CACHING Headers
    // public: Koi bhi cache kar sakta hai
    // s-maxage=60: Vercel/CDN 60 seconds tak cache karega (DB hits kam honge)
    // stale-while-revalidate=300: 60 sec ke baad bhi purana data dikhayega jab tak naya fetch na ho jaye
    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}


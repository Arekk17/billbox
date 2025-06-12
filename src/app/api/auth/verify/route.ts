import { NextResponse } from "next/server";
import { auth } from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const decodedToken = await auth().verifyIdToken(token);
    return NextResponse.json({ uid: decodedToken.uid });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

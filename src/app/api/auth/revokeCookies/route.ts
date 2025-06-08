import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.set("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error revoking cookies", error);
    return NextResponse.json(
      { error: "Wystąpił błąd podczas odwoływania ciasteczek" },
      { status: 500 }
    );
  }
}

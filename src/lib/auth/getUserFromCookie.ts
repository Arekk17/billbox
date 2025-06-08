import { cookies } from "next/headers";
import { adminAuth } from "../firebase/admin";

export async function getUserFromCookie() {
  const cookieStore = await cookies();
  const session = cookieStore.get("jwt");

  if (!session) {
    console.log("No session cookie found");
    return null;
  }

  try {
    const decodedToken = await adminAuth.verifySessionCookie(session.value);
    console.log("Successfully verified session cookie");
    return decodedToken;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

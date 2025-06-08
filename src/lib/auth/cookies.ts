// import { cookies } from "next/headers";
// import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const AUTH_COOKIE_NAME = "auth_token";
// const AUTH_COOKIE_EXPIRE_DAY = 1;

// export const cookieService = {
//   setAuthCookie: async (token: string) => {
//     const cookieStore = await cookies();
//     const expires = new Date();
//     expires.setDate(expires.getDate() + AUTH_COOKIE_EXPIRE_DAY);
//     const cookieOptions: Partial<ResponseCookie> = {
//       expires,
//       httpOnly: true,
//       sameSite: "strict",
//       path: "/",
//     };

//     cookieStore.set(AUTH_COOKIE_NAME, token, cookieOptions);
//   },

//   getAuthCookie: async (): Promise<string | undefined> => {
//     const cookieStore = await cookies();
//     return cookieStore.get(AUTH_COOKIE_NAME)?.value;
//   },

//   deleteAuthCookie: async () => {
//     const cookieStore = await cookies();
//     cookieStore.delete(AUTH_COOKIE_NAME);
//   },
// };

export const cookieService = {
  setAuthCookie: (response: Response, token: string) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1); // 1 dzień

    response.headers.set(
      "Set-Cookie",
      `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Expires=${expires.toUTCString()}`
    );
  },

  clearAuthCookie: (response: Response) => {
    response.headers.set(
      "Set-Cookie",
      `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
  },
};

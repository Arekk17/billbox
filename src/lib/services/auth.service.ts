import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from "@/lib/validations/auth";
import { auth } from "@/lib/firebase/firebase";
import { createUser } from "./user.service";
export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const validateFields = loginSchema.safeParse(data);
    if (!validateFields.success) {
      return {
        success: false,
        error: validateFields.error.message,
      };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const idToken = await userCredential.user.getIdToken();

      const response = await fetch("/api/auth/createCookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: idToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create cookie");
      }

      return {
        success: true,
        user: userCredential.user,
      };
    } catch (error) {
      console.error("Firebase auth error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Wystąpił błąd podczas logowania",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
export const register = async (
  data: RegisterFormData
): Promise<AuthResponse> => {
  try {
    const validateFields = registerSchema.safeParse(data);
    if (!validateFields.success) {
      return {
        success: false,
        error: validateFields.error.message,
      };
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    await createUser(userCredential.user.uid, {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    const idToken = await userCredential.user.getIdToken();

    const response = await fetch("/api/auth/createCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: idToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create cookie");
    }
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};
export const logout = async (): Promise<AuthResponse> => {
  try {
    await signOut(auth);
    const response = await fetch("/api/auth/revokeCookies", {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Failed to delete cookie");
    }
    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Wystąpił błąd",
    };
  }
};

export const isAuthenticated = (): boolean => {
  return !!auth.currentUser;
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// TODO: Implement refresh token

// export const refreshToken = async (): Promise<AuthResponse> => {
//   try {
//     const user = auth.currentUser;
//     if (!user) {
//       return { success: false, error: "No authenticated user found" };
//     }

//     return { success: true, user: user };
//   } catch (error) {
//     console.error("Token refresh error:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Wystąpił błąd",
//     };
//   }
// };

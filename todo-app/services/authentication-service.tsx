export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const authBaseUrl = "/api/auth";

export const login = async (credentials: {
  username: string;
  password: string;
}): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(`${authBaseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Failed to login");
    return { data: null, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

export const register = async (userInfo: {
  username: string;
  email: string;
  password: string;
  token: string;
}): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(`${authBaseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse.error || "Failed to register");
    }
    return { data: null, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
};

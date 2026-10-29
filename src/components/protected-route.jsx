"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../contexts/auth-context";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { setCredentials } from "../lib/redux/authSlice";

export default function ProtectedRoute({ children, requiredRole }) {
  // 🌐 Redux auth
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [hydrated, setHydrated] = useState(false);

  // ⏳ Auth context sirf loading ke liye use kar rahe
  const { loading } = useAuth();
  const router = useRouter();

  // 🔁 Redux auth ko localStorage se hydrate karo (page reload ke baad)
  useEffect(() => {
    if (hydrated || typeof window === "undefined") return;

    try {
      const token = localStorage.getItem("authToken");
      const userRaw = localStorage.getItem("authUser");

      if (token && userRaw) {
        const parsedUser = JSON.parse(userRaw);
        dispatch(
          setCredentials({
            user: parsedUser,
            token,
            email: parsedUser?.email,
            role: parsedUser?.role,
          })
        );
      }
    } catch (error) {
      console.error("Failed to hydrate auth state:", error);
    } finally {
      setHydrated(true);
    }
  }, [dispatch, hydrated]);

  useEffect(() => {
    if (loading || !hydrated) return; // jab tak loading true hai, kuch mat karo

    // 1) login hi nahi → login page
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // 2) role mismatch → redirect
    if (requiredRole && role !== requiredRole) {
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/account");
      }
    }
  }, [loading, hydrated, isLoggedIn, role, requiredRole, router]);

  // 🔄 jab tak loading ya hydration chal raha hai → spinner
  if (loading || !hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // agar abhi bhi logged in nahi ya role mismatch hai → kuch render nahi
  if (!isLoggedIn) return null;
  if (requiredRole && role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <Alert variant="destructive">
            <AlertDescription>
              Access denied. You don't have permission to view this page.
            </AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

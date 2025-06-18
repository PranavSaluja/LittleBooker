// src/app/auth/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams

export default function AuthPage() {
  // REMOVE THIS LINE: This state is preventing the URL param from taking effect.
  // const [isLoginMode, setIsLoginMode] = useState(true);

  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // To prevent flickering
  const router = useRouter();
  const searchParams = useSearchParams(); // Get access to URL search parameters

  // Calculate isLogin from the URL query parameter
  // If 'isLogin' param is 'false', it means we want signup mode.
  // Otherwise (if 'true', or not present), it means login mode.
  const isLoginFromUrl = searchParams.get("isLogin") !== "false"; // This line is the fix!

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is logged in, redirect them to the dashboard
        router.push("/dashboard");
      } else {
        setIsLoadingAuth(false); // Auth state checked, no user logged in
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);

  if (isLoadingAuth) {
    // Show a loading state while checking authentication
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  return (
    // Pass the isLoginFromUrl to AuthForm
    <AuthForm isLogin={isLoginFromUrl} />
  );
}
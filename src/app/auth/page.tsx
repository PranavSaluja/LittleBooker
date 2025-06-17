// src/app/auth/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // To prevent flickering
  const router = useRouter();

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
  }, [router]); // Depend on router to ensure effect reruns if router changes

  if (isLoadingAuth) {
    // Show a loading state while checking authentication
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <p>Checking authentication status...</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ color: "#222" }}>Welcome to LittleBooker!</h1>
      <button
        onClick={() => setIsLoginMode(!isLoginMode)}
        style={{
          padding: "10px 20px",
          margin: "30px 0 20px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #ced4da",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          color: "#495057",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        Switch to {isLoginMode ? "Sign Up" : "Login"}
      </button>

      <AuthForm isLogin={isLoginMode} />
    </div>
  );
}
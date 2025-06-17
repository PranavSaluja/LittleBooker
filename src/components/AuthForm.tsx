// src/components/AuthForm.tsx
"use client"; // Marks this as a Client Component for Next.js App Router

import React, { useState } from "react";
import { auth } from "@/firebase/firebase"; // Import the auth instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation"; // For redirection
import { FirebaseError } from "firebase/app"; // Import FirebaseError for type safety

interface AuthFormProps {
  isLogin: boolean; // true for login, false for signup
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(null); // Clear previous errors
    setLoading(true); // Show loading state

    try {
      if (isLogin) {
        // Firebase Login function
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully!");
      } else {
        // Firebase Signup function
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully!");
      }
      router.push("/dashboard"); // Redirect to the dashboard page after successful auth
    } catch (err) {
      // Safely handle different error types, especially FirebaseError
      if (err instanceof FirebaseError) {
        setError(err.message); // FirebaseError has a message property
        console.error("Firebase Auth error:", err.code, err.message);
      } else if (err && typeof err === 'object' && 'message' in err) {
        // Fallback for other error types that might have a message property
        setError((err as { message: string }).message);
        console.error("Generic error:", err);
      } else {
        setError("An unexpected error occurred.");
        console.error("Unknown error:", err);
      }
    } finally {
      setLoading(false); // Always end loading state
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        {isLogin ? "Login" : "Create Account"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px", color: "#555" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "calc(100% - 16px)", // Full width minus padding
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px", color: "#555" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "calc(100% - 16px)",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              fontSize: "16px",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#007bff", // Primary blue color
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
            // Add hover effect
           
          }}
        >
          {loading
            ? isLogin
              ? "Logging in..."
              : "Signing up..."
            : isLogin
            ? "Login"
            : "Sign Up"}
        </button>
        {error && (
          <p style={{ color: "#dc3545", marginTop: "15px", textAlign: "center" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
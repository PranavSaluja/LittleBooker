// src/app/dashboard/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // State to manage loading of user
  const router = useRouter();

  useEffect(() => {
    // Set up an observer to listen for changes in the user's sign-in state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        setUser(currentUser);
        setLoading(false);
      } else {
        // User is signed out, redirect to the authentication page
        console.log("No user found, redirecting to auth page.");
        router.push("/auth");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]); // Depend on router to ensure effect reruns if router changes

  if (loading) {
    // Show a loading spinner or message while authentication status is being checked
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // Only render content if user is available (meaning they are logged in)
  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h1 style={{ color: "#28a745" }}>Welcome to your Dashboard!</h1>
      {user ? (
        <p style={{ fontSize: "1.1em", color: "#333" }}>
          You are logged in as: **{user.email}**
        </p>
      ) : (
        // This case should ideally not be reached if redirects work, but for safety:
        <p style={{ color: "#6c757d" }}>
          You need to be logged in to view this page.
        </p>
      )}

      <SignOutButton />

      <p style={{ marginTop: "30px", color: "#6c757d", fontSize: "0.9em" }}>
        This is a protected page accessible only to authenticated users.
      </p>
    </div>
  );
}
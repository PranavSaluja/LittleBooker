// src/components/SignOutButton.tsx
"use client";

import React from "react";
import { auth } from "@/firebase/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out!");
      // Redirect to the authentication page after logout
      router.push("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        padding: "10px 20px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginTop: "20px",
        transition: "background-color 0.3s ease",
      }}
    >
      Sign Out
    </button>
  );
}
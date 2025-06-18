// src/components/AuthForm.tsx
"use client";

import React, { useState } from "react";
import { auth } from "@/firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";

// Import Lottie component and the JSON data for both animations
import Lottie from "lottie-react";
import loginCornerAnimationData from "../../public/lottie/login-corner-animation.json"; // Existing Lottie
import helloPandaAnimationData from "../../public/lottie/hello-panda.json"; // New Panda Lottie

interface AuthFormProps {
  isLogin: boolean;
}

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isGoogleHovered, setIsGoogleHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up successfully!");
      }
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
        console.error("Firebase Auth error:", err.code, err.message);
      } else if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message);
        console.error("Generic error:", err);
      } else {
        setError("An unexpected error occurred.");
        console.error("Unknown error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: 'url("/login/background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
        color: "#333",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Main Content Wrapper - Centers the character and the login card */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          padding: "20px",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 2,
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* Panda Lottie Animation - Placed in the left (jungle) area */}
        <div
          style={{
            position: "absolute", // Position it relative to the main content wrapper
            bottom: "0px", // Adjust to sit at the bottom or slightly above
            left: "0%", // Align to the left side
            width: "50%", // Make it quite large, covering the left area
            maxWidth: "600px", // Prevent it from getting too big on huge screens
            height: "auto",
            zIndex: 1, // Keep it behind the login card, but on top of the background
            transform: "translateX(-10%)", // Slightly shift left to overlap
            pointerEvents: "none", // Prevent clicks on the Lottie interfering with other elements
          }}
        >
          <Lottie
            animationData={helloPandaAnimationData}
            loop={true}
            autoplay={true}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Login/Signup Form Card */}
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            maxWidth: "380px",
            width: "90%",
            boxSizing: "border-box",
            position: "relative",
            zIndex: 10,
            marginLeft: "auto",
            marginRight: "5%",
          }}
        >
          {/* Existing Lottie Animation in Top-Right Corner of Login Card */}
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "100px",
              height: "100px",
              zIndex: 11,
            }}
          >
            <Lottie
              animationData={loginCornerAnimationData}
              loop={true}
              autoplay={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <h1
            style={{
              textAlign: "left",
              marginBottom: "30px",
              fontSize: "36px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {isLogin ? "Login" : "Create Account"}
          </h1>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "calc(100% - 36px)",
                    padding: "12px 16px",
                    paddingRight: "40px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                  }}
                >
                  {/* Icon for email, e.g., a mail icon */}
                </span>
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: "25px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "calc(100% - 36px)",
                    padding: "12px 16px",
                    paddingRight: "40px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
                <span
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#999",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    console.log("Toggle password visibility (implement this!)")
                  }
                >
                  {/* Icon for password visibility toggle, e.g., an eye icon */}
                </span>
              </div>
            </div>

            <p
              style={{
                textAlign: "right",
                marginBottom: "25px",
                // Conditional styling to hide but maintain space
                opacity: isLogin ? 1 : 0,
                height: isLogin ? "auto" : "20px", // Approximate height for the link when hidden
                overflow: "hidden", // Hide overflow if height is fixed
                transition: "opacity 0.3s ease-in-out", // Smooth fade
                pointerEvents: isLogin ? "auto" : "none", // Prevent interaction when hidden
              }}
            >
              <a
                href="#"
                style={{
                  color: "#f75959",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Forgot Password?
              </a>
            </p>
            

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: isButtonPressed
                  ? "#2BAAAA"
                  : isButtonHovered
                  ? "#36C1C1"
                  : "#48D1CC",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                boxShadow: "0 4px 15px rgba(72, 209, 204, 0.4)",
                transform:
                  isButtonHovered && !loading
                    ? "translateY(-2px)"
                    : "translateY(0)",
              }}
              onMouseEnter={() => !loading && setIsButtonHovered(true)}
              onMouseLeave={() => {
                setIsButtonHovered(false);
                setIsButtonPressed(false);
              }}
              onMouseDown={() => !loading && setIsButtonPressed(true)}
              onMouseUp={() => !loading && setIsButtonPressed(false)}
            >
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Log In"
                : "Sign Up"}
            </button>

            {error && (
              <p
                style={{
                  color: "#dc3545",
                  marginTop: "18px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                {error}
              </p>
            )}

            {/* OR separator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                margin: "30px 0",
              }}
            >
              <hr style={{ flexGrow: 1, borderColor: "#eee", borderTop: 0 }} />
              <span
                style={{ padding: "0 15px", color: "#999", fontSize: "14px" }}
              >
                Or
              </span>
              <hr style={{ flexGrow: 1, borderColor: "#eee", borderTop: 0 }} />
            </div>

            {/* ONLY GOOGLE LOGIN BUTTON */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: isGoogleHovered ? "#f9f9f9" : "white",
                  border: isGoogleHovered
                    ? "1px solid #ccc"
                    : "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: "#555",
                  fontWeight: "500",
                  transition: "background-color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={() => setIsGoogleHovered(true)}
                onMouseLeave={() => setIsGoogleHovered(false)}
              >
                <img
                  src="/icons/google-icon.svg"
                  alt="Google"
                  style={{ width: "20px", height: "20px" }}
                />
                Continue with Google
              </button>
            </div>

            <p
              style={{
                textAlign: "center",
                marginTop: "30px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  // Toggle the mode based on the current isLogin state
                  router.push(`/auth?isLogin=${!isLogin}`);
                }}
                style={{
                  color: "#48D1CC",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
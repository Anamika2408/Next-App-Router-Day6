"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="container">
      <h1>Login</h1>
      <button
        className="google-btn"
        onClick={() => signIn("google", { prompt: "select_account" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}

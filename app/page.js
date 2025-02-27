"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "./components/LoginPage";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (session) {
      const interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      setTimeout(() => router.push("/dashboard"), 5000);
      return () => clearInterval(interval);
    }
  }, [session]);

  return session ? (
    <p>Already logged in, Redirecting you in {countdown}...</p>
  ) : (
    <LoginPage />
  );
}

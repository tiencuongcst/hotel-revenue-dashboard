"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          password,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        setErrorMessage(result.message || "Login failed");
        return;
      }

      router.push("/reports/performance");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#ffffff",
          borderRadius: 14,
          padding: 32,
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1
          style={{
            margin: "0 0 28px",
            fontSize: 26,
            fontWeight: 700,
            color: "#020617",
          }}
        >
          Login
        </h1>

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
          autoComplete="username"
          style={{
            width: "100%",
            height: 52,
            padding: "0 16px",
            marginBottom: 16,
            borderRadius: 9,
            border: "1px solid #111827",
            fontSize: 18,
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          style={{
            width: "100%",
            height: 52,
            padding: "0 16px",
            marginBottom: 16,
            borderRadius: 9,
            border: "1px solid #111827",
            fontSize: 18,
            outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 9,
            border: "none",
            background: loading ? "#374151" : "#000000",
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {errorMessage && (
          <p
            style={{
              marginTop: 14,
              color: "#dc2626",
              fontSize: 14,
            }}
          >
            {errorMessage}
          </p>
        )}
      </form>
    </main>
  );
}
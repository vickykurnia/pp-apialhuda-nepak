// src/pages/Login.jsx
import { useState } from "react";
import { LoginForm } from "../components/ui/login-form";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token SEBELUM redirect, agar ProtectedRoute mengenali sesi login.
        // Sesuaikan "data.token" dengan nama field yang benar-benar dikirim
        // backend Anda (cek di DevTools > Network > Response saat login).
        // Contoh field yang umum dipakai: data.token, data.access_token, data.accessToken
        const token = data.token || data.access_token || data.accessToken;

        if (!token) {
          console.error("Response login tidak mengandung token:", data);
          setError("Login berhasil tapi token tidak ditemukan pada response server.");
          setIsLoading(false);
          return;
        }

        localStorage.setItem("token", token);

        // (Opsional) simpan juga info user kalau backend mengirimnya
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Username atau Password salah.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Gagal terhubung ke server backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <LoginForm
        onSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
}
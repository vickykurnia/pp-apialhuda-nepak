// src/components/ui/login-form.jsx
"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export function LoginForm({ className, ...props }) {
  // Tetap pakai variabel email di frontend agar tidak merubah visual layout bawaan
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // PERBAIKAN: Mengarah langsung ke endpoint otentikasi backend yang benar (/api/auth/login)
      const response = await fetch("http://localhost:5000/api/auth/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // KUNCI: Nilai input string 'email' dikirim sebagai 'username' ke database backend
        body: JSON.stringify({ username: email, password })
      });
      
      if (response.ok) {
        alert("Login Berhasil!");
        window.location.href = "/dashboard"; // Mengarahkan ke rute panel admin dashboard
      } else {
        setError("Username atau Password salah.");
      }
    } catch (err) {
      setError("Gagal terhubung ke server backend API.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex min-h-[700px] w-full bg-white text-gray-900", className)} {...props}>
      {/* Sisi Kiri - Gambar Banner Sesuai Tampilan Sebelumnya */}
      <div className="w-full hidden md:block">
        <img 
          className="h-full w-full object-cover" 
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" 
          alt="Login banner" 
        />
      </div>
      
      {/* Sisi Kanan - Form */}
      <div className="w-full flex flex-col items-center justify-center p-8">
        <form onSubmit={handleSubmit} className="md:w-96 w-full max-w-sm flex flex-col items-center justify-center">
          <h2 className="text-4xl text-gray-900 font-medium tracking-tight">Sign in</h2>
          <p className="text-sm text-gray-500 mt-3">Welcome back! Please sign in to continue</p>
      
          <button 
            type="button" 
            className="w-full mt-8 bg-gray-500/10 hover:bg-gray-500/20 flex items-center justify-center h-12 rounded-full transition-colors cursor-pointer"
          >
            <img 
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" 
              alt="Google logo" 
            />
          </button>
      
          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-200"></div>
            <p className="whitespace-nowrap text-sm text-gray-400">or sign in with email</p>
            <div className="w-full h-px bg-gray-200"></div>
          </div>
      
          {/* Input - Secara visual tetap mempertahankan teks petunjuk 'Email' */}
          <div className="flex items-center w-full bg-transparent border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500 transition-colors">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
            </svg>
            <input 
              type="text" 
              placeholder="Email id (atau masukan Username)" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm w-full h-full pr-4" 
              required 
            />                  
          </div>
      
          {/* Input Password */}
          <div className="flex items-center mt-4 w-full bg-transparent border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 focus-within:border-indigo-500 transition-colors">
            <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
            </svg>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm w-full h-full pr-4" 
              required 
            />
          </div>
      
          {/* Menampilkan pesan kesalahan secara dinamis */}
          {error && (
            <div className="mt-4 p-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-full w-full text-center">
              {error}
            </div>
          )}
      
          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 font-medium shadow-sm transition-colors cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Memuat..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { LoginForm } from "@/components/login-form";
import { UserService } from "@/services/UserService";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const userService = new UserService();

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    // função assíncrona dentro do effect
    const handleGitHubCallback = async () => {
      try {
        await userService.getToken(code); // salva o token no cookie automaticamente
        router.push("/"); // redireciona corretamente no client
      } catch (err) {
        console.error("Erro ao obter token:", err);
      }
    };

    handleGitHubCallback();
  }, [code]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

"use client";

import { LoginForm } from "@/components/login-form";
import { UserService } from "@/services/UserService";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const userService = new UserService();

// 1. Criamos um componente interno para a lógica de busca
function LoginHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    const handleGitHubCallback = async () => {
      try {
        await userService.getToken(code);
        router.push("/");
      } catch (err) {
        console.error("Erro ao obter token:", err);
      }
    };

    handleGitHubCallback();
  }, [code, router]);

  return null; // Este componente não renderiza nada visualmente
}

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* 2. Aplicando a fonte "diferente" (Certifique-se de ter configurado no tailwind.config.js) */}
      <span className="font-special mb-10 text-center text-4xl font-extrabold tracking-tighter text-gray-800 dark:text-gray-100 md:text-6xl uppercase">
        Acesse o Portfolie utilizando sua conta do GitHub
      </span>

      <div className="w-full max-w-sm">
        {/* 3. O Suspense é obrigatório para envolver qualquer uso de useSearchParams no Next.js App Router */}
        <Suspense
          fallback={
            <div className="text-gray-500">Carregando autenticação...</div>
          }
        >
          <LoginHandler />
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

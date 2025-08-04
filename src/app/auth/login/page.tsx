"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeButton } from "@/components/ui/theme-button";
import { api } from "@/lib/axios";
import { getToken, setToken } from "@/lib/token";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { Loginform } from "./_components/login-form";
import { Registerform } from "./_components/register-form";

export default function LoginPage() {
  const router = useRouter();

  const [actualSection, setActualSection] = useState<"login" | "register">("login")

  useEffect(() => {
    if (getToken()) {
      router.push("/teams")
    }
  }, [])

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/assets/banner_2.jpg"
          alt="Login Banner"
          fill
          className="object-cover brightness-70"
        />
        <div className="absolute bottom-8 left-8 text-white m-12">
          <h2 className="text-3xl font-bold">Monte o melhor time!</h2>
          <p className="mt-2">Com todos os pokemons, de todas as gerações fica dificil não montar um time bom!</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="flex flex-row items-center justify-center text-center mb-12">
            <Image
              src="/assets/pokeball_logo.png"
              alt="Logo"
              width={80}
              height={80}
            />
          </div>

          <h2 className="text-3xl font-bold text-center text-primary">
            Bem Vindo!
          </h2>
          {actualSection == "login" ?
            <p className="text-center text-red-600">Entre na sua conta</p>
            :
            <p className="text-center text-red-600">Crie sua conta</p>
          }
          {actualSection == "login" &&
            <Loginform />
          }
          {actualSection == "register" &&
            <Registerform />
          }
          {actualSection == "login" ?
            <p className="text-center text-sm">Não tem uma conta? <span onClick={() => setActualSection("register")} className="hover:underline text-red-600 cursor-pointer">Clique aqui</span></p>
            :
            <p className="text-center text-sm">Ja tem uma conta? <span onClick={() => setActualSection("login")} className="hover:underline text-red-600 cursor-pointer">Clique aqui</span></p>
          }
        </div>
        <ThemeButton />
      </div>
    </div>
  );
}
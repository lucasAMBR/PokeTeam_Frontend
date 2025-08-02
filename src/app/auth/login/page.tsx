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

export default function LoginPage(){
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<null | string>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try{
            const response = await api.post("/login", { email, password });
            setToken(response.data.acess_token);
            router.push("/teams");
        }catch(error: any){
            setError(error.message)
        }
    }

    useEffect(()=>{
        if(getToken()){
            router.push("/teams")
        }
    }, [])

    return(
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
            Welcome Back!
          </h2>
          <p className="text-center text-red-900">Sign in to your account</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-stone-800 dark:text-gray-200 block text-sm font-medium">Email</label>
              <Input
                name="email"
                className="h-12"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-stone-800 dark:text-gray-200 block text-sm font-medium">Password</label>
              <Input
                name="password"
                className="h-12"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black dark:bg-stone-800 dark:hover:bg-red-800 text-white py-2 rounded hover:bg-red-800 transition cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm">
            Don’t have any account?{" "}
            <a href="/auth/register" className="text-red-600 hover:underline">
              Register
            </a>
          </p>
        </div>
        <ThemeButton />
      </div>
    </div>
    );
}
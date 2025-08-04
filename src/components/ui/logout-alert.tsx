"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/user-context";
import { clearToken } from "@/lib/token";
import { LogOut, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutDialog() {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout(){
    logout();
    router.push("/auth/login")
  }
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
        variant="ghost"
        className="mt-6 w-full flex justify-start space-x-2 hover:bg-red-200 dark:hover:bg-red-900 text-red-700 hover:text-red-700 dark:text-red-400"
      >
        <LogOut size={18} />
        <span>Sair</span>
      </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que gostaria de sair?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

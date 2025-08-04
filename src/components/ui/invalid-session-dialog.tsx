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
import { useEffect, useState } from "react";

export function InvalidTokenDialog() {
    const { logout } = useAuth();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    function handleLogout() {
        logout();
        router.push("/auth/login")
    }

    useEffect(() => {
        setOpen(true);
    }, []);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
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
                    <AlertDialogTitle>Seu sessão expirou</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">Voltar para o Login</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

import { Input } from "@/components/ui/input";
import { api } from "@/lib/axios";
import { setToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Registerform() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string | null>();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            console.log(name, email, password, confirmPassword)
            const response = await api.post("/users", {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            });

            const login = await api.post("/login", { email, password });
            setToken(login.data.acess_token);
            router.push("/teams");
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="text-stone-800 dark:text-gray-200 block text-sm font-medium">Nome</label>
                <Input
                    name="email"
                    className="h-12"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
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
                <label className="text-stone-800 dark:text-gray-200 block text-sm font-medium">Senha</label>
                <Input
                    name="password"
                    className="h-12"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="text-stone-800 dark:text-gray-200 block text-sm font-medium">Confirmar senha</label>
                <Input
                    name="password"
                    className="h-12"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-black dark:bg-stone-800 dark:hover:bg-red-800 text-white py-2 rounded hover:bg-red-800 transition cursor-pointer"
            >
                Register
            </button>
        </form>
    )
}
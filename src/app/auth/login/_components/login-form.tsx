import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/user-context";
import { api } from "@/lib/axios";
import { setToken } from "@/lib/token";
import { AuthResponse } from "@/types/auth";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Loginform() {
    const { login } = useAuth();

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await api.post("/login", { email, password });
            login(response.data);
            setLoading(false)
            router.push("/teams");
        } catch (error: any) {
            console.log(error.response.data.message)
            setLoading(false)
            setError(error.response.data.message)
        }
        
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {error != null &&
                <div className="dark:bg-red-800 bg-red-300 p-4 rounded-md flex flex-row items-center gap-2">
                    <AlertCircle /> {error}
                </div>
            }
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
                {loading ? "Carregando..." : "Login"}
            </button>
        </form>
    )
}
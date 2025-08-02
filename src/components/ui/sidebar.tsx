import Link from "next/link";
import { Home, Settings, User, LogOut, AlignJustify, Search, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { theme } = useTheme();

  const links = [
    { href: "/teams", label: "Times", icon: Home },
    { href: "/create", label: "Criar time", icon: Plus },
    { href: "/search", label: "Pesquisar", icon: Search },
  ];

  function handleLogout() {
    console.log("Logout clicado");
  }

  return (
      <aside className="hidden md:flex md:w-64 h-screen flex flex-col justify-between border-r dark:border-zinc-900 bg-gray-200 dark:bg-stone-800 p-4 border-gray-300">

      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-zinc-800 dark:text-white">PokemonTeams</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Gerencie seus times</p>
        </div>

        <nav className="flex flex-col space-y-2">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center space-x-2 p-2 rounded hover:bg-zinc-100 dark:hover:bg-stone-700 transition-colors"
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <Button
        variant="ghost"
        className="mt-6 w-full flex justify-start space-x-2 hover:bg-red-200 dark:hover:bg-red-900 text-red-700 hover:text-red-700 dark:text-red-400"
        onClick={handleLogout}
      >
        <LogOut size={18} />
        <span>Sair</span>
      </Button>
    </aside>
  );
}


export function MobileSidebar() {
  return (
    <div className={"md:hidden fixed top-0 left-0 flex items-center p-4 m-4 rounded-md cursor-pointer transition-all duration-300 bg-black dark:bg-white text-white dark:text-black"}>
        <AlignJustify className="h-4 w-4"/>
    </div>
  );
}

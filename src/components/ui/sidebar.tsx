import Link from "next/link";
import { Home, Settings, User, LogOut, AlignJustify, Search, Plus, User2 } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoutDialog } from "./logout-alert";
import { useAuth } from "@/context/user-context";
import { usePathname } from "next/navigation";
import path from "path";
import Image from "next/image";
import { useState } from "react";
import { getUserData } from "@/lib/user";

export function Sidebar() {
  const userData = getUserData()

  const pathname = usePathname();

  const links = [
    { href: "/teams", label: "Times", icon: Home },
    { href: "/create", label: "Criar time", icon: Plus },
  ];

  return (
    <aside className="hidden md:flex md:w-[300px] h-screen flex flex-col justify-between border-r dark:border-zinc-900 bg-gray-50 dark:bg-stone-800 p-4 border-gray-300">

      <div>
        <div className="mb-6">
          <div className="flex flex-col items-center">
            <Image src={"/assets/pokeball_logo.png"} alt="logo" width={40} height={40} className="my-1" />
            <h2 className="text-xl font-bold text-zinc-800 dark:text-white">PokemonTeams</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Gerencie seus times</p>
          </div>
          <hr className="border-t border-gray-200 dark:border-stone-700 my-6" />
          <div className="flex flex-row items-center dark:bg-stone-700 bg-gray-200 p-2 rounded-md gap-2 my-4">
            <div className="p-4 rounded-full dark:bg-stone-900 bg-gray-400">
              <User2 onClick={() => console.log(userData?.name)} />
            </div>
            <div className="w-full">
              <p className="font-semibold">{userData?.name}</p>
              <p className="text-sm">{userData?.email}</p>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-200 dark:border-stone-700 my-6" />
        <nav className="flex flex-col space-y-2 my-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                `flex items-center space-x-2 p-2 rounded ${pathname == href ? "bg-blue-800 text-white" : "hover:bg-zinc-100 dark:hover:bg-stone-700"} transition-colors`
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <LogoutDialog />
    </aside>
  );
}


export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const userData = getUserData()
  const pathname = usePathname();

  const links = [
    { href: "/teams", label: "Times", icon: Home },
    { href: "/create", label: "Criar time", icon: Plus },
  ];

  const toggleOpen = () => setOpen(!open);

  return (
    <>
      <button
        onClick={toggleOpen}
        aria-label="Toggle menu"
        className="md:hidden fixed top-4 left-4 z-[1001] flex items-center justify-center p-2 rounded-md
          bg-gray-900 dark:bg-gray-50 text-white dark:text-black shadow-lg
          hover:bg-gray-700 dark:hover:bg-gray-200 transition"
      >
        <AlignJustify size={24} />
      </button>

      {open && (
        <div
          onClick={toggleOpen}
          className="fixed inset-0 bg-black opacity-50 z-[1000]"
          aria-hidden="true"
        />
      )}
      <aside
        className={cn("fixed top-0 left-0 h-full w-64 bg-gray-50 dark:bg-stone-800 p-4 border-r border-gray-300 dark:border-zinc-900 flex flex-col justify-between z-[1001] transform transition-transform duration-300", open ? "translate-x-0" : "-translate-x-full")}>
        <div>
          <div className="mb-6 flex flex-col items-center">
            <Image
              src={"/assets/pokeball_logo.png"}
              alt="logo"
              width={40}
              height={40}
              className="my-1"
            />
            <h2 className="text-xl font-bold text-zinc-800 dark:text-white">
              PokemonTeams
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Gerencie seus times
            </p>
          </div>

          <hr className="border-t border-gray-200 dark:border-stone-700 my-6" />

          <div className="flex flex-row items-center dark:bg-stone-700 bg-gray-200 p-2 rounded-md gap-2 my-4">
            <div className="p-4 rounded-full dark:bg-stone-900 bg-gray-400">
              <User2 onClick={() => console.log(userData?.name)} />
            </div>
            <div className="w-full">
              <p className="font-semibold">{userData?.name}</p>
              <p className="text-sm">{userData?.email}</p>
            </div>
          </div>

          <hr className="border-t border-gray-200 dark:border-stone-700 my-6" />

          <nav className="flex flex-col space-y-2 my-4">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)} // fecha o menu ao navegar
                className={cn(
                  `flex items-center space-x-2 p-2 rounded
                   ${pathname === href
                    ? "bg-blue-800 text-white"
                    : "hover:bg-zinc-100 dark:hover:bg-stone-700"
                  } transition-colors`
                )}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <LogoutDialog />
      </aside>
    </>
  );
}
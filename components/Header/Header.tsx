import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdMenu, MdAccountCircle } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import Menu from "../Menu/Menu";
import { request } from "@/lib/axiosUtils";

type Props = {
  isNavOpen: boolean;
  title: string;
  setIsNavOpen: (value: boolean) => void;
};

function Header({ isNavOpen, setIsNavOpen, title }: Props) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const toggleNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const menuItems = [
    {
      label: "ログアウト",
      onClick: async () => {
        try {
          await request({
            url: "/api/auth/logout/",
            method: "post",
          });
        } finally {
          logout();
          router.replace("/login");
        }
      },
    },
  ];

  return (
    <>
      <header className="flex justify-between items-end bg-slate-700 h-16 px-4">
        <button onClick={toggleNav} className="m-2">
          <MdMenu size={27} color="white" />
        </button>
        <h1 className="text-white text-xl font-bold flex-grow text-center">
          {title}
        </h1>
        <Menu items={menuItems}>
          <div className="text-white text-xl font-bold mr-3">
            {user?.username}
          </div>
          <MdAccountCircle size={27} color="white" className="mb-2" />
        </Menu>
      </header>

      <nav
        onClick={(e) => e.stopPropagation()}
        className={`absolute left-0 w-64 h-full bg-neutral-800 z-20 shadow-xl top-16 transition-all duration-300 ease-in-out ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="text-white text-lg">
          <li className="link">
            <Link href="/order_system">Home</Link>
          </li>
          <li className="link">
            <Link href="/order_system/customer">得意先マスタ</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;

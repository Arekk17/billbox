"use client";
import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/atoms/Buttons/Button";
import { useLogout } from "@/hooks/useLogout";
import { NAV_ITEMS } from "@/constants/navItems";
import Link from "next/link";

const Header = () => {
  const { handleLogout } = useLogout();
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <HiMenuAlt3 className="h-6 w-6" />
            </label>
          </div>
          <div className="flex-1">
            <Link href="/dashboard" className="btn btn-ghost text-xl">
              BillBox
            </Link>
          </div>
          <div className="flex gap-2">
            <ul className="menu menu-horizontal bg-base-100 rounded-box hidden lg:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profil
                    <span className="badge">Nowy</span>
                  </a>
                </li>
                <li>
                  <a>Ustawienia</a>
                </li>
                <li>
                  <Button variant="ghost" onClick={handleLogout}>
                    Wyloguj się
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 w-80 min-h-screen">
          <div className="p-4">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-ghost btn-circle absolute right-4 top-4 z-50"
            >
              <IoClose className="h-6 w-6" />
            </label>
            <ul className="mt-12">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

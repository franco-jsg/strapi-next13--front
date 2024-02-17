"use client";

import { Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";
import { cn } from "../helpers/classname";
import Link from "next/link";
import { useContext } from "react";
import { cartContext } from "@/context/CartContext";

const navLinks = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/blog",
    text: "Blog",
  },
  {
    href: "/store",
    text: "Store",
  },
  {
    href: "/cart",
    text: "Cart",
  },
];

const Header = () => {
  const pathname = usePathname();
  const { totalQuantityProduct } = useContext(cartContext);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <img
          src="/favicon.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {navLinks.map((navLink) => (
          <Navbar.Link
            key={navLink.href}
            href={navLink.href}
            active={pathname === navLink.href}
            as={Link}
            className={cn(
              pathname === navLink.href && "md:text-blue-500 bg-gray-950"
            )}
          >
            <span className="relative">
              {navLink.text}
              {navLink.text === "Cart" && (
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-5">
                  {totalQuantityProduct}
                </div>
              )}
            </span>
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

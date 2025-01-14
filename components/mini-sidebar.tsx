"use client";
import Image from "next/image";
import React, { useMemo } from "react";

import { IconDeleteAll } from "@/components/icons/IconDeleteAll";
import { navItems } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MiniSidebar() {
  const pathname = usePathname();

  const getStrokeColor = (link: string) => {
    return pathname === link ? "#3aafae" : "#71717a";
  };
  return (
    <div className="flex basis-[5rem] flex-col bg-[#f9f9f9] dark:bg-black dark:text-white">
      <div className="flex h-[5rem] items-center justify-center">
        <Image src="/logo.png" width={28} height={28} alt="logo" />
      </div>

      <div className="mt-8 flex flex-1 flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {navItems.map((item, index) => (
            <li key={index} className="group relative">
              <Link href={item.link}>
                <item.icon color={getStrokeColor(item?.link)} />
              </Link>

              {/* Hover Tooltip */}
              <span className="u-triangle pointer-events-none absolute left-8 top-[50%] translate-y-[-50%] rounded-md bg-[#3aafae] px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-[1.5rem]">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#EB4E31] p-2">
            <IconDeleteAll color="#EB4E31" />
          </button>
        </div>
      </div>
    </div>
  );
}

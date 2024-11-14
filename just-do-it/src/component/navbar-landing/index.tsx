"use client";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-end items-center p-4 bg-black absolute top-0 left-1 ">
      <ul className="flex justify-between space-x-5 flex gap-4 text-white text-[12px] font-normal list-none">
        <li>
          <Link href={"/"}>INICIO</Link>
        </li>
        <li>
          <Link href={"/location"}>SEDES</Link>
        </li>
        <li>
          <Link href={"/services"}>SERVICIOS</Link>
        </li>
        <li>
          <Link href={"/planes"}>PLANES</Link>
        </li>
        <li>
          <Link href={"/contacto"}>CONTÁCTANOS</Link>
        </li>
        <div
          className="w-[70px] h-[18px] absolute left-[3px] top-[3px] bg-contain bg-no-repeat bg-cente"
          style={{ backgroundImage: "url('login-icon.svg')" }}
        ></div>
      </ul>
      <div
        className="w-[70px] h-[18px] bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: "url('login-icon.svg')" }}
      ></div>
    </nav>
  );
};

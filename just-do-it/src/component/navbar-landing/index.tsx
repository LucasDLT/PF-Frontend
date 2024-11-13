'use client';
import Link from "next/link";
export const Navbar: React.FC = () => {
    return (
      <nav className="w-[491px] h-[24px]  ">
        <div className="w-[24px] h-[24px] absolute left-[467px] top-0">
          <div
            className="w-[70px] h-[18px] absolute left-[3px] top-[3px] bg-contain bg-no-repeat bg-cente"
            style={{ backgroundImage: "url('login-icon.svg')" }}
          ></div>
        </div>
        <div className="absolute left-[338px] top-[4px] text-white text-[12px] font-normal">
          <Link href={"/contacto"}>CONTÁCTANOS</Link>
        </div>
        <div className="absolute left-[253px] top-[5px] text-white text-[12px] font-normal">
          <Link href={"/planes"}>PLANES</Link>
        </div>
        <div className="absolute left-[152px] top-[4.12px] text-white text-[12px] font-normal">
          <Link href={"/servicios"}>SERVICIOS</Link>
        </div>
        <div className="absolute left-[75px] top-[4px] text-white text-[12px] font-normal">
          <Link href={"/nosotros"}>SEDES</Link>
        </div>
        <div className="absolute left-0 top-[4px] text-white text-[12px] font-normal">
          <Link href={"/"}>INICIO</Link>
        </div>
      </nav>
    );
  };
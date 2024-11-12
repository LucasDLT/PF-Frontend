import Link from "next/link";

export const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div
        className="w-full h-full flex justify-center items-center inline-flex"
        style={{
          backgroundImage: "url('img_landing.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="w-[1440px] h-[608.5px] relative">
          <div className="w-[1440px] h-[608.5px] absolute left-[1440px] top-0 transform rotate-180 origin-top-left bg-[linear-gradient(90deg,_rgba(0,_0,_0,_0)_0%,_black_98%),_linear-gradient(270deg,_rgba(0,_0,_0,_0)_0%,_rgba(0,_0,_0,_0.95)_100%)] shadow-[0_4px_4px_rgba(0,_0,_0,_0.25)] border border-black"></div>
          <div className="w-[735px] h-[220px] absolute left-[160px] top-[161px]">
            <div className="w-[137px] h-[45px] absolute left-0 top-[175px] bg-[#FAFF00] rounded-[20px]"></div>
            <div className="w-[114px] h-[26px] absolute left-[11px] top-[184px] text-black text-[20px] font-normal">
              Inscríbete
            </div>
            <div className="w-[735px] h-[143px] absolute left-0 top-0">
              <span className="text-white text-[64px] font-normal">
                AGENDA TU SESIÓN{" "}
              </span>
              <span className="text-[#ECF014] text-[64px] font-normal">
                GRATUITA
              </span>
              <span className="text-white text-[64px] font-normal"> HOY</span>
            </div>
          </div>
          <Navbar />
        </div>
      </div>
    </div>
  );
};
export default Home;

export const Navbar = () => {
  return (
    <nav className="w-[491px] h-[24px] absolute left-[789px] top-[36px]">
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

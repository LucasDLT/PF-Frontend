import ActivityCarousel from "@/component/activity-carousel";
import { Navbar } from "@/component/navbar-landing";
import Footer from "@/component/footer";

export const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div
        className="w-full h-full flex justify-center items-center inline-flex"
        style={{
          backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 9), rgba(0, 0, 0, 0)), linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('img_landing.png')",
          backgroundSize: "70% 170%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "120% 20% ",
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
      <ActivityCarousel />
      <Footer />
    </div>
  );
};
export default Home;

'use client'
import ActivityCarousel from "@/component/activity-carousel";
import { Navbar } from "@/component/navbar-landing";
import Footer from "@/component/footer";
import styled from "styled-components";

export const Home: React.FC = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <div
        className="w-full h-screen flex justify-center items-center inline-flex"
        style={{
          backgroundImage:
          "linear-gradient(to right, rgba(0, 0, 0, 9), rgba(0, 0, 0, 0)), linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url('img_landing.png')",
          backgroundSize: "70% 170%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "120% 20%",
        }}
        >
        <div className="w-[1440px] h-[608.5px] relative border border-[#ECF014]">
          <div className="w-[735px] h-[143px] absolute left-60 top-56">
              <span className="text-white text-[64px] font-normal">
                AGENDA TU SESIÓN{" "}
              </span>
              <span className="text-[#ECF014] text-[64px] font-normal">
                GRATUITA
              </span>
              <span className="text-white text-[64px] font-normal"> HOY</span>
              <div className="text-[#ECF014] w-[114px] h-[26px] absolute left-[11px] top-[184px] text-[20px] font-normal">
              Inscríbete
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


export const Greeting = styled.main`

  
`
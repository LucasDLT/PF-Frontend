'use client'

export default function Footer() {
    return (
        <div className="bg-black">
            <h1 className="text-black text-center mb-8">footer</h1>
            <div className="w-full h-full relative bg-black shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-2 border-[#ECF014]">
                <div className="absolute top-8 left-[331px] w-[869px] h-[45px] flex justify-between items-center">
                    <div className="text-white text-sm font-semibold leading-[22.4px]">Contactanos</div>
                    <div className="text-white text-sm font-semibold leading-[22.4px]">Nuestros Desarrolladores</div>
                    <div className="text-white text-sm font-semibold leading-[22.4px]">Nuestras Redes</div>
                    <div className="text-white text-sm font-semibold leading-[22.4px]">Nuestras sedes</div>
                </div>

                {/* Iconos y direcciones */}
                <div className="absolute top-[91px] left-[770px] w-[79px] h-[75px]">
                    <div className="absolute top-0 left-0 w-[24px] h-[24px] bg-black">
                        <div className="absolute top-[2px] left-[3.1px] w-[17.81px] h-[20.15px] border-[1.5px] border-white"></div>
                    </div>
                    <div className="absolute top-0 left-[55px] w-[24px] h-[24px]">
                        <div className="absolute top-[7px] left-[3px] w-[18px] h-[13px] bg-[rgba(0,0,0,0.15)]"></div>
                        <div className="absolute top-[4px] left-[1.5px] w-[21px] h-[16px] border-2 border-white"></div>
                    </div>
                    <div className="absolute top-[51px] left-0 w-[24px] h-[24px]">
                        <div className="absolute top-[3.24px] left-[8px] w-[12.56px] h-[16.76px] bg-white"></div>
                        <div className="absolute top-[3.24px] left-[4px] w-[16.56px] h-[16.76px] border-2 border-white"></div>
                    </div>
                </div>

                {/* Direcciones y detalles */}
                <div className="absolute top-[94px] left-[1011px] w-[194px] h-[77px]">
                    <div className="absolute top-[51px] left-0 w-[24px] h-[24px]">
                        <div className="absolute top-[3px] left-[4px] w-[16px] h-[18px] bg-[rgba(0,0,0,0.15)]"></div>
                        <div className="absolute top-[3px] left-[4px] w-[16px] h-[18px] border-2 border-white"></div>
                    </div>
                    <div className="absolute top-0 left-0 w-[24px] h-[24px]">
                        <div className="absolute top-[3px] left-[4px] w-[16px] h-[18px] bg-[rgba(0,0,0,0.15)]"></div>
                        <div className="absolute top-[3px] left-[4px] w-[16px] h-[18px] border-2 border-white"></div>
                    </div>
                    <div className="absolute top-[55px] left-[31px] w-[163px] text-white text-sm font-semibold leading-[22.4px]">
                        Street 123
                    </div>
                    <div className="absolute top-[2px] left-[31px] w-[163px] text-white text-sm font-semibold leading-[22.4px]">
                        Street 122
                    </div>
                </div>

                {/* Datos de contacto */}
                <div className="absolute top-[91px] left-[520px] w-[197px] h-[78px]">
                    <div className="absolute top-[1px] left-0 w-[24px] h-[24px]">
                        <div className="absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-[rgba(0,0,0,0.15)]"></div>
                        <div className="absolute top-[3px] left-[3px] w-[18px] h-[18px] border-2 border-white"></div>
                    </div>
                    <div className="absolute top-[54px] left-[3px] w-[24px] h-[24px]">
                        <div className="absolute top-[5.29px] left-[3px] w-[18px] h-[13.71px] bg-[rgba(0,0,0,0.15)]"></div>
                        <div className="absolute top-[5px] left-[3px] w-[18px] h-[14px] border-2 border-white"></div>
                    </div>
                    <div className="absolute top-[53px] left-[34px] w-[163px] text-white text-sm font-semibold underline leading-[22.4px]">
                        Example@gmail.com
                    </div>
                    <div className="absolute top-0 left-[34px] w-[163px] text-white text-sm font-semibold leading-[22.4px]">
                        +54(000)000-000
                    </div>
                </div>
            </div>
        </div>
    );
}

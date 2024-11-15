'use client';

export default function Footer() {
  return (
    <div className="bg-black py-8">
      <h1 className="text-white text-center mb-8">footer</h1>
      <div className="max-w-screen-xl mx-auto flex justify-between px-8 text-white text-sm">
        <div className="space-y-2">
          <div>Contactanos</div>
          <div>Nuestros Desarrolladores</div>
          <div>Nuestras Redes</div>
          <div>Nuestras sedes</div>
        </div>

        <div className="space-y-2">
          <div>+54(000)000-000</div>
          <div>Example@gmail.com</div>
        </div>

        <div className="space-y-2">
          <div>Street 123</div>
          <div>Street 122</div>
        </div>
      </div>
    </div>
  );
}

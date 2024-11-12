'use client'


export const Home:React.FC= ()=> {
  return (<div>
    
    <div style={{width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'inline-flex', backgroundImage:"url('img_landing.png')", backgroundAttachment: 'fixed', backgroundPosition: '80%', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}>
    <div style={{width: 1440, height: 608.50, position: 'relative'}}>
        <div style={{width: 1440, height: 608.50, left: 1440, top: 0, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: '0 0', background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, black 98%), linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.95) 100%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', border: '1px black solid'}}></div>
        <div style={{width: 735, height: 220, left: 160, top: 161, position: 'absolute'}}>
            <div style={{width: 137, height: 45, left: 0, top: 175, position: 'absolute', background: '#FAFF00', borderRadius: 20}}></div>
            <div style={{width: 114, height: 26, left: 11, top: 184, position: 'absolute', color: 'black', fontSize: 20, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word'}}>Inscríbete</div>
            <div style={{width: 735, height: 143, left: 0, top: 0, position: 'absolute'}}><span style={{color: 'white', fontSize: 64, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word'}}>AGENDA TU SESIÓN </span><span style={{color: '#ECF014', fontSize: 64, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word' }}>GRATUITA</span><span style={{color: 'white', fontSize: 64, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word' }}> HOY</span></div>
        </div>
        <div style={{width: 491, height: 24, left: 789, top: 36, position: 'absolute'}}>
            <div style={{width: 24, height: 24, left: 467, top: 0, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 3, top: 3, position: 'absolute', background: '#ECF014'}}></div>
            </div>
            <div style={{left: 338, top: 4, position: 'absolute', color: 'white', fontSize: 12, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word'}}>CONTÁCTANOS</div>
            <div style={{left: 253, top: 5, position: 'absolute', color: 'white', fontSize: 12, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word'}}>PLANES</div>
            <div style={{left: 152, top: 4.12, position: 'absolute', color: 'white', fontSize: 12, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word'}}>SERVICIOS</div>
            <div style={{left: 75, top: 4, position: 'absolute', color: 'white', fontSize: 12, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word'}}>SEDES</div>
            <div style={{left: 0, top: 4, position: 'absolute', color: 'white', fontSize: 12, fontFamily: 'MADE Outer Sans', fontWeight: '400', wordWrap: 'break-word'}}>INICIO</div>
        </div>
    </div>
</div>
</div>
  )
}
export default Home
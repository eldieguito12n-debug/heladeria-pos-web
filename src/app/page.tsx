import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center font-sans relative overflow-hidden text-white">
      {/* Decoración de fondo */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-amber-500/10 rounded-full blur-[120px]"></div>

      <div className="z-10 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-4 drop-shadow-2xl">
          Sistema Central
        </h1>
        <p className="text-xl text-slate-400 font-medium">Selecciona el módulo correspondiente para este dispositivo</p>
      </div>
      
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-8">
        
        {/* 1. App para tomar pedidos (Tablet/Kiosko) */}
        <Link href="/cliente" className="p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group text-center border border-white/10 hover:border-pink-500/50 flex flex-col items-center shadow-2xl">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
            🍨
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Tomar Pedidos</h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed">App para la Tablet o Kiosko. Interfaz visual e interactiva para que los clientes o meseros registren la orden.</p>
        </Link>

        {/* 2. App para la Cocina (Monitor) */}
        <Link href="/cocina" className="p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group text-center border border-white/10 hover:border-amber-500/50 flex flex-col items-center shadow-2xl">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
            🔥
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Monitor Cocina</h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed">App de pantalla completa para los preparadores. Recibe las órdenes en tiempo real mediante un tablero Kanban.</p>
        </Link>

        {/* 3. App para Administración (PC/Oficina) */}
        <Link href="/admin" className="p-10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group text-center border border-white/10 hover:border-cyan-500/50 flex flex-col items-center shadow-2xl">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
            ⚙️
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Inventario / Admin</h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed">Panel administrativo para agregar nuevos helados, cambiar precios y eliminar productos del menú.</p>
        </Link>
      </div>

      <div className="z-10 mt-20 text-slate-400 font-medium px-8 py-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        Sistema en Red Local Activo
      </div>
    </div>
  )
}

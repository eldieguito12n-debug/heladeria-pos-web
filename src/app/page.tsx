"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center font-sans relative overflow-hidden text-white py-12">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="z-10 text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight mb-4 drop-shadow-2xl">
          Heladería Cloud
        </h1>
        <p className="text-xl text-slate-400 font-medium">Sistema Global 100% en la Nube. Funciona en cualquier dispositivo.</p>
      </div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-8">
        
        {/* KIOSKO / TABLET */}
        <Link href="/cliente" className="p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group text-center border border-white/10 hover:border-pink-500/50 flex flex-col items-center shadow-lg hover:shadow-pink-500/20">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform shadow-xl">🍨</div>
          <h2 className="text-2xl font-black text-white mb-3">Tomar Pedidos</h2>
          <p className="text-slate-400 text-sm">Abre este enlace en la Tablet, Celular o Computador del cajero.</p>
        </Link>
        
        {/* COCINA */}
        <Link href="/cocina" className="p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group text-center border border-white/10 hover:border-amber-500/50 flex flex-col items-center shadow-lg hover:shadow-amber-500/20">
          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform shadow-xl">🔥</div>
          <h2 className="text-2xl font-black text-white mb-3">Monitor Cocina</h2>
          <p className="text-slate-400 text-sm">Abre este enlace en el monitor, tablet o celular de los preparadores.</p>
        </Link>
        
        {/* ADMIN */}
        <Link href="/admin" className="p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 group text-center border border-white/10 hover:border-cyan-500/50 flex flex-col items-center shadow-lg hover:shadow-cyan-500/20">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform shadow-xl">⚙️</div>
          <h2 className="text-2xl font-black text-white mb-3">Inventario / Admin</h2>
          <p className="text-slate-400 text-sm">Panel administrativo para agregar o eliminar productos del catálogo.</p>
        </Link>

      </div>
      
      <div className="z-10 mt-16 text-center max-w-2xl px-6">
        <p className="text-emerald-400 font-bold mb-2">🟢 Sistema Online y Operativo</p>
        <p className="text-slate-500 text-sm">Puedes compartir este enlace (URL) con tus empleados por WhatsApp y podrán usarlo desde sus propios teléfonos, estén donde estén.</p>
      </div>
    </div>
  )
}

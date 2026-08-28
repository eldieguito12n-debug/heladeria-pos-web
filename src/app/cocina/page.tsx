"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function KitchenDisplaySystem() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = () => {
    fetch(`/api/orders?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // Polling rápido para la cocina
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id: number, newStatus: string) => {
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
      headers: { 'Content-Type': 'application/json' }
    });
    fetchOrders();
  };

  const getFiltered = (status: string) => orders.filter(o => o.status === status);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 font-sans">
      <div className="flex justify-between items-center mb-6 px-4">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">
            🔥 Monitor de Cocina
          </h1>
          <p className="text-slate-400 font-medium mt-1">Órdenes en tiempo real</p>
        </div>
        <Link href="/" className="px-6 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors font-bold text-slate-300">
          Volver
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-130px)]">
        <Column 
          title="Nuevos Pedidos" 
          count={getFiltered("Nuevo").length}
          color="border-rose-500" 
          titleColor="text-rose-400"
          orders={getFiltered("Nuevo")}
          actionText="EMPEZAR A PREPARAR"
          actionClass="bg-rose-600 hover:bg-rose-500 text-white"
          onAction={(id: number) => updateStatus(id, "En preparación")}
        />
        
        <Column 
          title="En Preparación" 
          count={getFiltered("En preparación").length}
          color="border-amber-500"
          titleColor="text-amber-400" 
          orders={getFiltered("En preparación")}
          actionText="MARCAR COMO LISTO"
          actionClass="bg-amber-500 hover:bg-amber-400 text-slate-900"
          onAction={(id: number) => updateStatus(id, "Listo")}
        />

        <Column 
          title="Listos para Entrega" 
          count={getFiltered("Listo").length}
          color="border-emerald-500" 
          titleColor="text-emerald-400"
          orders={getFiltered("Listo")}
          actionText="ENTREGADO AL CLIENTE"
          actionClass="bg-emerald-600 hover:bg-emerald-500 text-white"
          onAction={(id: number) => updateStatus(id, "Entregado")}
        />
      </div>
    </div>
  );
}

function Column({ title, count, color, titleColor, orders, actionText, actionClass, onAction }: any) {
  return (
    <div className={`bg-slate-900/80 rounded-3xl border-t-8 ${color} p-5 flex flex-col shadow-2xl`}>
      <div className="flex justify-between items-center mb-6 px-2">
        <h2 className={`text-2xl font-black ${titleColor}`}>{title}</h2>
        <span className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center font-bold text-lg border border-slate-700">
          {count}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-5 pr-2">
        {orders.map((o: any) => (
          <div key={o.id} className="bg-slate-800 border border-slate-700 p-5 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-3">
              <span className="font-black text-3xl text-white">#{o.id}</span>
              <span className="text-sm font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg">
                {new Date(o.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            
            <ul className="mb-6 space-y-3">
              {o.items.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-4 text-xl">
                  <span className="font-black text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-lg">{item.quantity}</span> 
                  <span className="font-bold text-slate-200">{item.name}</span>
                </li>
              ))}
            </ul>

            {o.observations && (
              <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 font-bold text-lg">
                ⚠️ {o.observations}
              </div>
            )}

            <button 
              onClick={() => onAction(o.id)}
              className={`w-full py-5 rounded-xl font-black tracking-wider transition-all shadow-lg active:scale-95 ${actionClass}`}
            >
              {actionText}
            </button>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-30 pt-10">
            <span className="text-6xl mb-4 text-slate-500">🍽️</span>
            <p className="font-bold text-xl text-slate-500">Nada por aquí</p>
          </div>
        )}
      </div>
    </div>
  );
}

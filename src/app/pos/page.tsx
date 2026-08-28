"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function POS() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [obs, setObs] = useState("");

  useEffect(() => {
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCart([]);
    setObs("");
  };

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const sendOrder = async () => {
    if (cart.length === 0) return alert("El carrito está vacío");

    const orderData = {
      total,
      status: "Nuevo",
      observations: obs,
      items: cart.map(item => ({
        product_id: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price_at_time: item.product.price
      }))
    };

    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: { 'Content-Type': 'application/json' }
    });

    clearCart();
    // Opcional: Pequeña animación de éxito (toast) en lugar de alert
  };

  return (
    <div className="h-screen bg-[#0b0c10] flex overflow-hidden text-white font-sans selection:bg-cyan-500/30">
      
      {/* Catálogo de Productos (Fondo difuminado elegante) */}
      <div className="flex-1 p-8 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0b0c10] to-[#0b0c10]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl -z-10"></div>

        <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">
                POS Heladería
              </h1>
              <p className="text-slate-400 mt-2 text-sm font-medium">Selecciona los productos para el pedido</p>
            </div>
            <Link href="/" className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-md transition-all font-semibold">
              ← Inicio
            </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
          {products.map(p => (
            <button 
              key={p.id} 
              onClick={() => addToCart(p)}
              className="group relative rounded-3xl h-60 w-full overflow-hidden shadow-2xl hover:shadow-[0_10px_40px_rgba(34,211,238,0.2)] transition-all duration-300 transform hover:-translate-y-2 border border-white/5 text-left"
            >
              {/* Imagen de fondo */}
              <img 
                src={p.image} 
                alt={p.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay degradado para asegurar lectura del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/95 via-[#0b0c10]/40 to-transparent"></div>
              
              {/* Badge de Precio estilo Glassmorphism */}
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <span className="text-cyan-400 font-bold tracking-wide">${p.price.toFixed(2)}</span>
              </div>

              {/* Título inferior */}
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="text-2xl font-bold text-white leading-tight">{p.name}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Carrito Lateral - Panel Flotante Glassmorphism */}
      <div className="w-[420px] bg-[#12141a]/80 backdrop-blur-2xl border-l border-white/5 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-10">
        <div className="p-8 pb-4">
          <h2 className="text-3xl font-black mb-1 flex items-center gap-3">
            <span className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">🛍️</span> Pedido
          </h2>
          <p className="text-slate-400 text-sm">Resumen de la orden actual</p>
        </div>
        
        {/* Lista de Items */}
        <div className="flex-1 overflow-y-auto px-8 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
              <span className="text-6xl mb-4">🛒</span>
              <p className="font-semibold text-lg">El carrito está vacío</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="group flex justify-between items-center bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-2xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center font-bold">
                    {item.quantity}x
                  </div>
                  <div>
                    <p className="font-bold text-lg">{item.product.name}</p>
                    <p className="text-sm text-slate-400">${item.product.price.toFixed(2)} c/u</p>
                  </div>
                </div>
                <p className="font-bold text-xl text-white">
                  ${(item.quantity * item.product.price).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Zona Inferior: Controles */}
        <div className="p-8 bg-gradient-to-t from-[#0b0c10] to-transparent">
          <input 
            type="text" 
            placeholder="Añadir nota (Ej: Sin salsa)..." 
            value={obs}
            onChange={e => setObs(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all mb-6"
          />
          
          <div className="flex justify-between items-end mb-6 px-2">
            <span className="text-slate-400 font-medium">Total a cobrar</span>
            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              ${total.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={clearCart}
              className="px-6 py-4 bg-white/5 text-slate-300 font-semibold rounded-2xl hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/5 hover:border-red-500/30"
            >
              Limpiar
            </button>
            <button 
              onClick={sendOrder}
              disabled={cart.length === 0}
              className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-lg rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONFIRMAR ORDEN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

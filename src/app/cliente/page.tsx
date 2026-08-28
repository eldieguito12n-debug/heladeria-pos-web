"use client";

import { useEffect, useState } from 'react';

export default function ClienteKiosko() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [obs, setObs] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<number | null>(null);

  useEffect(() => {
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        else console.error("Data no es arreglo:", data);
      })
      .catch(err => console.error("Error cargando productos:", err));

    // ---- SEÑAL DE VIDA (HEARTBEAT) ----
    const heartbeat = setInterval(() => {
      fetch('/api/heartbeat', {
        method: 'POST',
        body: JSON.stringify({ device: "Tablet (Kiosko)" }),
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => {});
    }, 3000);

    return () => clearInterval(heartbeat);
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

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const sendOrder = async () => {
    if (cart.length === 0) return;

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

    const res = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();

    setOrderSuccess(data.order.id);
    setCart([]);
    setObs("");
    
    setTimeout(() => {
      setOrderSuccess(null);
    }, 5000);
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center font-sans">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg animate-bounce-short">
          <span className="text-8xl block mb-6">🎉🍦</span>
          <h1 className="text-4xl font-black text-pink-500 mb-4">¡Pedido Recibido!</h1>
          <p className="text-xl text-slate-600 mb-6">Tu número de orden es el <strong className="text-3xl text-cyan-500 block mt-2">#{orderSuccess}</strong></p>
          <p className="text-slate-500">Por favor, espera a que te llamemos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff5f7] flex font-sans selection:bg-pink-300">
      
      {/* Menú de Helados */}
      <div className="flex-1 p-8 md:p-12 overflow-y-auto">
        <div className="mb-10 text-center">
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 drop-shadow-sm font-serif">
              Las Paletas de Florentino
            </h1>
            <p className="text-pink-400 mt-4 text-xl font-medium tracking-wide">100% artesanales con sabores naturales</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20 max-w-7xl mx-auto">
          {products.map(p => (
            <button 
              key={p.id} 
              onClick={() => addToCart(p)}
              className="group relative bg-white rounded-[2rem] p-4 shadow-[0_10px_30px_rgba(244,114,182,0.15)] hover:shadow-[0_20px_40px_rgba(244,114,182,0.3)] transition-all duration-300 transform hover:-translate-y-2 border-2 border-pink-100 flex flex-col items-center"
            >
              <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative bg-pink-50">
                <img 
                  src={p.image} 
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-700 text-center leading-tight mb-2">{p.name}</h3>
              <div className="mt-auto bg-pink-100 px-4 py-1.5 rounded-full">
                <span className="text-pink-600 font-black text-lg">${p.price.toFixed(2)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Carrito de Compras (Panel lateral) */}
      <div className="w-[400px] bg-white border-l-4 border-pink-100 flex flex-col shadow-[-20px_0_40px_rgba(244,114,182,0.05)] z-10">
        <div className="p-8 bg-gradient-to-br from-pink-500 to-orange-400 text-white rounded-bl-[3rem]">
          <h2 className="text-3xl font-black mb-1 flex items-center gap-3">
            🛒 Tu Pedido
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40 text-slate-400">
              <span className="text-6xl mb-4">🍨</span>
              <p className="font-bold text-xl">Tu carrito está vacío</p>
              <p>¡Elige algo delicioso!</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-pink-50/50 p-4 rounded-2xl border border-pink-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold shadow-md">
                    {item.quantity}
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">{item.product.name}</p>
                    <p className="text-sm text-pink-500 font-semibold">${item.product.price.toFixed(2)} c/u</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-slate-50 rounded-tl-[3rem]">
          <input 
            type="text" 
            placeholder="¿Alguna nota especial?" 
            value={obs}
            onChange={e => setObs(e.target.value)}
            className="w-full bg-white border-2 border-pink-100 rounded-2xl px-5 py-4 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-all mb-6 shadow-inner"
          />
          
          <div className="flex justify-between items-end mb-6 px-2">
            <span className="text-slate-500 font-bold text-lg">Total:</span>
            <span className="text-5xl font-black text-pink-500">
              ${total.toFixed(2)}
            </span>
          </div>

          <button 
            onClick={sendOrder}
            disabled={cart.length === 0}
            className="w-full py-5 bg-gradient-to-r from-pink-500 to-orange-400 font-black text-2xl text-white rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-pink-500/30 disabled:opacity-50 disabled:scale-100"
          >
            CONFIRMAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );
}

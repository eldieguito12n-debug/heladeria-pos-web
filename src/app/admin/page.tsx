"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminInventory() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const fetchProducts = () => {
    fetch(`/api/products?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return alert("Nombre y precio obligatorios");

    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({ name, price, image }),
      headers: { 'Content-Type': 'application/json' }
    });

    setName("");
    setPrice("");
    setImage("");
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    if (!confirm("¿Eliminar este helado definitivamente?")) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              ⚙️ Administración del Catálogo
            </h1>
            <p className="text-slate-400 mt-2">Agrega o elimina productos. Se actualizarán al instante en las Tablets.</p>
          </div>
          <Link href="/" className="px-6 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors font-bold text-slate-300">
            Volver al Menú
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Formulario */}
          <div className="lg:col-span-1">
            <form onSubmit={addProduct} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl sticky top-10">
              <h2 className="text-2xl font-bold mb-6 text-cyan-400">Publicar Nuevo Helado</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-slate-400 mb-2 font-bold text-sm">Nombre del Producto</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ej: Paleta de Mango" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500" required />
                </div>
                <div>
                  <label className="block text-slate-400 mb-2 font-bold text-sm">Precio ($)</label>
                  <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="Ej: 3.50" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500" required />
                </div>
                <div>
                  <label className="block text-slate-400 mb-2 font-bold text-sm">Imagen (URL)</label>
                  <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="/paleta-arequipe.jpg o https://..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500" />
                  <p className="text-xs text-slate-500 mt-2">Pon una URL web o una imagen de la carpeta public.</p>
                </div>
                <button type="submit" className="w-full py-4 mt-4 bg-cyan-600 hover:bg-cyan-500 font-bold text-lg rounded-xl transition-all shadow-lg shadow-cyan-500/20">
                  GUARDAR
                </button>
              </div>
            </form>
          </div>

          {/* Listado */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex justify-between items-center">
                Inventario Activo 
                <span className="bg-slate-800 px-4 py-1 rounded-full text-cyan-400 text-sm">{products.length} productos</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {products.map(p => (
                  <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex items-center hover:border-slate-700 transition-colors">
                    <img src={p.image} className="w-24 h-24 object-cover bg-slate-900" alt={p.name} />
                    <div className="p-4 flex-1">
                      <p className="font-bold text-lg">{p.name}</p>
                      <p className="text-cyan-400 font-black">${p.price.toFixed(2)}</p>
                    </div>
                    <button onClick={() => deleteProduct(p.id)} className="mr-4 p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-colors">
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

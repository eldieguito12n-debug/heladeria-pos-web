import { NextResponse } from 'next/server';
import { products } from '../data';

export const dynamic = 'force-dynamic';


export async function GET() {
    return NextResponse.json(products);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newProduct = {
        id: Date.now(),
        name: body.name,
        price: parseFloat(body.price),
        image: body.image || "https://images.unsplash.com/photo-1570197781417-0a82375893d5?w=500&q=80",
        icon: "🍦"
    };
    products.push(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
}

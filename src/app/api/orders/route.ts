import { NextResponse } from 'next/server';
import { orders } from '../data';

export const dynamic = 'force-dynamic';


export async function GET() {
    return NextResponse.json(orders);
}

export async function POST(req: Request) {
    const body = await req.json();
    const newOrder = { 
        id: Math.floor(Math.random() * 10000), 
        ...body, 
        timestamp: new Date().toISOString() 
    };
    orders.push(newOrder);
    return NextResponse.json({ success: true, order: newOrder });
}

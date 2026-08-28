import { NextResponse } from 'next/server';
import { orders } from '../../data';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    
    const orderIndex = orders.findIndex(o => o.id.toString() === id);
    if (orderIndex > -1) {
        orders[orderIndex].status = body.status;
    }
    
    return NextResponse.json({ success: true });
}

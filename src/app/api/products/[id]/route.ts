import { NextResponse } from 'next/server';
import { products } from '../../data';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const index = products.findIndex(p => p.id === id);
    
    if (index > -1) {
        products.splice(index, 1);
    }
    
    return NextResponse.json({ success: true });
}

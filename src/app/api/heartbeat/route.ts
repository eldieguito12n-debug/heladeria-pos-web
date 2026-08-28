import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Memoria temporal para rastrear dispositivos conectados
export let connectedDevices: Record<string, number> = {};

export async function GET() {
    return NextResponse.json(connectedDevices);
}

export async function POST(req: Request) {
    try {
        const { device } = await req.json();
        if (device) {
            connectedDevices[device] = Date.now();
        }
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ success: false });
    }
}

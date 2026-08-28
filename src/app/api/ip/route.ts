import { NextResponse } from 'next/server';
import { networkInterfaces } from 'os';

export const dynamic = 'force-dynamic';

export async function GET() {
    const nets = networkInterfaces();
    let localIp = 'localhost';
    let hotspotIp = '';

    for (const name of Object.keys(nets)) {
        for (const net of nets[name] || []) {
            if (net.family === 'IPv4' && !net.internal) {
                // Descartar IPs autoconfiguradas sin red
                if (net.address.startsWith('169.254')) continue;
                
                localIp = net.address;
                
                // Priorizar la IP por defecto de los Puntos de Acceso en Windows (192.168.137.x)
                if (net.address.startsWith('192.168.137')) {
                    hotspotIp = net.address;
                }
            }
        }
    }
    
    return NextResponse.json({ ip: hotspotIp || localIp });
}

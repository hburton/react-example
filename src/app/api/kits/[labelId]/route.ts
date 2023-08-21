import { NextResponse } from 'next/server';
import KitData from '@/services/kit-data';

// TODO: Look into return types for endpoints.
export async function GET(req: Request, { params }: { params: { labelId: string } }) {
    const labelId = params.labelId;
    const kit = await KitData.getKit(labelId);
    return NextResponse.json(kit);
}
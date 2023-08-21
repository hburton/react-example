import { NextResponse } from 'next/server';
import KitData from '@/services/kit-data';

export async function POST(req: Request) {
    const reqBody = await req.json();
    const searchValue = reqBody.searchValue;
    const suggestions = await KitData.getSuggestedLabelIds(searchValue);
    return NextResponse.json({ suggestions });
}
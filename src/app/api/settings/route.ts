import { NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/data/storage';

export async function GET() {
  try {
    const settings = getSettings();
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = updateSettings(body);
    return NextResponse.json({ success: true, message: 'Settings updated successfully!', data: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}

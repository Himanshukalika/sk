import { NextResponse } from 'next/server';
import { getRecruitments, saveRecruitment } from '@/data/storage';
import { RecruitmentNotice } from '@/types';

export async function GET() {
  try {
    const recruitments = getRecruitments();
    return NextResponse.json({ success: true, count: recruitments.length, data: recruitments });
  } catch (error) {
    console.error('Error fetching recruitments:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch recruitments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: RecruitmentNotice = await request.json();
    if (!body.title || !body.department) {
      return NextResponse.json({ success: false, error: 'Title and department are required' }, { status: 400 });
    }

    const saved = saveRecruitment({
      ...body,
      id: body.id || `rec-${Date.now()}`
    });

    return NextResponse.json({ success: true, message: 'Recruitment notice saved successfully', data: saved });
  } catch (error) {
    console.error('Error saving recruitment:', error);
    return NextResponse.json({ success: false, error: 'Failed to save recruitment' }, { status: 500 });
  }
}

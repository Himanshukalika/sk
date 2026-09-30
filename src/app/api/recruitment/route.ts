import { NextResponse } from 'next/server';
import { getRecruitments, saveRecruitment, deleteRecruitment } from '@/data/storage';
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

export async function PATCH(request: Request) {
  try {
    const body: Partial<RecruitmentNotice> & { id: string } = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Recruitment ID is required' }, { status: 400 });
    }

    const all = getRecruitments();
    const existing = all.find(r => r.id === body.id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Recruitment notice not found' }, { status: 404 });
    }

    const updated = saveRecruitment({
      ...existing,
      ...body
    });

    return NextResponse.json({ success: true, message: 'Recruitment updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating recruitment:', error);
    return NextResponse.json({ success: false, error: 'Failed to update recruitment' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Recruitment ID is required' }, { status: 400 });
    }

    const deleted = deleteRecruitment(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Recruitment notice not found or could not be deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Recruitment notice deleted successfully' });
  } catch (error) {
    console.error('Error deleting recruitment:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete recruitment' }, { status: 500 });
  }
}


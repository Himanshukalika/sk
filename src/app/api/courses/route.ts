import { NextResponse } from 'next/server';
import { getCourses, saveCourse } from '@/data/storage';
import { Course } from '@/types';

export async function GET() {
  try {
    const courses = getCourses();
    return NextResponse.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Course = await request.json();
    if (!body.title || !body.slug) {
      return NextResponse.json({ success: false, error: 'Course title and slug are required' }, { status: 400 });
    }

    const saved = saveCourse({
      ...body,
      id: body.id || `course-${Date.now()}`
    });

    return NextResponse.json({ success: true, message: 'Course saved successfully', data: saved });
  } catch (error) {
    console.error('Error saving course:', error);
    return NextResponse.json({ success: false, error: 'Failed to save course' }, { status: 500 });
  }
}

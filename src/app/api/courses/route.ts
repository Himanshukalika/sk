import { NextResponse } from 'next/server';
import { getCourses, saveCourse, deleteCourse, getCourseBySlug } from '@/data/storage';
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
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Course title is required' }, { status: 400 });
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newCourse: Course = {
      ...body,
      id: body.id || `course-${Date.now()}`,
      slug
    };

    const saved = saveCourse(newCourse);
    return NextResponse.json({ success: true, message: 'Course saved successfully', data: saved });
  } catch (error) {
    console.error('Error saving course:', error);
    return NextResponse.json({ success: false, error: 'Failed to save course' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body: Partial<Course> & { id: string } = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const existing = getCourseBySlug(body.id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Course not found' }, { status: 404 });
    }

    const updated = saveCourse({
      ...existing,
      ...body
    });

    return NextResponse.json({ success: true, message: 'Course updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ success: false, error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Course ID is required' }, { status: 400 });
    }

    const deleted = deleteCourse(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Course not found or could not be deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete course' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getBlogs, saveBlog } from '@/data/storage';
import { BlogPost } from '@/types';

export async function GET() {
  try {
    const blogs = getBlogs();
    return NextResponse.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: BlogPost = await request.json();
    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ success: false, error: 'Title, slug, and content are required' }, { status: 400 });
    }

    const saved = saveBlog({
      ...body,
      id: body.id || `blog-${Date.now()}`
    });

    return NextResponse.json({ success: true, message: 'Blog post saved successfully', data: saved });
  } catch (error) {
    console.error('Error saving blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to save blog' }, { status: 500 });
  }
}

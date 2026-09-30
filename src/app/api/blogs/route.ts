import { NextResponse } from 'next/server';
import { getBlogs, saveBlog, deleteBlog } from '@/data/storage';
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

export async function PATCH(request: Request) {
  try {
    const body: Partial<BlogPost> & { id: string } = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
    }

    const all = getBlogs();
    const existing = all.find(b => b.id === body.id || b.slug === body.id);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }

    const updated = saveBlog({
      ...existing,
      ...body
    });

    return NextResponse.json({ success: true, message: 'Blog post updated successfully', data: updated });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
    }

    const deleted = deleteBlog(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Blog post not found or could not be deleted' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog' }, { status: 500 });
  }
}


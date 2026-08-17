import { NextResponse } from 'next/server';
import {
  getGalleryItemsAsync,
  addGalleryItemAsync,
  updateGalleryItemAsync,
  deleteGalleryItemAsync
} from '@/data/storage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const section = searchParams.get('section');

    let items = await getGalleryItemsAsync();

    if (section && section !== 'all') {
      items = items.filter(item => item.section === section);
    }

    if (category && category !== 'all') {
      items = items.filter(item => item.category === category);
    }

    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.imageUrl || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Title, Image URL and Category are required.' },
        { status: 400 }
      );
    }

    const newItem = await addGalleryItemAsync({
      title: body.title.trim(),
      category: body.category,
      section: body.section || (body.category === 'govt_selection' ? 'govt' : body.category === 'private_selection' ? 'private' : 'training'),
      imageUrl: body.imageUrl.trim(),
      description: body.description?.trim() || '',
      candidateName: body.candidateName?.trim() || '',
      postOrCompany: body.postOrCompany?.trim() || '',
      date: body.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Gallery item added successfully!',
        data: newItem
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding gallery item:', error);
    return NextResponse.json({ success: false, error: 'Failed to add gallery item' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Gallery Item ID is required.' }, { status: 400 });
    }

    const updated = await updateGalleryItemAsync(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Gallery item updated successfully!',
      data: updated
    });
  } catch (error) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ success: false, error: 'Failed to update gallery item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Gallery Item ID is required' }, { status: 400 });
    }

    const deleted = await deleteGalleryItemAsync(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete gallery item' }, { status: 500 });
  }
}

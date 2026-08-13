import { NextResponse } from 'next/server';
import { getContacts, addContact, deleteContact } from '@/data/storage';

export async function GET() {
  try {
    const contacts = getContacts();
    return NextResponse.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch contact enquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Name, Phone and Message are required.' },
        { status: 400 }
      );
    }

    const newContact = addContact({
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || '',
      subject: body.subject?.trim() || 'General Inquiry',
      message: body.message.trim()
    });

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! Our team will respond shortly.',
      data: newContact
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving contact enquiry:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Contact ID is required' }, { status: 400 });
    }

    const deleted = deleteContact(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Contact enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete contact' }, { status: 500 });
  }
}

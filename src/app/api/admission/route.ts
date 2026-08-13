import { NextResponse } from 'next/server';
import { getLeads, addLead, updateLeadStatus, deleteLead } from '@/data/storage';

export async function GET() {
  try {
    const leads = getLeads();
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.fullName || !body.mobile || !body.selectedCourse) {
      return NextResponse.json(
        { success: false, error: 'Full Name, Mobile Number and Selected Course are required.' },
        { status: 400 }
      );
    }

    const newLead = addLead({
      fullName: body.fullName.trim(),
      fatherName: body.fatherName?.trim() || '',
      mobile: body.mobile.trim(),
      alternateMobile: body.alternateMobile?.trim() || '',
      email: body.email?.trim() || '',
      dob: body.dob || '',
      gender: body.gender || 'Male',
      qualification: body.qualification || '12th Pass',
      address: body.address?.trim() || '',
      state: body.state?.trim() || '',
      city: body.city?.trim() || '',
      selectedCourse: body.selectedCourse,
      hostelRequired: body.hostelRequired === 'Yes' ? 'Yes' : 'No',
      notes: body.notes?.trim() || ''
    });

    return NextResponse.json({
      success: true,
      message: 'Admission Enquiry submitted successfully! Our counselor will call you shortly.',
      leadId: newLead.id,
      data: newLead
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving admission lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to save admission enquiry' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Lead ID and Status are required.' }, { status: 400 });
    }

    const updated = updateLeadStatus(id, status);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating lead status:', error);
    return NextResponse.json({ success: false, error: 'Failed to update lead status' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    const deleted = deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 });
  }
}

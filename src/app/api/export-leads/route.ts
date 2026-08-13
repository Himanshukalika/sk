import { NextResponse } from 'next/server';
import { getLeads } from '@/data/storage';

export async function GET() {
  try {
    const leads = getLeads();

    const headers = [
      'ID',
      'Full Name',
      'Father Name',
      'Mobile',
      'Alternate Mobile',
      'Email',
      'DOB',
      'Gender',
      'Qualification',
      'Selected Course',
      'Hostel Required',
      'Address',
      'City',
      'State',
      'Status',
      'Notes',
      'Registration Date'
    ];

    const csvRows = [headers.join(',')];

    for (const lead of leads) {
      const row = [
        lead.id,
        `"${(lead.fullName || '').replace(/"/g, '""')}"`,
        `"${(lead.fatherName || '').replace(/"/g, '""')}"`,
        `"${lead.mobile || ''}"`,
        `"${lead.alternateMobile || ''}"`,
        `"${lead.email || ''}"`,
        `"${lead.dob || ''}"`,
        `"${lead.gender || ''}"`,
        `"${(lead.qualification || '').replace(/"/g, '""')}"`,
        `"${(lead.selectedCourse || '').replace(/"/g, '""')}"`,
        `"${lead.hostelRequired || 'No'}"`,
        `"${(lead.address || '').replace(/"/g, '""')}"`,
        `"${(lead.city || '').replace(/"/g, '""')}"`,
        `"${(lead.state || '').replace(/"/g, '""')}"`,
        `"${lead.status || 'New'}"`,
        `"${(lead.notes || '').replace(/"/g, '""')}"`,
        `"${new Date(lead.createdAt).toLocaleString('en-IN')}"`
      ];
      csvRows.push(row.join(','));
    }

    const csvString = csvRows.join('\n');
    const timestamp = new Date().toISOString().split('T')[0];

    return new Response(csvString, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="sk-fire-agency-leads-${timestamp}.csv"`
      }
    });
  } catch (error) {
    console.error('Error generating CSV:', error);
    return NextResponse.json({ success: false, error: 'Failed to export leads' }, { status: 500 });
  }
}

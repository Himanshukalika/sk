import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type: allow images and PDF documents
    const isAllowed = file.type.startsWith('image/') || file.type === 'application/pdf';

    if (!isAllowed) {
      return NextResponse.json(
        { success: false, error: 'Only images (JPG, PNG, WEBP) and PDF documents are allowed.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const fileExt = path.extname(file.name) || (file.type === 'application/pdf' ? '.pdf' : '.webp');
    const fileName = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${fileExt}`;

    // 1. Try uploading to Supabase Storage if configured (with 2.5s timeout)
    if (isSupabaseConfigured() && supabase) {
      try {
        const uploadPromise = supabase.storage
          .from('admission-documents')
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: true
          });

        const timeoutPromise = new Promise<{ data: null; error: Error }>((_, reject) =>
          setTimeout(() => reject(new Error('Supabase upload timeout')), 2500)
        );

        const { data, error } = await Promise.race([uploadPromise, timeoutPromise]) as any;

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from('admission-documents')
            .getPublicUrl(fileName);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              message: 'File uploaded to Supabase Storage!',
              imageUrl: publicUrlData.publicUrl,
              url: publicUrlData.publicUrl
            });
          }
        }
      } catch (supabaseErr) {
        console.warn('Supabase storage upload skipped/failed, using local/data URL fallback:', supabaseErr);
      }
    }

    // 2. Local filesystem upload fallback (/public/uploads)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      const localUrl = `/uploads/${fileName}`;

      return NextResponse.json({
        success: true,
        message: 'File saved successfully!',
        imageUrl: localUrl,
        url: localUrl
      });
    } catch (fsErr) {
      console.warn('Filesystem upload failed, using Data URL fallback:', fsErr);

      // 3. Base64 Data URL fallback
      const base64Data = `data:${file.type || 'image/jpeg'};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        message: 'File processed successfully!',
        imageUrl: base64Data,
        url: base64Data
      });
    }
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upload document' },
      { status: 500 }
    );
  }
}


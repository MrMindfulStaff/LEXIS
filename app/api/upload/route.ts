import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

export const runtime = 'nodejs';

// pdf-parse v2 has no default export — use require for compatibility
let pdfParse: any = null;
try {
  pdfParse = require('pdf-parse');
} catch {
  // Will fail gracefully at runtime if pdf-parse unavailable
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const filename = file.name;
    const ext = filename.split('.').pop()?.toLowerCase();
    let content = '';

    if (ext === 'txt') {
      content = await file.text();
    } else if (ext === 'pdf') {
      if (!pdfParse) {
        return NextResponse.json(
          { error: 'PDF parsing is not available' },
          { status: 500 }
        );
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const data = await pdfParse(buffer);
      content = data.text;
    } else if (ext === 'docx') {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await mammoth.extractRawText({ buffer });
      content = result.value;
    } else {
      return NextResponse.json(
        { error: `Unsupported file type: .${ext}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ filename, content });
  } catch (err: any) {
    console.error('Upload route error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to parse file' },
      { status: 500 }
    );
  }
}

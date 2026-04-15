'use client';

import { useState, useCallback } from 'react';
import { DocumentRef } from '@/lib/types';

async function extractText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase();

  if (ext === 'txt') {
    return await file.text();
  }

  if (ext === 'pdf') {
    const arrayBuffer = await file.arrayBuffer();
    const pdfjsLib = await import('pdfjs-dist');

    // Set worker source
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      pages.push(pageText);
    }

    return pages.join('\n\n');
  }

  if (ext === 'docx') {
    const arrayBuffer = await file.arrayBuffer();
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  throw new Error(`Unsupported file type: .${ext}`);
}

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentRef[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadFiles = useCallback(async (files: FileList) => {
    setIsUploading(true);
    setUploadError(null);
    const newDocs: DocumentRef[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const content = await extractText(file);
        if (content.trim()) {
          newDocs.push({ filename: file.name, content });
        } else {
          console.warn(`No text extracted from ${file.name}`);
          setUploadError(`Could not extract text from ${file.name}`);
        }
      } catch (err: any) {
        console.error(`Failed to parse ${file.name}:`, err);
        setUploadError(`Failed to parse ${file.name}: ${err.message}`);
      }
    }

    if (newDocs.length > 0) {
      setDocuments((prev) => [...prev, ...newDocs]);
    }
    setIsUploading(false);
  }, []);

  const removeDocument = useCallback((index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearDocuments = useCallback(() => {
    setDocuments([]);
  }, []);

  const clearError = useCallback(() => {
    setUploadError(null);
  }, []);

  return { documents, isUploading, uploadError, uploadFiles, removeDocument, clearDocuments, clearError };
}

'use client';

import { useState, useCallback } from 'react';
import { DocumentRef } from '@/lib/types';

export function useDocuments() {
  const [documents, setDocuments] = useState<DocumentRef[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFiles = useCallback(async (files: FileList) => {
    setIsUploading(true);
    const newDocs: DocumentRef[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          console.error(`Failed to parse ${file.name}:`, data.error);
          continue;
        }

        const data = await res.json();
        newDocs.push({ filename: data.filename, content: data.content });
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err);
      }
    }

    setDocuments((prev) => [...prev, ...newDocs]);
    setIsUploading(false);
  }, []);

  const removeDocument = useCallback((index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearDocuments = useCallback(() => {
    setDocuments([]);
  }, []);

  return { documents, isUploading, uploadFiles, removeDocument, clearDocuments };
}

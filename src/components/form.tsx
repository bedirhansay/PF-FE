"use client"

import React, { useState } from 'react';
import { ImageCompressor } from '@utils';

export const FormPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tFile, setTFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      try {
        // Dosyayı sıkıştır ve sıkıştırılmış dosyayı al
        let tempFile = await ImageCompressor(file);
        setTFile(tempFile);

        // Sıkıştırılmış ve orijinal dosyaların boyutlarını al
        const originalSize = file.size / (1024 * 1024); // MB cinsinden
        const compressedSize = tempFile ? tempFile.size / (1024 * 1024) : 0; // MB cinsinden

        // Farkı hesapla
        const reducedSize = originalSize - compressedSize;
        console.log('Original Size:', originalSize.toFixed(2), 'MB');
        console.log('Compressed Size:', compressedSize.toFixed(2), 'MB');
        console.log('Reduced Size:', reducedSize.toFixed(2), 'MB');

      } catch (error) {
        console.error('Error compressing image:', error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // FormData oluştur
      const formData = new FormData();
      formData.append('file', tFile || selectedFile);
      formData.append("field", "skills");
      formData.append("name", (tFile && tFile.name) || selectedFile.name);

      // POST isteği yap
      const response = await fetch('http://127.0.0.1:3000/api/images', {
        method: 'POST',
        body: formData,
       
      });

     console.log(response)
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='bg-red-600'>
      <input type="file" onChange={handleFileChange} placeholder='kljjş' />
      {selectedFile && (
        <div>
          <p>Seçilen Dosya Bilgileri:</p>
          <p>Adı: {selectedFile.name}</p>
          <p>Boyutu: {selectedFile.size} bayt</p>
        </div>
      )}
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

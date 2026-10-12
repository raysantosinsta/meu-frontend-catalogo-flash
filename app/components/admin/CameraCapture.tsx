'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Camera, RefreshCw } from 'lucide-react';

interface CameraCaptureProps {
  onImageCaptured: (file: File) => void;
}

export function CameraCapture({ onImageCaptured }: CameraCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [fileSizeKb, setFileSizeKb] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);

      // Requisito RNF03: Compressão no cliente em WebP, max 1080px e < 250KB
      const options = {
        maxSizeMB: 0.25, // 250 KB
        maxWidthOrHeight: 1080,
        useWebWorker: true,
        fileType: 'image/webp',
      };

      const compressedBlob = await imageCompression(file, options);
      const compressedFile = new File(
        [compressedBlob],
        `product-${Date.now()}.webp`,
        { type: 'image/webp' }
      );

      setFileSizeKb(Math.round(compressedFile.size / 1024));
      setPreview(URL.createObjectURL(compressedFile));
      onImageCaptured(compressedFile);
    } catch (err) {
      console.error('Erro na compressão:', err);
    } finally {
      setCompressing(false);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment" // Força câmera traseira do smartphone
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative aspect-[3/4] w-full bg-stone-100 rounded-3xl overflow-hidden border-2 border-stone-200">
          <img src={preview} alt="Pré-visualização" className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur text-white text-[11px] px-2.5 py-1 rounded-full font-medium">
            WebP • {fileSizeKb} KB
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-3 right-3 bg-white text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow flex items-center gap-1 active:scale-95 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Tirar outra
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={compressing}
          className="w-full aspect-[3/4] border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-3xl flex flex-col items-center justify-center p-6 bg-stone-50 transition active:scale-[0.99]"
        >
          {compressing ? (
            <div className="flex flex-col items-center gap-2 text-stone-500">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
              <span className="text-xs font-medium">Otimizando foto...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2.5 text-stone-600">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <Camera className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-stone-800">Tirar Foto da Peça</span>
              <span className="text-xs text-stone-400 text-center max-w-[200px]">
                Toque para abrir a câmera ou escolher da galeria
              </span>
            </div>
          )}
        </button>
      )}
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Camera, Image as ImageIcon, RefreshCw } from 'lucide-react';

interface CameraCaptureProps {
  onImageCaptured: (file: File) => void;
}

export function CameraCapture({ onImageCaptured }: CameraCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [fileSizeKb, setFileSizeKb] = useState<number | null>(null);
  const [formatLabel, setFormatLabel] = useState<string>('WebP');

  const processFile = async (file: File) => {
    let finalFile = file;
    let label = 'Original';

    try {
      setCompressing(true);

      // Requisito RNF03: Compressão no cliente em WebP, max 1200px e < 350KB
      const options = {
        maxSizeMB: 0.35, // 350 KB
        maxWidthOrHeight: 1200,
        useWebWorker: false, // false garante compatibilidade total sem falhas de worker
        fileType: 'image/webp',
      };

      const compressedBlob = await imageCompression(file, options);
      finalFile = new File(
        [compressedBlob],
        `product-${Date.now()}.webp`,
        { type: 'image/webp' }
      );
      label = 'WebP Otimizado';
    } catch (err) {
      console.warn('Compressão automática indisponível, utilizando foto original:', err);
      finalFile = file;
      label = file.type?.split('/')[1]?.toUpperCase() || 'Foto';
    } finally {
      setCompressing(false);
    }

    setFormatLabel(label);
    setFileSizeKb(Math.round(finalFile.size / 1024));
    setPreview(URL.createObjectURL(finalFile));
    onImageCaptured(finalFile);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Permite selecionar o mesmo arquivo novamente se o usuário quiser
    e.target.value = '';
    await processFile(file);
  };

  return (
    <div className="w-full">
      {/* Input para galeria / arquivos (desktop e smartphone) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Input direto para câmera (smartphones) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative aspect-[3/4] w-full bg-stone-100 rounded-3xl overflow-hidden border-2 border-stone-200 shadow-inner">
          <img src={preview} alt="Pré-visualização" className="w-full h-full object-cover" />
          <div className="absolute bottom-3 left-3 bg-stone-900/85 backdrop-blur text-white text-[11px] px-3 py-1 rounded-full font-medium shadow">
            {formatLabel} • {fileSizeKb} KB
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 active:scale-95 transition hover:bg-stone-50"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Trocar Foto
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-[3/4] border-2 border-dashed border-stone-300 hover:border-amber-500 rounded-3xl flex flex-col items-center justify-center p-6 bg-stone-50 transition">
          {compressing ? (
            <div className="flex flex-col items-center gap-2 text-stone-500">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
              <span className="text-xs font-medium">Otimizando foto...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center w-full max-w-xs">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <span className="text-sm font-bold text-stone-800 block">Foto da Peça</span>
                <span className="text-xs text-stone-400 block mt-0.5">
                  Tire na hora ou escolha da sua galeria
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full pt-1">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  Abrir Câmera
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                >
                  <ImageIcon className="w-4 h-4 text-stone-600" />
                  Galeria / Arquivo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

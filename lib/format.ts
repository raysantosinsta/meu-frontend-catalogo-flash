export function normalizeImageUrl(url?: string): string {
  if (!url) return '';
  const clean = url.trim();

  // Se a URL contiver o caminho dos tenants no R2, garante a CDN pública oficial
  if (clean.includes('tenants/')) {
    const key = clean.substring(clean.indexOf('tenants/'));
    return `https://pub-26ae5bdf8e824fa9b97c006a492c69b4.r2.dev/${key}`;
  }

  // Converte URLs privadas antigas do R2 para a URL pública pub-xxx.r2.dev
  if (clean.includes('.r2.cloudflarestorage.com')) {
    return clean.replace(
      /https?:\/\/[^/]+\.r2\.cloudflarestorage\.com/g,
      'https://pub-26ae5bdf8e824fa9b97c006a492c69b4.r2.dev'
    );
  }
  return clean;
}

export function formatWhatsAppNumber(phone?: string): string {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  if (!clean) return '';
  // Se tiver 10 ou 11 dígitos (DDD + número no Brasil), inclui o código do país 55
  if (clean.length === 10 || clean.length === 11) {
    return `55${clean}`;
  }
  return clean;
}

export const ReadMin = (metin: any) => {
  const kelimeSayisi = metin.split(/\s+/).length;
  const ortalamaOkumaHizi = 225;
  const okumaSuresi = kelimeSayisi / ortalamaOkumaHizi;

  return Math.ceil(okumaSuresi);
};

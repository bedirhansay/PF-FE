"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="absolute text-center text-4xl bg-gray-900  inset-0">
      <div className="absolute-center text-white border p-20 rounded shadow-2xl">
        <h2>Aradığınız Sayfa Mevcut Değil</h2>
        <br />
        <Link href="/">Anasayfaya dön</Link>
      </div>
    </div>
  );
}

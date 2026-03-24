"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = "blog",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setUploading(true);
    const ext = file.name.split(".").pop();
    const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from("media")
      .upload(name, file, { upsert: true });

    if (error) {
      alert("Errore upload: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(name);
    onChange(data.publicUrl);
    setUploading(false);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) upload(file);
  }

  async function handleRemove() {
    if (value) {
      // Extract path from URL
      const path = value.split("/media/")[1];
      if (path) {
        await supabase.storage.from("media").remove([path]);
      }
    }
    onChange("");
  }

  return (
    <div>
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-[rgba(255,255,255,0.08)]">
          <img
            src={value}
            alt=""
            className="w-full h-40 object-cover bg-[#0c0c0c]"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-[rgba(0,0,0,0.7)] text-white text-[10px] px-2 py-1 rounded-md hover:bg-[rgba(0,0,0,0.9)] transition-colors"
            >
              Sostituisci
            </button>
            <button
              onClick={handleRemove}
              className="bg-[rgba(0,0,0,0.7)] text-red-400 text-[10px] px-2 py-1 rounded-md hover:bg-[rgba(0,0,0,0.9)] transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-[#ff5c35] bg-[#ff5c35]/5"
              : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]"
          }`}
        >
          {uploading ? (
            <p className="text-sm text-[rgba(245,242,239,0.5)]">
              Caricamento...
            </p>
          ) : (
            <>
              <p className="text-sm text-[rgba(245,242,239,0.4)]">
                Trascina un&apos;immagine o{" "}
                <span className="text-[#ff5c35]">clicca per caricare</span>
              </p>
              <p className="text-[10px] text-[rgba(245,242,239,0.25)] mt-1">
                PNG, JPG, WebP — max 5MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}

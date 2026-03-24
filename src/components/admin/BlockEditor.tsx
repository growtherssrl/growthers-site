"use client";

import React from "react";
import dynamic from "next/dynamic";
import ImageUpload from "@/components/admin/ImageUpload";

const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), {
  ssr: false,
  loading: () => <div className="min-h-[150px] bg-[#0c0c0c] rounded-lg animate-pulse" />,
});

// ── Types ──────────────────────────────────────────────────────────────────────

type BlockType = "text" | "image" | "carousel" | "video" | "banner";

interface TextBlock {
  type: "text";
  content: string;
}
interface ImageBlock {
  type: "image";
  url: string;
  alt: string;
  caption: string;
  width: string;
  borderRadius: string;
  customCss: string;
}
interface CarouselBlock {
  type: "carousel";
  images: { url: string; alt: string }[];
  width: string;
  borderRadius: string;
  customCss: string;
}
interface VideoBlock {
  type: "video";
  url: string;
  caption: string;
}
interface BannerBlock {
  type: "banner";
  title: string;
  description: string;
  cta_text: string;
  cta_url: string;
  variant: "accent" | "dark" | "gradient";
}

type Block = TextBlock | ImageBlock | CarouselBlock | VideoBlock | BannerBlock;

interface BlockEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-[#0c0c0c] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-[#f5f2ef] placeholder:text-[rgba(245,242,239,0.25)] focus:border-[#ff5c35] focus:outline-none transition-colors";

const DOT_COLORS: Record<BlockType, string> = {
  text: "#ff5c35",
  image: "#30d158",
  carousel: "#bf5af2",
  video: "#3b82f6",
  banner: "#f59e0b",
};

const BLOCK_LABELS: Record<BlockType, string> = {
  text: "Testo",
  image: "Immagine",
  carousel: "Carosello",
  video: "Video",
  banner: "Banner",
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function parseCssString(css: string): Record<string, string> {
  const style: Record<string, string> = {};
  css.split(";").forEach((rule) => {
    const [prop, val] = rule.split(":").map((s) => s.trim());
    if (prop && val) {
      const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      style[camel] = val;
    }
  });
  return style;
}

function createEmptyBlock(type: BlockType): Block {
  switch (type) {
    case "text":
      return { type: "text", content: "" };
    case "image":
      return { type: "image", url: "", alt: "", caption: "", width: "100", borderRadius: "12", customCss: "" };
    case "carousel":
      return { type: "carousel", images: [{ url: "", alt: "" }], width: "100", borderRadius: "12", customCss: "" };
    case "video":
      return { type: "video", url: "", caption: "" };
    case "banner":
      return {
        type: "banner",
        title: "",
        description: "",
        cta_text: "",
        cta_url: "",
        variant: "accent",
      };
  }
}

// ── Sub-editors ────────────────────────────────────────────────────────────────

function TextEditor({
  block,
  onUpdate,
}: {
  block: TextBlock;
  onUpdate: (b: TextBlock) => void;
}) {
  return (
    <RichTextEditor
      content={block.content}
      onChange={(html) => onUpdate({ ...block, content: html })}
      placeholder="Scrivi il contenuto..."
    />
  );
}

function ImageEditor({
  block,
  onUpdate,
}: {
  block: ImageBlock;
  onUpdate: (b: ImageBlock) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <ImageUpload
        value={block.url}
        onChange={(url) => onUpdate({ ...block, url })}
        folder="blog"
      />
      <input
        className={inputCls}
        placeholder="Testo alternativo (alt)"
        value={block.alt}
        onChange={(e) => onUpdate({ ...block, alt: e.target.value })}
      />
      <input
        className={inputCls}
        placeholder="Didascalia (opzionale)"
        value={block.caption}
        onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
      />

      {/* CSS Controls */}
      <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 mt-1">
        <span className="text-[10px] text-[rgba(245,242,239,0.3)] uppercase tracking-wider">Stile</span>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div>
            <label className="text-[10px] text-[rgba(245,242,239,0.4)] block mb-1">Larghezza %</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="20" max="100" step="5"
                value={block.width || "100"}
                onChange={(e) => onUpdate({ ...block, width: e.target.value })}
                className="flex-1 accent-[#ff5c35]"
              />
              <span className="text-xs text-[rgba(245,242,239,0.5)] w-8 text-right">{block.width || 100}%</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[rgba(245,242,239,0.4)] block mb-1">Border Radius</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0" max="32" step="2"
                value={block.borderRadius || "12"}
                onChange={(e) => onUpdate({ ...block, borderRadius: e.target.value })}
                className="flex-1 accent-[#ff5c35]"
              />
              <span className="text-xs text-[rgba(245,242,239,0.5)] w-8 text-right">{block.borderRadius || 12}px</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[rgba(245,242,239,0.4)] block mb-1">CSS custom</label>
            <input
              className={inputCls + " text-xs font-mono"}
              placeholder="es. box-shadow: 0 4px 20px rgba(0,0,0,0.5)"
              value={block.customCss || ""}
              onChange={(e) => onUpdate({ ...block, customCss: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      {block.url && (
        <div className="bg-[#0a0a0a] rounded-lg p-4 flex justify-center">
          <img
            src={block.url}
            alt={block.alt || ""}
            style={{
              width: `${block.width || 100}%`,
              borderRadius: `${block.borderRadius || 12}px`,
              ...(block.customCss ? parseCssString(block.customCss) : {}),
            }}
            className="max-h-48 object-cover"
          />
        </div>
      )}
    </div>
  );
}

function CarouselEditor({
  block,
  onUpdate,
}: {
  block: CarouselBlock;
  onUpdate: (b: CarouselBlock) => void;
}) {
  const updateImage = (
    index: number,
    field: "url" | "alt",
    value: string
  ) => {
    const images = block.images.map((img, i) =>
      i === index ? { ...img, [field]: value } : img
    );
    onUpdate({ ...block, images });
  };

  const addImage = () => {
    onUpdate({ ...block, images: [...block.images, { url: "", alt: "" }] });
  };

  const removeImage = (index: number) => {
    if (block.images.length <= 1) return;
    onUpdate({ ...block, images: block.images.filter((_, i) => i !== index) });
  };

  return (
    <div className="flex flex-col gap-4">
      {block.images.map((img, i) => (
        <div
          key={i}
          className="bg-[#0c0c0c] border border-[rgba(255,255,255,0.06)] rounded-lg p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-[rgba(245,242,239,0.4)] uppercase tracking-wider">
              Immagine {i + 1}
            </span>
            {block.images.length > 1 && (
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="text-red-400/60 hover:text-red-400 text-xs transition-colors"
              >
                Rimuovi
              </button>
            )}
          </div>
          <ImageUpload
            value={img.url}
            onChange={(url) => updateImage(i, "url", url)}
            folder="blog/carousel"
          />
          <input
            className={`${inputCls} mt-2`}
            placeholder={`Alt immagine ${i + 1}`}
            value={img.alt}
            onChange={(e) => updateImage(i, "alt", e.target.value)}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addImage}
        className="self-start bg-[#0c0c0c] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-1.5 text-xs text-[rgba(245,242,239,0.5)] hover:border-[#bf5af2] hover:text-[#f5f2ef] transition-colors"
      >
        + Aggiungi immagine
      </button>

      {/* CSS Controls */}
      <div className="bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-lg p-3 mt-1">
        <span className="text-[10px] text-[rgba(245,242,239,0.3)] uppercase tracking-wider">Stile carosello</span>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div>
            <label className="text-[10px] text-[rgba(245,242,239,0.4)] block mb-1">Larghezza slide %</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="30" max="100" step="5"
                value={block.width || "100"}
                onChange={(e) => onUpdate({ ...block, width: e.target.value })}
                className="flex-1 accent-[#ff5c35]"
              />
              <span className="text-xs text-[rgba(245,242,239,0.5)] w-8 text-right">{block.width || 100}%</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[rgba(245,242,239,0.4)] block mb-1">Border Radius</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0" max="32" step="2"
                value={block.borderRadius || "12"}
                onChange={(e) => onUpdate({ ...block, borderRadius: e.target.value })}
                className="flex-1 accent-[#ff5c35]"
              />
              <span className="text-xs text-[rgba(245,242,239,0.5)] w-8 text-right">{block.borderRadius || 12}px</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] text-[rgba(245,242,239,0.4)] block mb-1">CSS custom</label>
            <input
              className={inputCls + " text-xs font-mono"}
              placeholder="es. gap: 24px"
              value={block.customCss || ""}
              onChange={(e) => onUpdate({ ...block, customCss: e.target.value })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoEditor({
  block,
  onUpdate,
}: {
  block: VideoBlock;
  onUpdate: (b: VideoBlock) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <input
        className={inputCls}
        placeholder="Incolla un link YouTube o Vimeo"
        value={block.url}
        onChange={(e) => onUpdate({ ...block, url: e.target.value })}
      />
      <input
        className={inputCls}
        placeholder="Didascalia (opzionale)"
        value={block.caption}
        onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
      />
    </div>
  );
}

function BannerEditor({
  block,
  onUpdate,
}: {
  block: BannerBlock;
  onUpdate: (b: BannerBlock) => void;
}) {
  const variantStyles: Record<BannerBlock["variant"], string> = {
    accent: "bg-[#ff5c35]",
    dark: "bg-[#1a1a1a]",
    gradient: "bg-gradient-to-r from-[#ff5c35] to-[#bf5af2]",
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        className={inputCls}
        placeholder="Titolo banner"
        value={block.title}
        onChange={(e) => onUpdate({ ...block, title: e.target.value })}
      />
      <textarea
        className={`${inputCls} resize-none`}
        rows={2}
        placeholder="Descrizione"
        value={block.description}
        onChange={(e) => onUpdate({ ...block, description: e.target.value })}
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          className={inputCls}
          placeholder="Testo CTA"
          value={block.cta_text}
          onChange={(e) => onUpdate({ ...block, cta_text: e.target.value })}
        />
        <input
          className={inputCls}
          placeholder="URL CTA"
          value={block.cta_url}
          onChange={(e) => onUpdate({ ...block, cta_url: e.target.value })}
        />
      </div>
      <div className="flex items-center gap-3">
        <label className="text-xs text-[rgba(245,242,239,0.5)]">Variante</label>
        <select
          className={inputCls + " w-auto"}
          value={block.variant}
          onChange={(e) =>
            onUpdate({
              ...block,
              variant: e.target.value as BannerBlock["variant"],
            })
          }
        >
          <option value="accent">Accent</option>
          <option value="dark">Dark</option>
          <option value="gradient">Gradient</option>
        </select>
      </div>
      <div
        className={`${variantStyles[block.variant]} rounded-lg h-8 w-full border border-[rgba(255,255,255,0.08)]`}
      />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function BlockEditor({ blocks, onChange }: BlockEditorProps) {
  const updateBlock = (index: number, updated: Block) => {
    const next = blocks.map((b, i) => (i === index ? updated : b));
    onChange(next);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const next = [...blocks];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    onChange(next);
  };

  const moveDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const next = [...blocks];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    onChange(next);
  };

  const deleteBlock = (index: number) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo blocco?")) return;
    onChange(blocks.filter((_, i) => i !== index));
  };

  const addBlock = (type: BlockType) => {
    onChange([...blocks, createEmptyBlock(type)]);
  };

  const renderEditor = (block: Block, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <TextEditor
            block={block}
            onUpdate={(b) => updateBlock(index, b)}
          />
        );
      case "image":
        return (
          <ImageEditor
            block={block}
            onUpdate={(b) => updateBlock(index, b)}
          />
        );
      case "carousel":
        return (
          <CarouselEditor
            block={block}
            onUpdate={(b) => updateBlock(index, b)}
          />
        );
      case "video":
        return (
          <VideoEditor
            block={block}
            onUpdate={(b) => updateBlock(index, b)}
          />
        );
      case "banner":
        return (
          <BannerEditor
            block={block}
            onUpdate={(b) => updateBlock(index, b)}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-4" style={{ background: "#050505" }}>
      {blocks.map((block, index) => (
        <div key={index}>
          {/* Top bar */}
          <div className="bg-[#0c0c0c] px-4 py-2 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: DOT_COLORS[block.type] }}
              />
              <span className="text-xs uppercase tracking-wider text-[rgba(245,242,239,0.5)]">
                {BLOCK_LABELS[block.type]}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => moveUp(index)}
                  className="text-[rgba(245,242,239,0.3)] hover:text-[#f5f2ef] text-sm transition-colors"
                >
                  &#9650;
                </button>
              )}
              {index < blocks.length - 1 && (
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  className="text-[rgba(245,242,239,0.3)] hover:text-[#f5f2ef] text-sm transition-colors"
                >
                  &#9660;
                </button>
              )}
              <button
                type="button"
                onClick={() => deleteBlock(index)}
                className="text-red-400 hover:text-red-300 text-sm transition-colors ml-2"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="bg-[#141414] p-4 rounded-b-lg border border-[rgba(255,255,255,0.08)] border-t-0">
            {renderEditor(block, index)}
          </div>
        </div>
      ))}

      {/* Add block section */}
      <div className="flex flex-col gap-2">
        <span className="text-xs uppercase tracking-wider text-[rgba(245,242,239,0.3)]">
          Aggiungi blocco
        </span>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(DOT_COLORS) as BlockType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="bg-[#141414] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 flex flex-col items-center gap-1 hover:border-[#ff5c35] transition-colors cursor-pointer"
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: DOT_COLORS[type] }}
              />
              <span className="text-xs text-[rgba(245,242,239,0.5)]">
                {BLOCK_LABELS[type]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

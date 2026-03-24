"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2 py-1 text-xs rounded transition-colors ${
        active
          ? "bg-[#ff5c35] text-white"
          : "text-[rgba(245,242,239,0.5)] hover:text-[#f5f2ef] hover:bg-[rgba(255,255,255,0.06)]"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Scrivi il contenuto...",
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-[#ff5c35] underline" },
      }),
      Underline,
      Placeholder.configure({ placeholder }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none min-h-[150px] focus:outline-none px-4 py-3 text-[#f5f2ef] text-sm leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external content changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt("URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border border-[rgba(255,255,255,0.08)] rounded-lg overflow-hidden bg-[#0c0c0c]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-[rgba(255,255,255,0.06)] bg-[#0a0a0a]">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Grassetto"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Corsivo"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
          title="Sottolineato"
        >
          <u>U</u>
        </ToolbarButton>

        <span className="w-px h-4 bg-[rgba(255,255,255,0.08)] mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Titolo H2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Titolo H3"
        >
          H3
        </ToolbarButton>

        <span className="w-px h-4 bg-[rgba(255,255,255,0.08)] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Lista puntata"
        >
          •&thinsp;Lista
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Lista numerata"
        >
          1.&thinsp;Lista
        </ToolbarButton>

        <span className="w-px h-4 bg-[rgba(255,255,255,0.08)] mx-1" />

        <ToolbarButton
          onClick={addLink}
          active={editor.isActive("link")}
          title="Link"
        >
          🔗
        </ToolbarButton>
        {editor.isActive("link") && (
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Rimuovi link"
          >
            ✕
          </ToolbarButton>
        )}

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Citazione"
        >
          ❝
        </ToolbarButton>

        <span className="w-px h-4 bg-[rgba(255,255,255,0.08)] mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Separatore"
        >
          —
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* TipTap prose styles */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(245, 242, 239, 0.2);
          pointer-events: none;
          height: 0;
        }
        .ProseMirror h2 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #f5f2ef;
        }
        .ProseMirror h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
          color: #f5f2ef;
        }
        .ProseMirror p {
          margin-bottom: 0.75rem;
          color: rgba(245, 242, 239, 0.7);
        }
        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 1.25rem;
          margin-bottom: 0.75rem;
          color: rgba(245, 242, 239, 0.7);
        }
        .ProseMirror li {
          margin-bottom: 0.25rem;
        }
        .ProseMirror blockquote {
          border-left: 2px solid #ff5c35;
          padding-left: 1rem;
          margin: 1rem 0;
          color: rgba(245, 242, 239, 0.5);
          font-style: italic;
        }
        .ProseMirror hr {
          border: none;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          margin: 1.5rem 0;
        }
        .ProseMirror a {
          color: #ff5c35;
          text-decoration: underline;
        }
        .ProseMirror strong {
          color: #f5f2ef;
        }
      `}</style>
    </div>
  );
}

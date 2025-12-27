"use client";

import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  ChevronLeft,
  Code,
  Copy,
  Download,
  Eye,
  FileCode,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import TurndownService from "turndown";

export default function ReadmeEditorPage() {
  const params = useParams();
  const repoName = params.projectname;
  const [copied, setCopied] = useState(false);
  const [markdown, setMarkdown] = useState("");

  // Memoizando a função de conversão para evitar recriações desnecessárias
  const getTurndownService = useCallback(() => {
    return new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
    });
  }, []);

  const updateMarkdown = useCallback(
    (html: string) => {
      const service = getTurndownService();
      setMarkdown(service.turndown(html));
    },
    [getTurndownService]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({
        placeholder: "Comece a documentar seu sucesso...",
      }),
    ],
    immediatelyRender: false,
    content: `<h1>${repoName}</h1><p>Uma descrição épica começa aqui...</p>`,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[500px] p-8 selection:bg-blue-500/30",
      },
    },
    // SOLUÇÃO PARA O ERRO: Inicializa o markdown assim que o editor é criado
    onCreate: ({ editor }) => {
      updateMarkdown(editor.getHTML());
    },
    // Atualização em tempo real do Markdown
    onUpdate: ({ editor }) => {
      updateMarkdown(editor.getHTML());
    },
  });

  // Removido o useEffect que causava o erro react-hooks/set-state-in-effect

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const downloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "README.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!editor) return null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505] p-4 md:p-6 text-zinc-300 font-sans">
      <header className="flex items-center justify-between mb-6 max-w-[1600px] mx-auto w-full">
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group"
        >
          <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[11px] font-mono text-blue-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            LIVE_SYNC_ENABLED
          </div>
          <button
            onClick={copyToClipboard}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              copied
                ? "bg-emerald-500 text-white"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {copied ? (
              "Copiado!"
            ) : (
              <>
                <Copy className="size-3" /> Copiar Markdown
              </>
            )}
          </button>
          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all bg-blue-800 text-white hover:bg-zinc-700 border border-zinc-700"
          >
            <Download className="size-3" /> Baixar .md
          </button>
          <button
            onClick={downloadMarkdown}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
          >
            <Download className="size-3" /> Salvar .md
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto w-full flex-1">
        <div className="flex flex-col rounded-2xl border border-zinc-800 bg-[#0A0A0A] overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/30">
            <div className="flex items-center gap-1">
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                active={editor.isActive("heading", { level: 1 })}
              >
                <Heading1 className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                active={editor.isActive("heading", { level: 2 })}
              >
                <Heading2 className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                active={editor.isActive("heading", { level: 3 })}
              >
                <Heading3 className="size-4" />
              </ToolbarButton>

              <div className="w-px h-4 bg-zinc-800 mx-1" />
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
              >
                <Bold className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
              >
                <Italic className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                active={editor.isActive("code")}
              >
                <Code className="size-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive("bulletList")}
              >
                <List className="size-4" />
              </ToolbarButton>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              <Eye className="size-3 text-blue-500" /> Editor Visual
            </div>
          </div>

          <div className="overflow-y-auto custom-scrollbar flex-1 bg-transparent">
            <EditorContent editor={editor} />
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-zinc-800 bg-[#0D0D0D] overflow-hidden shadow-2xl relative">
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/50">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-medium">
              <FileCode className="size-4 text-purple-500" />
              README.md
            </div>
            <div className="text-[10px] text-zinc-600 font-mono tracking-tighter">
              GITHUB_FLAVORED_FORMAT
            </div>
          </div>

          <div className="p-8 font-mono text-sm leading-relaxed text-zinc-400 overflow-y-auto custom-scrollbar select-all flex-1">
            {markdown.split("\n").map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-8 text-zinc-700 text-right shrink-0 select-none">
                  {i + 1}
                </span>
                <span
                  className={
                    line.startsWith("#")
                      ? "text-blue-400 font-bold"
                      : "text-white"
                  }
                >
                  {line || " "}
                </span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 right-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-2 shadow-xl flex items-center gap-3">
              <Terminal className="size-4 text-zinc-500" />
              <code className="text-[10px] text-zinc-400">
                length: {markdown.length}
              </code>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
        .prose h1 {
          font-size: 2.25rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          color: white;
        }
        .prose h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          border-bottom: 1px solid #222;
          padding-bottom: 0.5rem;
          color: #f4f4f5;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .prose code {
          background: #1a1a1a;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          color: #93c5fd;
        }
      `}</style>
    </div>
  );
  function ToolbarButton({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={`p-2 rounded-lg transition-all ${
          active
            ? "bg-blue-600/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]"
            : "text-zinc-500 hover:bg-zinc-800 hover:text-white"
        }`}
      >
        {children}
      </button>
    );
  }
}

"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye } from "lucide-react";

export default function MarkdownPreview({
  content,
  onStartWriting,
}: {
  content: string;
  onStartWriting: () => void;
}) {
  return (
    <article className="prose prose-slate mt-7 max-w-none text-[13px] leading-7 sm:mt-8">
      {content.trim() ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="mb-4 mt-8 text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)] first:mt-0">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 mt-7 text-xl font-black tracking-[-0.02em] text-[var(--text-primary)]">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-2 mt-6 text-lg font-black text-[var(--text-primary)]">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 text-[13px] font-medium leading-7 text-[var(--text-secondary)]">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-[var(--text-primary)]">
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em className="text-[var(--text-secondary)]">{children}</em>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 ml-5 list-disc space-y-1.5 text-[var(--text-secondary)]">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-[var(--text-secondary)]">
                {children}
              </ol>
            ),
            li: ({ children }) => <li className="pl-1">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="my-5 border-l-2 border-[var(--accent)] pl-4 italic text-[var(--text-tertiary)]">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="rounded-md bg-[var(--surface-secondary)] px-1.5 py-0.5 font-mono text-[12px] text-[var(--accent)]">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="my-5 overflow-x-auto rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-secondary)] p-4 font-mono text-[12px] leading-6 text-[var(--text-secondary)]">
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--accent)] underline decoration-[var(--accent-soft-strong)] underline-offset-2 hover:text-[var(--accent-hover)]"
              >
                {children}
              </a>
            ),
            hr: () => <hr className="my-7 border-[var(--border-subtle)]" />,
            table: ({ children }) => (
              <div className="my-5 overflow-x-auto rounded-xl border border-[var(--border-subtle)]">
                <table className="w-full text-left text-[12px]">{children}</table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border-b border-[var(--border-subtle)] bg-[var(--surface-secondary)] px-4 py-3 font-black text-[var(--text-secondary)]">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border-b border-[var(--border-subtle)] px-4 py-3 text-[var(--text-secondary)]">
                {children}
              </td>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border)] px-6 py-10 text-center">
          <Eye size={18} className="mx-auto text-[var(--text-disabled)]" />

          <p className="mt-3 text-[10px] font-black text-[var(--text-muted)]">
            Nothing to preview yet
          </p>

          <button
            type="button"
            onClick={onStartWriting}
            className="mt-3 text-[9px] font-black uppercase tracking-[0.1em] text-[var(--accent)]"
          >
            Start writing
          </button>
        </div>
      )}
    </article>
  );
}

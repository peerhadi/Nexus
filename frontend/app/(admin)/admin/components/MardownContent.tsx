"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
};

function normalizeMarkdown(content: string) {
  return content
    .replace(/\\([*#`_[\]()>|])/g, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x20;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/^[ \t]*\\+(-{3,}|_{3,}|\*{3,})[ \t]*$/gm, "$1")
    .replace(/^[ \t]*\\([#])(?=\s)/gm, "$1")
    .replace(/^[ \t]*\\([*-])(?=\s)/gm, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content min-w-0 break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-4 mt-6 text-2xl font-bold">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-xl font-semibold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-5 text-lg font-semibold">{children}</h3>
          ),
          p: ({ children }) => <p className="mb-3 leading-7">{children}</p>,
          ul: ({ children }) => (
            <ul className="mb-4 ml-5 list-disc space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-5 list-decimal space-y-2">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-4 border-l-2 border-current/30 pl-4 opacity-80">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-current/15" />,
          pre: ({ children }) => (
            <pre className="my-4 overflow-x-auto rounded-lg border border-current/10 bg-black/5 p-4">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            const isBlock = Boolean(className);

            return isBlock ? (
              <code className={className}>{children}</code>
            ) : (
              <code className="rounded bg-black/5 px-1.5 py-0.5 text-[0.9em]">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {children}
            </a>
          ),
        }}
      >
        {normalizeMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}

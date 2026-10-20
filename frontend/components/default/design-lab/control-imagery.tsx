"use client";

import { type ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";

export default function ControlImagery({
  uploadedImages,
  onImageUpload,
  onRemoveImage,
}: {
  uploadedImages: string[];
  onImageUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between gap-2">
        <label className="text-xs font-semibold text-[var(--text-primary)]">
          05 / Your imagery
        </label>
        <span className="text-[10px] text-[var(--text-muted)]">
          {uploadedImages.length}/4 images
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {uploadedImages.map((src, index) => (
          <div
            key={src}
            className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-secondary)]"
          >
            <img
              src={src}
              alt={`Uploaded image ${index + 1}`}
              className="h-full w-full object-cover"
            />
            <button
              onClick={() => onRemoveImage(index)}
              aria-label={`Remove image ${index + 1}`}
              className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--text-primary)]/80 text-[var(--text-inverse)] opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
            >
              <X size={11} />
            </button>
          </div>
        ))}

        {uploadedImages.length < 4 && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-active)]">
            <ImagePlus size={17} />
            <span className="text-[9px]">Add image</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageUpload}
              className="sr-only"
            />
          </label>
        )}
      </div>

      <p className="mt-2 text-[10px] leading-relaxed text-[var(--text-muted)]">
        Uploaded images appear in the preview. Images keep their
        aspect ratio and crop cleanly inside their frames.
      </p>
    </section>
  );
}

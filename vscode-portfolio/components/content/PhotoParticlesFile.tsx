import { EditorSurface, CommentLine } from "./EditorSurface";
import { PhotoParticlesDemo } from "./PhotoParticlesDemo";

export function PhotoParticlesFile() {
  return (
    <EditorSurface>
      <CommentLine>{"// components/photo-particles.ts"}</CommentLine>
      <p className="mb-8 mt-2 text-text-muted">
        A canvas-based particle system that samples the pixels of a circular photo and re-renders it as ~2,000
        springy, physics-driven particles. Click and drag to scatter them — they orbit back to their home position.
      </p>
      <PhotoParticlesDemo />
    </EditorSurface>
  );
}

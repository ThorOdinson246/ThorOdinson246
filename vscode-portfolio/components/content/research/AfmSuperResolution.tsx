"use client";

import { ResearchLayout, Section, Block, StatusNote, BulletList } from "./ResearchLayout";

export function AfmSuperResolution() {
  return (
    <ResearchLayout
      sourceFile="projects/research/afm-super-resolution.tsx"
      hero={
        <>
          <span className="rounded-full border border-accent-focus/40 bg-accent-focus/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-link">
            Research · Ma Lab, USM
          </span>
          <h1 className="mt-4 text-2xl font-semibold leading-snug text-text-body">
            Super-Resolution &amp; Segmentation for Atomic Force Microscopy of Block Copolymers
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
            Machine-learning pipelines to automatically characterize and accelerate Atomic Force Microscopy (AFM)
            imaging of block copolymers (BCPs) — turning slow, manual nanoscale characterization into a fast,
            reproducible, learned workflow.
          </p>
          <p className="mt-3 text-[13px] italic text-text-muted">
            Undergraduate research · Advisor: Dr. Boran Ma · Aug 2025 – Present
          </p>
        </>
      }
    >
      <StatusNote>**Status: Active research — manuscript in preparation.**</StatusNote>

      <Section title="Motivation">
        <p>
          Block copolymers self-assemble into ordered nanoscale patterns that are central to next-generation materials
          and nanolithography. Characterizing those patterns with AFM is accurate but slow: high-resolution scans take a
          long time, and quantifying features from the images is traditionally done with hand-tuned image processing
          that struggles with noise and drift. This project replaces both bottlenecks with learned models.
        </p>
      </Section>

      <Section title="Feature Segmentation">
        <Block title="Custom U-Net for Nanoscale Features">
          <p>
            I trained a custom U-Net convolutional network to segment nanoscale BCP features directly from AFM
            micrographs, producing clean, consistent masks where conventional thresholding and morphology-based analysis
            break down.
          </p>
          <BulletList
            items={[
              "35% improvement in segmentation performance over conventional image-analysis techniques",
              "Robust to the noise, drift, and contrast variation typical of AFM scans",
              "Enables automated, reproducible quantification of feature size and ordering",
            ]}
          />
        </Block>
      </Section>

      <Section title="Accelerated Imaging via Super-Resolution">
        <Block title="Benchmarking SR Architectures">
          <p>
            To cut scan time, I fine-tuned and benchmarked three families of super-resolution models — a CNN-based, a
            transformer-based, and a GAN-based architecture — to reconstruct high-resolution AFM images from faster,
            lower-resolution scans.
          </p>
          <BulletList
            items={[
              "Up to 3.7× reduction in scan time by super-resolving fast low-resolution acquisitions",
              "Head-to-head comparison of CNN, transformer, and GAN approaches on AFM data",
              "Evaluated with PSNR / SSIM against ground-truth high-resolution scans",
            ]}
          />
        </Block>
      </Section>

      <Section title="Stack">
        <p>PyTorch · custom U-Net · CNN / transformer / GAN super-resolution · HPC (SLURM) · Weights &amp; Biases.</p>
      </Section>
    </ResearchLayout>
  );
}

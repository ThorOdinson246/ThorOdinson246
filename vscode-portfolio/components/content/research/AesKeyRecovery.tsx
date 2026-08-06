"use client";

import { ResearchLayout, Section, Block, Figure, BulletList } from "./ResearchLayout";
import { InlineMath, BlockMath } from "./Math";

const ARXIV = "https://arxiv.org/abs/2508.11817";
const SPRINGER = "https://link.springer.com/chapter/10.1007/978-3-032-08649-5_21";
const GITHUB = "https://github.com/ThorOdinson246/AES-Key-Recovery-using-Machine-Learning/";

function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-sm border border-border bg-black/30 px-3 py-1.5 text-[13px] text-text-body transition-colors hover:border-accent-focus hover:text-accent-link"
    >
      {children}
    </a>
  );
}

const results = [
  ["CNN", "ASCADf", "Full Features", "~65 traces"],
  ["CNN", "ASCADv", "Full Features", "--"],
  ["Random Forest", "ASCADf", "Reduced Features", "~200 traces"],
  ["Random Forest", "ASCADf", "Full Features", "~492 traces"],
  ["Random Forest", "ASCADv", "Full Features", "~750 traces"],
  ["Random Forest", "ASCADv", "Reduced Features", "~470 traces"],
  ["SVM", "ASCADf", "Reduced Features", "~320 traces"],
  ["SVM", "ASCADv", "Reduced Features", "~320 traces"],
  ["ResNet", "ASCADv", "Full Features", "30 traces"],
  ["ResNet", "ASCADf", "Full Features", "110 traces"],
];

const references = [
  "Obaid, Z.M., Ali Alheeti, K.M.: Enhancing malware detection through electromagnetic side-channel analysis using random forest classifier. Journal of Cybersecurity & Information Management 15(2) (2025)",
  "Berreby, Y.E., Sauvage, L.: Investigating efficient deep learning architectures for side-channel attacks on aes. arXiv preprint arXiv:2309.13170 (2023)",
  "Kocher, P., Jaffe, J., Jun, B.: Differential power analysis. In: Advances in Cryptology - CRYPTO'99: 19th Annual International Cryptology Conference Santa Barbara, California, USA, August 15–19, 1999 Proceedings 19. pp. 388–397. Springer (1999)",
  "Benadjila, R., Prouff, E., Strullu, R., Cagli, E., Dumas, C.: Deep learning for side-channel analysis and introduction to ascad database. Journal of Cryptographic Engineering 10(2), 163–188 (2020)",
  "Huang, H., Wu, J., Tang, X., Zhao, S., Liu, Z., Yu, B.: Deep learning-based improved side-channel attacks using data denoising and feature fusion. PloS one 20(4), e0315340 (2025)",
  "Picek, S., Heuser, A., Jovic, A., Bhasin, S., Regazzoni, F.: The curse of class imbalance and conflicting metrics with machine learning for side-channel evaluations. IACR Transactions on Cryptographic Hardware and Embedded Systems pp. 209–237 (2019)",
  "Zaid, G., Bossuet, L., Habrard, A., Venelli, A.: Methodology for efficient cnn architectures in profiling attacks. IACR Transactions on Cryptographic Hardware and Embedded Systems pp. 1–36 (2020)",
];

export function AesKeyRecovery() {
  return (
    <ResearchLayout
      sourceFile="projects/research/aes-key-recovery.tsx"
      hero={
        <>
          <span className="rounded-full border border-accent-focus/40 bg-accent-focus/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-link">
            Research
          </span>
          <h1 className="mt-4 text-2xl font-semibold leading-snug text-text-body">
            Machine Learning-Based AES Key Recovery via Side-Channel Analysis on the ASCAD Dataset
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
            Investigating the application of machine learning (ML) and Deep Learning (DL) models to exploit
            electromagnetic (EM) side-channel leakage for AES key recovery. This project uses the public ASCAD dataset
            and focuses on the Key Rank metric for evaluation.
          </p>
          <p className="mt-3 text-[13px] italic text-text-muted">
            Published at the 34th SEDE Conference (AI Track), 2025, in Springer CCIS (vol. 2720, pp. 334-352).
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <OutLink href={SPRINGER}>View on Springer</OutLink>
            <OutLink href={ARXIV}>View on arXiv</OutLink>
            <OutLink href={GITHUB}>View on GitHub</OutLink>
          </div>
        </>
      }
    >

      <Section title="The Vulnerability">
        <p>
          Cryptographic algorithms like Advanced Encryption Standard (AES) are mathematically robust. However, their
          physical implementations on devices can leak information through side channels, such as power consumption or
          electromagnetic (EM) emissions. This leakage can potentially compromise theoretically secure algorithms.
          Electromagnetic analysis (EMA) is a potent form of side-channel analysis (SCA) where attackers measure EM
          fields radiating from a device during cryptographic operations. These emissions often contain subtle
          variations correlated with the intermediate data being processed, which can be linked to the secret key.
        </p>
        <p>
          Recent advancements show Machine Learning (ML) and Deep Learning (DL) are powerful tools for automatically
          learning these complex correlations, often outperforming traditional statistical SCA techniques. This project
          focuses on leveraging ML/DL for AES key recovery using the ASCAD dataset.
        </p>
        <h3 className="pt-2 text-[14px] font-semibold text-text-body">Key Challenges</h3>
        <BulletList
          items={[
            "Low signal-to-noise ratio (SNR) in EM traces.",
            "Standard classification metrics (e.g., accuracy) being uninformative for SCA.",
            "High dimensionality of side-channel data (e.g., 700-1400 samples per trace).",
            "Computational cost of training complex ML models.",
            "Necessity of domain-specific evaluation metrics like Key Rank.",
          ]}
        />
      </Section>

      <Section title="Key Aspects & Contributions">
        <Block title="Comparative Model Analysis">
          <p>
            A comparative performance analysis of standard classifiers (Random Forest, Support Vector Machine), tailored
            Convolutional Neural Network (CNN) and Residual Neural Network (ResNet) for AES key byte recovery on the
            ASCAD fixed and variable key datasets.
          </p>
        </Block>
        <Block title="Feature Importance & Reduction">
          <p>
            Exploration of Random Forest-based feature importance for dimensionality reduction and its impact on model
            efficiency and effectiveness in the SCA context.
          </p>
        </Block>
        <Block title="Key Rank Metric Demonstration">
          <p>
            A clear demonstration of the necessity and superiority of the domain-specific Key Rank metric over standard
            accuracy for evaluating ML-based SCA success, especially in low Signal-to-Noise Ratio scenarios.
          </p>
        </Block>
        <Block title="Successful Key Recovery">
          <p>
            Confirmation of successful key recovery using both CNN and feature-selected RF models, highlighting the
            practical feasibility of ML-based side-channel attacks despite low per-trace classification accuracy.
          </p>
        </Block>
      </Section>

      <Section title="Technical Methodology">
        <Block title="Target: AES S-Box Operation">
          <p>
            The attack targets the output of the first-round AES S-box operation. The S-box input for a byte{" "}
            <InlineMath>{"i"}</InlineMath> is <InlineMath>{"\\text{Plaintext}[i] \\oplus \\text{Key}[i]"}</InlineMath>.
            The output is:
          </p>
          <BlockMath>{"\\textit{Sbox\\_Output}[i] = \\textit{Sbox}(\\textit{Plaintext}[i] \\oplus \\textit{Key}[i])"}</BlockMath>
          <p>Predicting this 256-class output allows deduction of the key byte. We target the 3rd key byte (index 2).</p>
          <Figure src="/projects/aes/fig1Aes.png" alt="AES Round Steps" caption="Fig 1: Basic Steps of an AES Encryption Round" maxWidth={320} />
        </Block>

        <Block title="Attack Mechanics in Detail">
          <p>
            The side-channel leakage occurs primarily in the first masked multiplier of the S-box operation, where XOR
            gates absorb different numbers of transitions for different data inputs. This creates distinctive power
            consumption patterns that correlate directly with the processed data values.
          </p>
          <p>
            Our attack adopts a value-based leakage model, assuming the EM trace contains information correlated with the
            specific value (0-255) of the S-box output. Since this output depends on both the known plaintext and unknown
            key, predicting it allows us to deduce the key byte through a 256-class classification problem.
          </p>
        </Block>

        <Block title="Key Rank Metric: Technical Details">
          <p>
            The superiority of Key Rank over standard accuracy stems from the nature of side-channel attacks. With low
            signal-to-noise ratio, perfect classification of every trace is unrealistic. Instead, our goal is to
            distinguish the correct key from 255 incorrect hypotheses by aggregating subtle evidence across numerous
            traces.
          </p>
          <p>
            For each key hypothesis <InlineMath>{"k_{guess}"}</InlineMath> (0-255), we calculate:
          </p>
          <BlockMath>{"Score(k_{guess}) = \\sum_{i=1}^{N} \\log(P(label=Z\\_hyp\\_i \\mid trace_i) + \\varepsilon)"}</BlockMath>
          <p>
            Where <InlineMath>{"Z\\_hyp\\_i = Sbox(plaintext_i \\oplus k_{guess})"}</InlineMath> for each trace{" "}
            <InlineMath>{"i"}</InlineMath>, and <InlineMath>{"\\varepsilon"}</InlineMath> is a small constant to prevent{" "}
            <InlineMath>{"\\log(0)"}</InlineMath>. The logarithm converts probability multiplications to additions,
            improving computational efficiency.
          </p>
        </Block>

        <Block title="Feature Importance Analysis">
          <p>
            Our feature selection approach using Random Forest&apos;s Gini importance showed that EM leakage is
            distributed across the trace but concentrated in specific time regions. By selecting only the top 100
            features, we reduced the number of attack traces required by approximately 50% for ASCADf and 40% for ASCADv.
          </p>
          <p>
            This dimensionality reduction mitigates overfitting and focuses on the most informative leakage points,
            significantly improving model efficiency while maintaining attack effectiveness.
          </p>
        </Block>

        <Block title="Dataset & Preprocessing">
          <p>
            Utilizes the public ASCAD &apos;fixed-key&apos; (ASCADf: 50k training, 10k attack traces, 700 samples/trace)
            and &apos;variable-key&apos; (ASCADv: 200k training, 100k attack traces, 1400 samples/trace) datasets. Raw EM
            traces are standardized (zero mean, unit variance) based on the profiling set.
          </p>
        </Block>

        <Block title="Machine Learning Models">
          <p>
            <span className="font-semibold text-text-body">Random Forest (RF): </span>
            Ensemble of decision trees <InlineMath>{"n\\_estimators=100"}</InlineMath>,{" "}
            <InlineMath>{"max\\_depth=20"}</InlineMath>, <InlineMath>{"min\\_samples\\_leaf=10"}</InlineMath>. Used for
            classification and Gini importance-based feature selection (top 100 features).
          </p>
          <p>
            <span className="font-semibold text-text-body">Support Vector Machine (SVM): </span>
            Trained on reduced features with RBF kernel.
          </p>
          <p>
            <span className="font-semibold text-text-body">Convolutional Neural Network (CNN): </span>
            Custom PyTorch CNN with 4 convolutional blocks (Conv1D, BatchNorm, ReLU, AvgPool1D) followed by dense layers.
            Inspired by existing SCA literature.
          </p>
          <Figure src="/projects/aes/Fig2cnnarchitecture.png" alt="CNN Architecture" caption="Fig 2: CNN Architecture for SCA" />
          <p>
            <span className="font-semibold text-text-body">Residual Neural Network (ResNet): </span>
            Custom ResNet with 4 residual blocks designed to capture complex leakage patterns.
          </p>
          <Figure src="/projects/aes/fig2ResNet.png" alt="ResNet Architecture" caption="Fig 3: ResNet Architecture for SCA" />
        </Block>

        <Block title="Evaluation: Key Rank">
          <p>
            Primary metric is Key Rank. For N attack traces, it involves: 1. Obtaining model&apos;s probability
            distribution for S-box output for each trace. 2. For each key byte hypothesis (0-255), calculate hypothetical
            S-box outputs and sum log-probabilities from the model. 3. Rank key hypotheses by their total score. Rank 0
            for the true key means successful recovery. This metric aggregates evidence across traces, effective even
            with low per-trace accuracy.
          </p>
          <Figure src="/projects/aes/Fig3keyRankExamplepng.png" alt="Key Rank Example" caption="Fig 3: Example Key Rank Chart" />
        </Block>
      </Section>

      <Section title="Experimental Results & Outcomes">
        <p className="text-[13px]">
          ASCADf=ASCAD fixed-key dataset, ASCADv=ASCAD variable-key dataset
          <br />
          Full Features=all 700 traces for ASCADf, 1400 for ASCADv, Reduced Features=top 100 features based on Gini
          importance
        </p>
        <div className="overflow-x-auto rounded border border-border" data-reveal>
          <table className="w-full text-left text-[13px]">
            <thead className="bg-black/30 text-text-body">
              <tr>
                <th className="px-4 py-2 font-semibold">Model</th>
                <th className="px-4 py-2 font-semibold">Dataset</th>
                <th className="px-4 py-2 font-semibold">Feature Type</th>
                <th className="px-4 py-2 font-semibold">Attack Traces for Rank 0</th>
              </tr>
            </thead>
            <tbody>
              {results.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The Key Rank metric is central to evaluating side-channel attacks: models with low per-trace classification
          accuracy can still recover the key once evidence is aggregated across many traces.
        </p>
      </Section>

      <Section title="Key Contributions">
        <p>Some of the key contributions of this work are:</p>
        <BulletList
          items={[
            <>
              <span className="font-semibold text-text-body">Practical Model Comparison:</span> A thorough comparison of
              traditional ML models (RF, SVM) against deep learning approaches (CNN) on standardized datasets,
              demonstrating that simpler models with feature selection can achieve competitive results.
            </>,
            <>
              <span className="font-semibold text-text-body">Feature Selection Impact:</span> Quantitative evidence that
              RF-based feature selection can reduce attack trace requirements by 40-50%, offering a practical efficiency
              gain without the computational demands of deep learning.
            </>,
            <>
              <span className="font-semibold text-text-body">Evaluation Metrics Insight:</span> Clear demonstration that
              conventional classification metrics can be misleading for SCA evaluation, with models achieving under 2%
              accuracy still successfully recovering encryption keys.
            </>,
            <>
              <span className="font-semibold text-text-body">Accessible Implementation:</span> A proposed methodology
              that balances attack effectiveness with computational efficiency, making SCA more accessible for security
              research and evaluation.
            </>,
          ]}
        />
      </Section>

      <Section title="References & Further Reading">
        <p>This work builds upon existing research in side-channel analysis and machine learning. Key references include:</p>
        <ol className="ml-5 list-decimal space-y-2 text-[13px]">
          {references.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
        <p>
          For the full results and methodology, see the paper on{" "}
          <a href={SPRINGER} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">
            Springer
          </a>{" "}
          or{" "}
          <a href={ARXIV} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">
            arXiv
          </a>
          .
        </p>
      </Section>
    </ResearchLayout>
  );
}

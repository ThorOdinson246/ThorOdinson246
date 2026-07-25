"use client";

import { ResearchLayout, Section, Block, Figure, BulletList } from "./ResearchLayout";

const CONFERENCE =
  "https://asprs.org/iCore/Events/Event_display.aspx?EventKey=MIDSOUTH26&WebsiteKey=e8e7bedc-f8a0-4a72-9989-95fd785baf8a";

const references = [
  "ADB: Emergency Flood Damage Rehabilitation Project, Apr. 2009, www.adb.org/sites/default/files/project-documents/43001-nep-rrp_0.pdf. Accessed 15 Mar. 2025.",
  "Sinha, Rajiv, et al. “Basin-Scale Hydrology and Sediment Dynamics of the Kosi River in the Himalayan Foreland.” Journal of Hydrology, vol. 570, Mar. 2019, pp. 156–166, doi:10.1016/j.jhydrol.2018.12.051.",
  "Stull, Trevor, and Habib Ahmari. “Estimation of Suspended Sediment Concentration along the Lower Brazos River Using Satellite Imagery and Machine Learning.” Remote Sensing, vol. 16, no. 10, 13 May 2024, p. 1727, doi:10.3390/rs16101727.",
  "ICIMOD: “Sediment Management in the Koshi Basin.” Sediment Management in the Koshi Basin, ICIMOD, Dec. 2021, www.icimod.org/wp-content/uploads/2021/12/1200g_20211202_PB_SedimentManagementInTheKoshiBasin_AF.pdf. Accessed 15 Mar. 2025.",
];

export function SedimentFlux() {
  return (
    <ResearchLayout
      sourceFile="projects/research/sediment-flux-koshi.tsx"
      hero={
        <>
          <span className="rounded-full border border-accent-focus/40 bg-accent-focus/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-link">
            Research
          </span>
          <h1 className="mt-4 text-2xl font-semibold leading-snug text-text-body">
            Integrating Sediment Dynamics into Flood Risk Modeling in Koshi River Basin
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-text-muted">
            In many hydrological workflows, reliable sediment observations are sparse or uneven. This project tests
            whether satellite imagery can estimate SSC well enough to support more robust flood-risk modeling.
          </p>
          <p className="mt-4 text-[13px] text-text-muted">
            Presented at{" "}
            <a href={CONFERENCE} target="_blank" rel="noopener noreferrer" className="text-accent-link hover:underline">
              ASPRS Mid-South Region Conference 2026
            </a>
            .
          </p>
        </>
      }
    >
      <Section title="Project Context">
        <p>
          The Koshi River Basin is one of the most flood-prone regions in Nepal and northern India, with recurring flood
          events that cause major social and economic losses [1]. Existing flood-risk literature and workflows often
          emphasize static predictors such as elevation, slope, and drainage, but they do not consistently account for
          one critical dynamic factor in Koshi: sediment behavior [2]. This project was designed to complement those
          methods by testing whether satellite-only spectral information can estimate SSC reliably enough to support more
          robust flood-risk modeling.
        </p>
        <h3 className="pt-2 text-[14px] font-semibold text-text-body">Key Constraints</h3>
        <BulletList
          items={[
            "Event-driven sediment behavior in a steep Himalayan setting",
            "Limited usable scenes due to revisit timing and cloud cover",
            "Sensor differences (Landsat vs Sentinel) and resolution mismatch",
            "Cross-period transfer remains harder than within-period fitting",
          ]}
        />
      </Section>

      <Section title="Information & Methodology">
        <Block title="Data Source">
          <p>
            In-situ SSC observations were provided by the Department of Hydrology and Meteorology (DHM), Nepal. Satellite
            imagery was retrieved through Google Earth Engine using Landsat 5, Landsat 7, Landsat 8, Landsat 9, and
            Sentinel-2 collections.
          </p>
        </Block>
        <Block title="Data Inputs">
          <p>
            The SSC estimation workflow uses multispectral surface-reflectance bands from Landsat and Sentinel imagery:
            Blue, Green, Red, NIR, SWIR1, and SWIR2. These bands are chosen because suspended sediment alters visible/NIR
            reflectance patterns in water.
          </p>
        </Block>
        <Block title="Sensor Harmonization + Feature Space">
          <p>
            Landsat and Sentinel have different native characteristics and spatial resolution, so scenes are
            harmonized/resampled before modeling. We then build spectral feature sets (raw bands + engineered transforms)
            and compare model families across time periods.
          </p>
        </Block>
        <Block title="Aggregation and Mapping Logic">
          <p>
            In-situ SSC dates are paired with nearby satellite overpasses using a constrained lag window. For mapping,
            NDWI-first masking is used to isolate water-focused pixels before spatial SSC prediction.
          </p>
        </Block>
      </Section>

      <Section title="Results">
        <Block title="Best Model Performance by Time Period">
          <p>
            The strongest model behavior appears in 2009-2016, while transfer to other periods is weaker. This indicates
            period-sensitive learning behavior and supports using cross-period diagnostics instead of relying on one
            best-case score.
          </p>
        </Block>

        <Figure
          src="/projects/sediment/Fig6C_NOffsetSE_GroupedBars_HiRes.png"
          alt="Best model performance per time period"
          caption="Model-family comparison across time periods."
        />
        <Figure
          src="/projects/sediment/spatial_sscfig1.jpg"
          alt="Spatial SSC figure 1"
          caption="Spatial expansion check #1: NDWI-based masking identifies likely water pixels, then SSC is predicted spatially within that mask."
        />
        <Figure
          src="/projects/sediment/spatialsscfig2.jpg"
          alt="Spatial SSC figure 2"
          caption="Spatial expansion check #2: repeating the same workflow on another case verifies that predicted high-SSC zones remain physically plausible along active channel areas."
        />

        <Block title="Why Spatial Expansion Helps">
          <p>
            Point-based SSC values are useful for calibration, but they do not show spatial sediment structure. Expanding
            to NDWI-masked spatial prediction helps reveal where sediment concentration is likely elevated across the
            river corridor, which is more informative for flood-risk interpretation.
          </p>
        </Block>
        <Block title="Next Steps">
          <p>
            Address data scarcity by filling temporal and seasonal gaps with additional usable scenes, improve
            atmospheric correction robustness, and explore SAR-supported alternatives for cloud-heavy periods. The next
            phase focuses on improving cross-period transfer stability with better gap-filled training coverage.
          </p>
        </Block>
      </Section>

      <Section title="References">
        <ol className="ml-5 list-decimal space-y-2 text-[13px]">
          {references.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </Section>

      <Section title="Acknowledgements">
        <p>
          This work was supported by the Drapeau Center for Undergraduate Research (DCUR), University of Southern
          Mississippi (USM).
        </p>
        <p>
          The authors acknowledge HPC at The University of Southern Mississippi supported by the National Science
          Foundation under the Major Research Instrumentation (MRI) program via Grant #ACI 1626217.
        </p>
      </Section>
    </ResearchLayout>
  );
}

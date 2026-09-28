import type { Service } from "@/app/services/services-content";

/**
 * The one canonical origin. metadataBase, the sitemap, robots.txt and every
 * schema.org @id derive from it, so a domain move is a one-line change.
 */
export const SITE_URL = "https://workwithaj.ajautomate.co";

const PERSON_ID = `${SITE_URL}/#person`;
const BUSINESS_ID = `${SITE_URL}/#business`;

/**
 * Same name, title and profiles everywhere. AI engines resolve an entity by
 * matching these across sites, so they should match LinkedIn and GitHub too.
 */
const SAME_AS = [
  "https://www.linkedin.com/in/ajbactad29/",
  "https://github.com/systembuiltbyaj",
  "https://www.facebook.com/Ajbactad29/",
  "https://www.instagram.com/aj_automate.co/",
];

const KNOWS_ABOUT = [
  "GoHighLevel",
  "CRM architecture",
  "Marketing automation",
  "n8n",
  "Zapier",
  "Make",
  "Trigger.dev",
  "AI agents",
  "Retrieval-augmented generation (RAG)",
  "Claude",
  "Next.js",
  "TypeScript",
  "Supabase",
  "Stripe",
  "Business process automation",
];

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Allen Bactad",
        alternateName: ["AJ Bactad", "AJ"],
        jobTitle: "AI Automation & Business Systems Engineer",
        description:
          "Certified GoHighLevel Admin who builds CRM, automation and AI systems with GoHighLevel, n8n, Zapier, Trigger.dev, Next.js and Supabase. Former Head of Operations in Amazon eCommerce.",
        url: SITE_URL,
        image: `${SITE_URL}/aj-bactad-photo.webp`,
        sameAs: SAME_AS,
        knowsAbout: KNOWS_ABOUT,
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "HighLevel Certified Admin, Tier 3",
            credentialCategory: "certification",
            recognizedBy: { "@type": "Organization", name: "HighLevel" },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "HighLevel Automation Builder",
            credentialCategory: "certification",
            recognizedBy: { "@type": "Organization", name: "HighLevel" },
          },
        ],
        worksFor: { "@id": BUSINESS_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: "System Built by AJ",
        url: SITE_URL,
        logo: `${SITE_URL}/aj-logo.webp`,
        description:
          "CRM, automation and AI systems for coaches, agencies, consultants and service businesses: GoHighLevel builds, n8n and Zapier workflows, AI agents, and custom Next.js apps.",
        founder: { "@id": PERSON_ID },
        areaServed: "Worldwide",
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "System Built by AJ",
        url: SITE_URL,
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };
}

export function servicesGraph(services: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Services by System Built by AJ",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: `${service.subtitle} Includes: ${service.items.join("; ")}.`,
        provider: { "@id": BUSINESS_ID },
        areaServed: "Worldwide",
      },
    })),
  };
}

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Public client for read-only operations (no token)
export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
});

// Server-side client with token for draft/preview
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: 'published',
});

// Helper for generating image URLs
const builder = imageUrlBuilder(publicClient);

export function urlFor(source: Image) {
  return builder.image(source);
}

// GROQ query helpers
export async function getHero() {
  const query = `*[_type == "hero"][0] {
    _id,
    title,
    tagline,
    subtitle,
    ctaButton {
      text,
      link
    },
    videoBackgroundUrl,
    logo {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`;
  return await client.fetch(query);
}

export async function getTechStack() {
  const query = `*[_type == "techStack"] | order(order asc) {
    _id,
    name,
    description,
    category,
    order,
    logo {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`;
  return await client.fetch(query);
}

export async function getFAQs() {
  const query = `*[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }`;
  return await client.fetch(query);
}

export async function getAIFeatures() {
  const query = `*[_type == "aiFeature"] | order(order asc) {
    _id,
    title,
    description,
    demo,
    iconText,
    order
  }`;
  return await client.fetch(query);
}

export async function getComparison() {
  const query = `*[_type == "comparison"][0] {
    _id,
    sectionTitle,
    currentChallenges,
    solutions
  }`;
  return await client.fetch(query);
}

export async function getAdminDashboard() {
  const query = `*[_type == "adminDashboard"][0] {
    _id,
    sectionTitle,
    features,
    screenshots[] {
      asset-> {
        _id,
        url
      },
      caption
    }
  }`;
  return await client.fetch(query);
}

export async function getChatbotConfig() {
  const query = `*[_type == "chatbotConfig"][0] {
    _id,
    welcomeMessage,
    quickQuestions,
    enabled
  }`;
  return await client.fetch(query);
}

export async function getEncoreContact() {
  const query = `*[_type == "encoreContact"][0] {
    _id,
    companyName,
    contactPerson,
    email,
    phone,
    website,
    description,
    logo {
      asset-> {
        _id,
        url
      },
      alt
    }
  }`;
  return await client.fetch(query);
}

export async function getROICalculator() {
  const query = `*[_type == "roiCalculator"][0] {
    _id,
    fields[] {
      label,
      defaultValue,
      fieldType
    },
    calculationFormula,
    resultsDisplay
  }`;
  return await client.fetch(query);
}

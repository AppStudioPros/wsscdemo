/**
 * Sanity Data Seeding Script
 * Run this to populate Sanity with initial content from the existing app
 * 
 * Usage: node scripts/seed-sanity.js
 */

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const seedData = {
  hero: {
    _type: 'hero',
    title: 'WSSC Water: Next Generation Website',
    tagline: 'Delivering the Essential — Powered by AI',
    subtitle:
      'Experience the future of utility websites. A modern, intelligent, and customer-focused digital platform built with Next.js, React, AI, and PWA technology.',
    ctaButton: {
      text: 'Explore AI Features',
      link: '#ai-features',
    },
    videoBackgroundUrl:
      'https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/ylicgxa5_water.mp4',
  },

  comparison: {
    _type: 'comparison',
    sectionTitle: 'Transforming Customer Experience',
    currentChallenges: [
      'Separate portals create fragmented user experience',
      'Customers struggle to find information quickly',
      'Basic search misses user intent',
      'Call center overwhelmed with routine questions',
      'Manual content updates slow down communications',
      'No proactive alerts for usage anomalies',
      'Limited self-service capabilities',
    ],
    solutions: [
      'Unified experience: public site + customer portal + PWA',
      'AI-powered navigation understands what users need',
      'Intelligent search expands queries contextually',
      'AI chatbot deflects 30% of routine calls',
      'Instant content publishing via Sanity CMS',
      'AI detects usage spikes and suggests leak checks',
      'Complete self-service: billing, usage, requests, scheduling',
    ],
  },

  aiFeatures: [
    {
      _type: 'aiFeature',
      title: 'Intelligent Chatbot',
      description:
        'Available 24/7 to answer billing questions, explain usage spikes, guide permit applications, and escalate complex issues to human agents with full context.',
      demo:
        '"Why is my bill $50 higher this month?" → AI analyzes usage patterns, weather data, compares to history, suggests leak check, offers payment plan options.',
      iconText: 'search',
      order: 1,
    },
    {
      _type: 'aiFeature',
      title: 'AI-Enhanced Search',
      description:
        'Understands user intent beyond keywords. Expands "high bill" to billing disputes, leak detection, payment assistance, usage calculators, and conservation tips.',
      demo:
        'Search: "lead pipe" → Returns: testing programs, replacement schedules, health impacts, filter recommendations, grant programs.',
      iconText: 'magnifier',
      order: 2,
    },
    {
      _type: 'aiFeature',
      title: 'Personalized Insights',
      description:
        'Dashboard analyzes usage vs. similar households, flags anomalies, projects next bill, and delivers tailored conservation tips based on property type and season.',
      demo:
        '"Your usage is 15% below neighbors. Great job! Tip: Your irrigation uses 40% of water—consider smart timer to save $20/month."',
      iconText: 'chart',
      order: 3,
    },
    {
      _type: 'aiFeature',
      title: 'Auto-Generated Content',
      description:
        'AI drafts public-facing project updates from engineering data and summarizes 50-page commission minutes into key decisions for the public.',
      demo:
        'Project milestone reached → AI generates customer-friendly announcement emphasizing community benefits, timeline, and impact.',
      iconText: 'document',
      order: 4,
    },
    {
      _type: 'aiFeature',
      title: 'Contractor Wizard',
      description:
        'Conversational AI guides developers through complex permit requirements based on project type, size, and location—no more guessing.',
      demo:
        '"Building 3-story, 24-unit apartment" → AI outputs required permits, estimated fees ($8,500), timeline (6-8 weeks), and application links.',
      iconText: 'tool',
      order: 5,
    },
    {
      _type: 'aiFeature',
      title: 'Accessibility AI',
      description:
        'Auto-generates descriptive alt text for images, simplifies technical jargon to 8th-grade reading level, and ensures WCAG 2.1 AA compliance.',
      demo:
        'Technical doc: "Backflow prevention assemblage" → Plain language: "Device that stops contaminated water from flowing backward into clean supply."',
      iconText: 'accessibility',
      order: 6,
    },
  ],

  chatbotConfig: {
    _type: 'chatbotConfig',
    welcomeMessage:
      "Hi there! I'm your WSSC Water assistant. I'm here to help with billing questions, payment options, leaks, service issues, and more. What can I help you with today?",
    quickQuestions: [
      'Why is my bill so high?',
      'I need financial assistance',
      'I think I have a leak',
      'I have no water or low pressure',
      'Start or stop my service',
      'My water tastes or smells strange',
    ],
    enabled: true,
  },

  roiCalculator: {
    _type: 'roiCalculator',
    fields: [
      { label: 'Monthly Call Volume', defaultValue: 50000, fieldType: 'number' },
      { label: 'Average Handle Time (minutes)', defaultValue: 8, fieldType: 'number' },
      { label: 'Cost per Call ($)', defaultValue: 12, fieldType: 'currency' },
      { label: 'AI Deflection Rate (%)', defaultValue: 30, fieldType: 'percentage' },
    ],
    calculationFormula:
      'Annual Savings = (Monthly Call Volume × AI Deflection Rate × Cost per Call) × 12 months',
    resultsDisplay: [
      { label: 'Calls Deflected Monthly', format: 'number' },
      { label: 'Monthly Savings', format: 'currency' },
      { label: 'Annual Savings', format: 'currency' },
    ],
  },

  techStack: [
    { _type: 'techStack', name: 'Next.js 14', category: 'frontend', order: 1 },
    { _type: 'techStack', name: 'React', category: 'frontend', order: 2 },
    { _type: 'techStack', name: 'TypeScript', category: 'frontend', order: 3 },
    { _type: 'techStack', name: 'Tailwind CSS', category: 'frontend', order: 4 },
    { _type: 'techStack', name: 'FastAPI', category: 'backend', order: 5 },
    { _type: 'techStack', name: 'Python', category: 'backend', order: 6 },
    { _type: 'techStack', name: 'Sanity CMS', category: 'backend', order: 7 },
    { _type: 'techStack', name: 'MongoDB', category: 'database', order: 8 },
    { _type: 'techStack', name: 'Anthropic Claude', category: 'other', order: 9 },
    { _type: 'techStack', name: 'Vercel', category: 'infrastructure', order: 10 },
  ],

  encoreContact: {
    _type: 'encoreContact',
    companyName: 'Encore Services LLC',
    contactPerson: 'Contact Us',
    email: 'contact@encoreservices.com',
    phone: '(123) 456-7890',
    website: 'https://encoreservices.com',
    description:
      'Expert digital transformation services for government and enterprise clients. Specializing in AI-powered customer experience platforms.',
  },
};

async function seedSanity() {
  console.log('Starting Sanity data seeding...');

  try {
    // Seed Hero
    console.log('Creating hero section...');
    await client.create(seedData.hero);

    // Seed Comparison
    console.log('Creating comparison section...');
    await client.create(seedData.comparison);

    // Seed AI Features
    console.log('Creating AI features...');
    for (const feature of seedData.aiFeatures) {
      await client.create(feature);
    }

    // Seed Chatbot Config
    console.log('Creating chatbot configuration...');
    await client.create(seedData.chatbotConfig);

    // Seed ROI Calculator
    console.log('Creating ROI calculator...');
    await client.create(seedData.roiCalculator);

    // Seed Tech Stack
    console.log('Creating tech stack items...');
    for (const tech of seedData.techStack) {
      await client.create(tech);
    }

    // Seed Encore Contact
    console.log('Creating Encore contact info...');
    await client.create(seedData.encoreContact);

    console.log('✅ Sanity seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Log into Sanity Studio to upload images');
    console.log('2. Update content as needed');
    console.log('3. Test the Next.js application');
  } catch (error) {
    console.error('Error seeding Sanity:', error);
    process.exit(1);
  }
}

seedSanity();

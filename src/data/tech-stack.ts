export interface TechTool {
  name: string;
  category: "ai" | "automation" | "analytics" | "design" | "development" | "platform";
}

export const techStack: TechTool[] = [
  // AI & LLM
  { name: "Claude Code", category: "ai" },
  { name: "Anthropic API", category: "ai" },
  { name: "OpenAI", category: "ai" },
  { name: "Mistral AI", category: "ai" },
  { name: "Mixtral", category: "ai" },
  { name: "LoRA", category: "ai" },

  // Automation
  { name: "n8n", category: "automation" },
  { name: "Make.com", category: "automation" },
  { name: "WhatsApp Cloud API", category: "automation" },
  { name: "Zapier", category: "automation" },

  // Analytics & Marketing
  { name: "Google Analytics 4", category: "analytics" },
  { name: "Google Tag Manager", category: "analytics" },
  { name: "Meta Ads", category: "analytics" },
  { name: "Google Ads", category: "analytics" },
  { name: "ActiveCampaign", category: "analytics" },
  { name: "HubSpot", category: "analytics" },

  // Design
  { name: "Figma", category: "design" },
  { name: "Midjourney", category: "design" },
  { name: "Miro", category: "design" },

  // Development
  { name: "React", category: "development" },
  { name: "Next.js", category: "development" },
  { name: "TypeScript", category: "development" },
  { name: "Supabase", category: "development" },
  { name: "WordPress", category: "development" },
  { name: "Python", category: "development" },
  { name: "Node.js", category: "development" },

  // Platform
  { name: "Coolify", category: "platform" },
  { name: "Docker", category: "platform" },
  { name: "Vercel", category: "platform" },
];

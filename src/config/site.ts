export const siteConfig = {
  // Brand Configuration
  name: "Open Events Starter",
  shortName: "OpenEvents",
  description: "A beautifully minimal, production-ready ticketing platform",
  url: "https://openevents.dev",
  ogImage: "https://openevents.dev/og.jpg",

  // Custom Visual Assets
  logo: {
    dark: "/assets/logo-dark.svg",
    light: "/assets/logo-light.svg",
    icon: "/assets/logo-icon.svg"
  },

  // Legal & Logistical Information
  supportEmail: "support@openevents.dev",
  termsUrl: "https://openevents.dev/terms",
  privacyUrl: "https://openevents.dev/privacy",

  // Custom Metadata
  socialLinks: {
    twitter: "https://twitter.com/openevents",
    github: "https://github.com/yourusername/open-events",
    instagram: "https://instagram.com/openevents"
  }
};

export type SiteConfig = typeof siteConfig;

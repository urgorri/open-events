# THEMING.md

This document guides developers on how to rebrand, configure colors, customize typography, swap out assets, and adjust metadata inside any downstream fork of Open Events.

---

## 1. Zero-Code Customization (Configuration File)

To rebrand Open Events, you do not need to rewrite UI files or components. All dynamic visual strings and brand-specific properties are centralized in the site configuration file:

📁 **`src/config/site.ts`**

```typescript
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
```

Ensure components always read branding variables from `siteConfig` rather than hardcoding static strings (e.g., use `{siteConfig.name}` in place of `Open Events`).

---

## 2. Dynamic CSS Variables & Tailwind Integration

Open Events coordinates layout styling using Tailwind CSS custom variables. Theme variations are defined directly in the global CSS sheet using Tailwind's theme layer.

📁 **`src/app/globals.css`**

```css
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-card: var(--card);
}

:root {
  --background: oklch(100% 0 0);
  --foreground: oklch(14.5% 0 0);

  --primary: oklch(47.6% 0.198 256.4); /* Brand Blue/Indigo Default */
  --primary-foreground: oklch(100% 0 0);

  --secondary: oklch(96.7% 0 0);
  --muted: oklch(91.2% 0 0);
  --accent: oklch(52.4% 0.217 48.6);  /* Brand highlight (Orange) */
  --card: oklch(100% 0 0);

  --radius: 0.5rem;
}

.dark {
  --background: oklch(14.5% 0 0);
  --foreground: oklch(100% 0 0);

  --primary: oklch(65.4% 0.174 256.4);
  --primary-foreground: oklch(14.5% 0 0);

  --secondary: oklch(21% 0 0);
  --muted: oklch(28.7% 0 0);
  --card: oklch(17.2% 0 0);
}
```

To modify active brand colors, downstream forks simply update the OKLCH values inside this file. All component styles will dynamically compile the new color palette.

---

## 3. Customizing Typography

We leverage standard Next.js optimized fonts (`next/font`). Font pairings are configured in the layout shell:

📁 **`src/app/layout.tsx`**

```typescript
import { Inter, JetBrains_Mono } from "next/font/google";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sansFont.variable} ${monoFont.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

To use alternative font configurations, developers only need to import alternative Google Fonts inside the layout script.

---

## 4. Brand Asset Directory

To update raw image assets, replace the following vector files:
* **Logo (Dark Theme):** `/public/assets/logo-dark.svg`
* **Logo (Light Theme):** `/public/assets/logo-light.svg`
* **Favicon / Shortcut Icon:** `/public/favicon.ico`
* **Default OpenGraph (OG) Preview:** `/public/assets/og-preview.jpg`

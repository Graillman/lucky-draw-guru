import { useEffect } from "react";

interface PageSEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const BASE_URL = "https://realwheelpicker.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export function usePageSEO({ title, description, canonical, ogImage, jsonLd }: PageSEOConfig) {
  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    setMeta("description", description);

    // Canonical
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalEl) {
        canonicalEl = document.createElement("link");
        canonicalEl.rel = "canonical";
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.href = canonicalUrl;
    }

    // Open Graph
    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", canonicalUrl || BASE_URL);
    setMetaProperty("og:image", ogImage || DEFAULT_OG_IMAGE);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:site_name", "Real Wheel Picker");
    setMetaProperty("og:locale", "en_US");

    // Twitter
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage || DEFAULT_OG_IMAGE);

    // JSON-LD
    let scriptEl = document.querySelector<HTMLScriptElement>('script[data-seo-jsonld]');
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.type = "application/ld+json";
        scriptEl.setAttribute("data-seo-jsonld", "true");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    }

    return () => {
      // Cleanup dynamic JSON-LD on unmount
      const el = document.querySelector('script[data-seo-jsonld]');
      if (el) el.remove();
    };
  }, [title, description, canonical, ogImage, jsonLd]);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

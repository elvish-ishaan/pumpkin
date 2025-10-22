import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/auth", "/api/upload"],
    },
    sitemap: `${"https://pumpkin.dryink.space"}/sitemap.xml`,
    host: "https://pumpkin.dryink.space",
  };
}
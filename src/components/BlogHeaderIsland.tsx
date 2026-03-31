import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight, Clock } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  date: string;
}

interface BlogHeaderIslandProps {
  featured: Post;
  rest: Post[];
}

const TAG_COLORS: Record<string, string> = {
  Giveaways: "bg-purple-500/10 text-purple-400",
  Education: "bg-blue-500/10 text-blue-400",
  Teams: "bg-green-500/10 text-green-400",
  Tools: "bg-yellow-500/10 text-yellow-400",
  Ideas: "bg-pink-500/10 text-pink-400",
};

const BlogHeaderContent = ({ featured, rest }: BlogHeaderIslandProps) => {
  const { t } = useLanguage();

  const tagLabel = (tag: string): string => {
    const map: Record<string, string> = {
      Giveaways: t.blogTagGiveaways,
      Education: t.blogTagEducation,
      Teams: t.blogTagTeams,
      Tools: t.blogTagTools,
      Ideas: t.blogTagIdeas,
    };
    return map[tag] ?? tag;
  };

  return (
    <>
      <section className="text-center space-y-3">
        <h1 className="text-3xl md:text-5xl font-bold text-foreground">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.blogSubtitle}</p>
      </section>

      {/* Featured post */}
      <section>
        <a href={featured.slug} className="block bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary transition-colors space-y-4 group">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${TAG_COLORS[featured.tag] ?? ''}`}>{tagLabel(featured.tag)}</span>
            <span className="text-xs text-muted-foreground">{t.blogFeatured}</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{featured.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{featured.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
              <span>{featured.date}</span>
            </div>
            <span className="text-primary text-sm flex items-center gap-1">
              {t.blogReadGuide} <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </a>
      </section>

      {/* Post grid */}
      <section className="grid sm:grid-cols-2 gap-5">
        {rest.map((post) => (
          <a
            key={post.slug}
            href={post.slug}
            className="bg-card border border-border rounded-xl p-5 hover:border-primary transition-colors space-y-3 group flex flex-col"
          >
            <span className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${TAG_COLORS[post.tag] ?? ''}`}>{tagLabel(post.tag)}</span>
            <h2 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{post.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                <span>{post.date}</span>
              </div>
              <span className="text-xs text-primary flex items-center gap-1">{t.blogRead} <ArrowRight className="w-3 h-3" /></span>
            </div>
          </a>
        ))}
      </section>

      {/* Tools CTA */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold text-foreground text-center">{t.blogTryTools}</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { href: "/", label: "Spin the Wheel" },
            { href: "/giveaway-picker", label: "Giveaway Picker" },
            { href: "/classroom-picker", label: "Classroom Picker" },
            { href: "/team-generator", label: "Team Generator" },
            { href: "/instagram-giveaway-picker", label: "Instagram Picker" },
            { href: "/weighted-random-picker", label: "Weighted Picker" },
          ].map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors text-center flex items-center justify-center gap-1"
            >
              {tool.label} <ArrowRight className="w-3 h-3" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

const BlogHeaderIsland = ({ featured, rest }: BlogHeaderIslandProps) => (
  <LanguageProvider>
    <BlogHeaderContent featured={featured} rest={rest} />
  </LanguageProvider>
);

export default BlogHeaderIsland;

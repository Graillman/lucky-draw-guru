const ALL_POSTS = [
  { slug: "/blog/discord-giveaway-guide", title: "How to Pick a Winner on Discord" },
  { slug: "/blog/tiktok-giveaway-guide", title: "How to Run a TikTok Giveaway" },
  { slug: "/blog/how-to-run-instagram-giveaway", title: "How to Run an Instagram Giveaway" },
  { slug: "/blog/youtube-giveaway-guide", title: "How to Run a YouTube Giveaway" },
  { slug: "/blog/twitter-giveaway-guide", title: "How to Run a Twitter/X Giveaway" },
  { slug: "/blog/facebook-giveaway-guide", title: "How to Run a Facebook Giveaway" },
  { slug: "/blog/twitch-giveaway-guide", title: "How to Run a Twitch Giveaway" },
  { slug: "/blog/reddit-giveaway-guide", title: "How to Run a Reddit Giveaway" },
  { slug: "/blog/linkedin-giveaway-guide", title: "How to Run a LinkedIn Giveaway" },
  { slug: "/blog/snapchat-giveaway-guide", title: "How to Run a Snapchat Giveaway" },
  { slug: "/blog/secret-santa-guide", title: "How to Organize a Secret Santa" },
  { slug: "/blog/online-giveaway-guide", title: "How to Run an Online Giveaway" },
  { slug: "/blog/best-random-picker-tools", title: "Best Random Picker Tools" },
  { slug: "/blog/classroom-random-picker", title: "Random Picker for Classrooms" },
  { slug: "/blog/spin-wheel-ideas", title: "Creative Spin the Wheel Ideas" },
  { slug: "/blog/spin-wheel-team-generator", title: "How to Generate Teams with a Wheel" },
  { slug: "/blog/weighted-random-picker", title: "How to Use a Weighted Random Picker" },
];

interface RelatedPostsProps {
  currentSlug: string;
}

const RelatedPosts = ({ currentSlug }: RelatedPostsProps) => {
  const related = ALL_POSTS.filter((p) => p.slug !== currentSlug).slice(0, 3);
  return (
    <section className="p-6 rounded-xl border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Related Guides</h3>
      <div className="flex flex-col gap-3">
        {related.map((post) => (
          <a
            key={post.slug}
            href={post.slug}
            className="text-sm text-primary hover:underline"
          >
            {post.title} →
          </a>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;

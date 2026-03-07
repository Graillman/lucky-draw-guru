import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ContactFormIsland = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-xl p-6">
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground"
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          rows={5}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground resize-none"
          placeholder="Tell us what's on your mind..."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactFormIsland;

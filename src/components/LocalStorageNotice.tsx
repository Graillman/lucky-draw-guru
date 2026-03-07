import { Database } from "lucide-react";

interface LocalStorageNoticeProps {
  mode?: "simple" | "advanced";
}

const LocalStorageNotice = ({ mode = "simple" }: LocalStorageNoticeProps) => {
  const isAdvanced = mode === "advanced";

  return (
    <div className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs transition-colors duration-300 ${
      isAdvanced 
        ? "bg-accent/10 text-accent/80 border border-accent/20" 
        : "bg-primary/10 text-primary/80 border border-primary/20"
    }`}>
      <Database className="w-3 h-3" />
      <span>Your list is saved locally in your browser.</span>
    </div>
  );
};

export default LocalStorageNotice;

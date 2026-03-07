export const WHEEL_THEMES: Record<string, { label: string; preview: string; colors: string[] }> = {
  classic: {
    label: "Classic",
    preview: "#e53e3e",
    colors: [
      "hsl(348,83%,47%)", "hsl(45,100%,51%)", "hsl(210,80%,45%)", "hsl(145,63%,42%)",
      "hsl(25,95%,53%)", "hsl(280,68%,50%)", "hsl(190,90%,45%)", "hsl(340,75%,55%)",
      "hsl(160,60%,40%)", "hsl(35,100%,50%)", "hsl(220,70%,55%)", "hsl(0,75%,55%)",
    ],
  },
  candy: {
    label: "Candy",
    preview: "#f687b3",
    colors: [
      "hsl(330,100%,62%)", "hsl(300,100%,68%)", "hsl(270,100%,68%)", "hsl(315,100%,58%)",
      "hsl(345,100%,68%)", "hsl(285,100%,63%)", "hsl(255,100%,68%)", "hsl(0,100%,68%)",
      "hsl(320,90%,60%)", "hsl(280,85%,65%)",
    ],
  },
  ocean: {
    label: "Ocean",
    preview: "#3182ce",
    colors: [
      "hsl(200,100%,42%)", "hsl(180,100%,37%)", "hsl(220,80%,52%)", "hsl(160,80%,37%)",
      "hsl(240,70%,57%)", "hsl(195,90%,47%)", "hsl(170,85%,32%)", "hsl(210,90%,42%)",
      "hsl(190,95%,38%)", "hsl(230,75%,55%)",
    ],
  },
  fire: {
    label: "Fire",
    preview: "#dd6b20",
    colors: [
      "hsl(0,100%,48%)", "hsl(20,100%,48%)", "hsl(40,100%,48%)", "hsl(10,100%,43%)",
      "hsl(30,100%,53%)", "hsl(50,100%,48%)", "hsl(5,90%,52%)", "hsl(25,95%,43%)",
      "hsl(15,100%,45%)", "hsl(35,95%,50%)",
    ],
  },
  forest: {
    label: "Forest",
    preview: "#38a169",
    colors: [
      "hsl(120,50%,32%)", "hsl(80,60%,28%)", "hsl(140,55%,38%)", "hsl(100,45%,32%)",
      "hsl(60,50%,38%)", "hsl(30,60%,32%)", "hsl(160,45%,28%)", "hsl(40,55%,32%)",
      "hsl(110,55%,35%)", "hsl(70,50%,30%)",
    ],
  },
  sunset: {
    label: "Sunset",
    preview: "#805ad5",
    colors: [
      "hsl(280,80%,52%)", "hsl(320,85%,58%)", "hsl(350,90%,52%)", "hsl(30,100%,52%)",
      "hsl(260,75%,58%)", "hsl(310,80%,52%)", "hsl(15,90%,52%)", "hsl(300,75%,48%)",
      "hsl(340,85%,55%)", "hsl(20,95%,50%)",
    ],
  },
};

interface WheelThemePickerProps {
  selected: string;
  onChange: (theme: string) => void;
}

export function WheelThemePicker({ selected, onChange }: WheelThemePickerProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-muted-foreground font-medium">Wheel theme:</span>
      <div className="flex gap-2">
        {Object.entries(WHEEL_THEMES).map(([key, theme]) => (
          <button
            key={key}
            title={theme.label}
            onClick={() => onChange(key)}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
              selected === key ? "border-foreground scale-110 shadow-md" : "border-transparent"
            }`}
            style={{ background: theme.preview }}
          />
        ))}
      </div>
    </div>
  );
}

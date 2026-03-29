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
  neon: {
    label: "Neon",
    preview: "#00ff88",
    colors: [
      "hsl(150,100%,50%)", "hsl(180,100%,50%)", "hsl(120,100%,50%)", "hsl(60,100%,50%)",
      "hsl(300,100%,50%)", "hsl(240,100%,60%)", "hsl(30,100%,55%)", "hsl(330,100%,55%)",
      "hsl(90,100%,50%)", "hsl(210,100%,60%)",
    ],
  },
  gold: {
    label: "Gold",
    preview: "#c8960c",
    colors: [
      "hsl(43,100%,42%)", "hsl(30,60%,18%)", "hsl(46,100%,48%)", "hsl(28,55%,15%)",
      "hsl(44,100%,44%)", "hsl(32,58%,20%)", "hsl(48,100%,46%)", "hsl(26,52%,17%)",
      "hsl(42,100%,40%)", "hsl(34,60%,18%)",
    ],
  },
  pastel: {
    label: "Pastel",
    preview: "#fbb6ce",
    colors: [
      "hsl(350,100%,83%)", "hsl(280,80%,82%)", "hsl(200,90%,80%)", "hsl(140,70%,78%)",
      "hsl(40,100%,80%)", "hsl(320,80%,82%)", "hsl(170,70%,75%)", "hsl(60,90%,80%)",
      "hsl(260,70%,82%)", "hsl(20,100%,80%)",
    ],
  },
  galaxy: {
    label: "Galaxy",
    preview: "#6B46C1",
    colors: [
      "hsl(250,80%,25%)", "hsl(270,90%,30%)", "hsl(220,80%,28%)", "hsl(300,70%,32%)",
      "hsl(240,85%,35%)", "hsl(280,75%,28%)", "hsl(260,80%,30%)", "hsl(230,90%,32%)",
      "hsl(290,70%,30%)", "hsl(210,80%,30%)",
    ],
  },
  mono: {
    label: "B&W",
    preview: "#718096",
    colors: [
      "hsl(0,0%,20%)", "hsl(0,0%,65%)", "hsl(0,0%,30%)", "hsl(0,0%,75%)",
      "hsl(0,0%,40%)", "hsl(0,0%,85%)", "hsl(0,0%,50%)", "hsl(0,0%,55%)",
      "hsl(0,0%,35%)", "hsl(0,0%,70%)",
    ],
  },
  halloween: {
    label: "Halloween",
    preview: "#ff6a00",
    colors: [
      "hsl(24,100%,43%)", "hsl(0,0%,10%)", "hsl(28,100%,50%)", "hsl(270,60%,28%)",
      "hsl(22,100%,38%)", "hsl(0,0%,15%)", "hsl(30,100%,45%)", "hsl(260,65%,22%)",
      "hsl(20,100%,40%)", "hsl(275,55%,30%)",
    ],
  },
  christmas: {
    label: "Christmas",
    preview: "#c0392b",
    colors: [
      "hsl(355,80%,42%)", "hsl(142,60%,32%)", "hsl(44,100%,55%)", "hsl(350,85%,38%)",
      "hsl(138,65%,28%)", "hsl(42,100%,50%)", "hsl(358,75%,45%)", "hsl(145,58%,35%)",
      "hsl(40,100%,52%)", "hsl(352,80%,40%)",
    ],
  },
  cosmic: {
    label: "Cosmic",
    preview: "#7b2ff7",
    colors: [
      "hsl(260,90%,35%)", "hsl(290,100%,45%)", "hsl(220,100%,40%)", "hsl(180,100%,35%)",
      "hsl(310,90%,38%)", "hsl(240,100%,42%)", "hsl(200,100%,38%)", "hsl(280,95%,40%)",
      "hsl(330,90%,42%)", "hsl(250,100%,45%)",
    ],
  },
  tropical: {
    label: "Tropical",
    preview: "#00c897",
    colors: [
      "hsl(165,100%,38%)", "hsl(45,100%,55%)", "hsl(190,100%,42%)", "hsl(330,90%,52%)",
      "hsl(140,80%,40%)", "hsl(30,100%,55%)", "hsl(200,95%,45%)", "hsl(310,80%,50%)",
      "hsl(160,90%,38%)", "hsl(50,100%,50%)",
    ],
  },
  rose: {
    label: "Rose Gold",
    preview: "#e8a0a0",
    colors: [
      "hsl(350,60%,72%)", "hsl(15,65%,70%)", "hsl(330,55%,68%)", "hsl(5,60%,74%)",
      "hsl(340,58%,70%)", "hsl(20,62%,72%)", "hsl(345,55%,66%)", "hsl(10,58%,68%)",
      "hsl(355,62%,72%)", "hsl(25,60%,70%)",
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

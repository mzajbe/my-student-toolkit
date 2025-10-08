import { animate, stagger } from "animejs";

// ... rest of your code remains the same

const WaterDropGrid = () => {
  return (
    <div className="relative grid place-content-end  px-8 py-12">
      <DotGrid />
    </div>
  );
};

const GRID_WIDTH = 25;
const GRID_HEIGHT = 20;

const DotGrid = () => {
  const handleDotClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const index = Number((e.target as HTMLElement).dataset.index);
    if (isNaN(index)) return; // Prevent undefined click targets

    animate(".dot-point", {
      keyframes: [
        {
          scale: 1.35,
          translateY: -15,
          opacity: 1,
          easing: "easeOutSine",
          duration: 250,
        },
        {
          scale: 1,
          translateY: 0,
          opacity: 0.5,
          easing: "easeInOutQuad",
          duration: 500,
        },
      ],
      delay: stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: index,
      }),
    });
  };

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="group cursor-crosshair rounded-full p-2 transition-colors hover:bg-slate-600"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-700 to-slate-400 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      onClick={handleDotClick}
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="grid w-fit"
    >
      {dots}
    </div>
  );
};

export default WaterDropGrid;

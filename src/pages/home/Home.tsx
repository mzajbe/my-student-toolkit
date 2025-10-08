import MechanicalClock from "@/components/MechanicalClock";
import WaterDropGrid from "@/components/WaterDropGrid";

const Home = () => {
  return (
    <div className="relative ml-2">
      <h1 className="text-4xl ">Assalamu alaikum Zajbe</h1>
      <div className="flex gap-2">
        <p>(রাব্বি জিদনি ইলমা)</p>
        <p>ربِّ زِدْنِي عِلْماً</p>
      </div>

      <p className="text-sm dark:text-slate-400">
        My Lord, increase me in knowledge.
      </p>

      <div className="absolute top-0 right-0 z-10 transform translate-x-2 -translate-y-2">
        <MechanicalClock></MechanicalClock>
      </div>

      <div className="relative z-0">
        <WaterDropGrid></WaterDropGrid>
      </div>
    </div>
  );
};

export default Home;

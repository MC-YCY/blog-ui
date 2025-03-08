import { SparklesCore } from '@/components/ui/sparkles.tsx';

const sparkles = () => {
  return (
    <SparklesCore
      id="tsparticlesfullpage"
      background="transparent"
      minSize={0.6}
      maxSize={1.4}
      particleDensity={100}
      className="w-full h-full"
    />
  );
};
export default sparkles;
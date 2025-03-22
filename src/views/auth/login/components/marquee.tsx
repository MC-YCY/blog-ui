import { ScreenThreeDMarquee } from '@/components/ui/screen-3d-marquee.tsx';
import LoginHero1 from '@/assets/images/login-hero/1.png';
import LoginHero2 from '@/assets/images/login-hero/2.png';
import LoginHero3 from '@/assets/images/login-hero/3.png';
import LoginHero4 from '@/assets/images/login-hero/4.png';
import LoginHero5 from '@/assets/images/login-hero/5.png';
import LoginHero6 from '@/assets/images/login-hero/6.png';
import LoginHero7 from '@/assets/images/login-hero/7.png';
import LoginHero8 from '@/assets/images/login-hero/8.png';

export function ThreeDMarqueeDemo() {
  const images = [
    LoginHero1,
    LoginHero2,
    LoginHero3,
    LoginHero4,
    LoginHero5,
    LoginHero6,
    LoginHero7,
    LoginHero8,
    LoginHero1,
    LoginHero2,
    LoginHero3,
    LoginHero4,
    LoginHero5,
    LoginHero6,
    LoginHero7,
    LoginHero8,
    LoginHero1,
    LoginHero2,
    LoginHero3,
    LoginHero4,
    LoginHero5,
    LoginHero6,
    LoginHero7,
    LoginHero8,
  ];
  return (
    <div className="w-screen h-screen absolute top-0 left-0" >
      <ScreenThreeDMarquee images={images} />
    </div>
  );
}

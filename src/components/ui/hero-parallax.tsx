'use client'
import React from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'motion/react'
export const HeroParallax = ({
                               products,
                               children,
                               content,
                             }: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  children: React.ReactElement;
  content: React.ReactElement;
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 120, damping: 25, mass: 0.9 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]), // 调整范围，减少位移突兀感
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.4], [15, 0]), // 让角度变化更平滑
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [0.3, 1]), // 让淡入效果更平缓
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [10, 0]), // 旋转幅度减小，避免过度旋转
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-500, 400]), // 减小垂直位移范围，提升观感
    springConfig
  );

  return (
    <div className="py-40 overflow-hidden antialiased relative flex flex-col items-center">
      {children}
      <div ref={ref} className="flex flex-col items-center w-full">
        <motion.div
          style={{
            rotateX,
            rotateZ,
            translateY,
            opacity,
          }}
        >
          {/* 第一排卡片 */}
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
            {firstRow.map((product) => (
              <ProductCard product={product} translate={translateX} key={product.title} />
            ))}
          </motion.div>

          {/* 第二排卡片 */}
          <motion.div className="flex flex-row mb-20 space-x-20">
            {secondRow.map((product) => (
              <ProductCard product={product} translate={translateXReverse} key={product.title} />
            ))}
          </motion.div>

          {/* 第三排卡片 */}
          <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
            {thirdRow.map((product) => (
              <ProductCard product={product} translate={translateX} key={product.title} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 确保额外内容紧随卡片显示 */}
      <div className="mt-[740px] w-screen">
        {content}
      </div>

    </div>
  );
};


export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> development studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  )
}

export const ProductCard = ({
                              product,
                              translate,
                            }: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a
        href={product.link}
        target="_blank"
        className="block group-hover/product:shadow-2xl "
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  )
}

import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect.tsx'

const TextWords = () => {
  const words1 = [
    {
      text: '时间轮回,',
      className: 'text-blue-500',
    },
    {
      text: '一年又一年,',
      className: 'text-purple-500',
    },
    {
      text: '你还在想着新技术出来了,',
      className: 'text-pink-500',
    },
  ]

  const words2 = [
    {
      text: '继续学习什么TypeScript,',
      className: 'text-green-500',
    },
    {
      text: '什么Vite,',
      className: 'text-yellow-500',
    },
    {
      text: '什么Tailwind CSS.',
      className: 'text-red-500',
    },
  ]

  const words3 = [
    {
      text: '而你身边的人,',
      className: 'text-indigo-500',
    },
    {
      text: '在考虑啥时候买第二套房子,',
      className: 'text-teal-500',
    },
    {
      text: '什么时候生二胎,',
      className: 'text-rose-500',
    },
  ]

  const words4 = [
    {
      text: '你还在捣鼓你的破代码.',
      className: 'text-gray-500 dark:text-gray-400',
    },
  ]
  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words1} delayIndex={0} />
      <TypewriterEffectSmooth words={words2} delayIndex={1} />
      <TypewriterEffectSmooth words={words3} delayIndex={2} />
      <TypewriterEffectSmooth words={words4} delayIndex={3} />
    </div>
  )
}
export default TextWords
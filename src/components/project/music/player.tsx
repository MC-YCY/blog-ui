import style from './music.module.css'
import { cn } from '@/lib/utils.ts'
import { HTMLProps, useState, useRef, MouseEvent, useEffect } from 'react'
import TDLLBanner from '@/assets/music/天地龙鳞.png'
import TDLLMp3 from '@/assets/music/天地龙鳞.mp3'
import ACBanner from '@/assets/music/爱错.png'
import AcMp3 from '@/assets/music/爱错.mp3'
import {
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconPlayerPause,
  IconPlayerPlay
} from '@tabler/icons-react'
import { PlayerLyrics } from '@/components/project/music/player-lyrics.tsx'

interface Props extends HTMLProps<HTMLDivElement> {
}

const musicList = [
  {
    rawLyrics: `[00:00.000]爱错 - 王力宏 (Leehom Wang)
[00:04.900]词：王力宏/崔惟楷
[00:09.810]曲：王力宏
[00:14.720]北风毫不留情
[00:18.730]把叶子吹落
[00:21.129]脆弱的她选择了逃脱
[00:27.602]叶子失去消息
[00:30.219]风才感觉寂寞
[00:36.396]整个冬天 北风的痛没人能说
[00:46.094]我从来没想过我会这样做
[00:52.895]从来没爱过所以爱错
[00:59.467]我从哪里起飞
[01:02.896]从哪里降落
[01:06.026]多少不能原谅的错
[01:09.555]却不能重来过
[01:20.155]翻开回忆角落完美的生活
[01:26.715]以为幸福都可以掌握
[01:33.235]仔细回味当初那个故事背后
[01:42.055]Oh 原来是我 原来是我
[01:45.785]犯下从没承认的错
[01:51.875]我从来没想过我会这样做
[01:58.585]从来没爱过所以爱错
[02:04.844]我从哪里起飞从哪里降落
[02:11.814]多少不能原谅的错
[02:15.104]却不能重来过
[02:23.014]在这少了你的世界 Oh
[02:29.694]找不回那些感觉
[02:34.283]其实我不想道别那些过去
[02:44.213]我从来没想过我会这样做
[02:51.283]从来没爱过所以爱错
[02:55.983]从来没有爱过那么认真
[02:58.123]我从哪里起飞
[03:00.863]从哪里降落
[03:04.452]多少不能原谅的错
[03:07.702]却不能重
[03:10.262]我从来没想过我会这样做
[03:17.601]从来没爱过所以爱错
[03:24.001]我从哪里起飞
[03:27.341]从哪里降落
[03:30.731]多少不能原谅的错
[03:34.071]请你原谅我的爱错`,
    name: '爱错',
    singer: '王力宏',
    banner: ACBanner,
    music: AcMp3,
  },
  {
    rawLyrics: `
[00:00.000]天地龙鳞 - 王力宏
[00:00.567]词：方文山
[00:00.675]曲：王力宏
[00:18.833]这江山我起笔 民族血脉又几万里
[00:26.451]几世纪六百年里
[00:30.269]龙的传人历经风雨
[00:33.878]这京畿中轴地 一如君子气节不移
[00:41.484]九龙壁瓦上琉璃
[00:45.140]历史从这衰落又崛起
[00:48.969]这龙鳞却曾经 铿锵落地犹如碎冰
[00:56.433]一片鳞一寸心 故事飘摇我不忍听
[01:03.967]人守礼心守静 悠扬古琴弹君子心
[01:11.382]我清醒等回音 盘旋泱泱华夏文明
[01:20.917]敬过去我落笔 东方辽阔的黄土地
[01:28.276]山水里泼墨抹去
[01:31.950]只见嶙峋华夏骨气
[01:35.793]紫禁城神武门
[01:39.587]多少沧桑铸造中华魂
[01:43.305]我继承文化深耕
[01:47.008]突破变局去扭转乾坤
[01:52.698]这龙鳞却曾经 铿锵落地犹如碎冰
[02:00.129]一片鳞一寸心 以小成其大我坚信
[02:07.694]将民族的命运 昂首抬起再次复兴
[02:15.112]游天地寻龙鳞 龙的血脉蔚然成林
[02:37.714]这龙鳞却曾经 铿锵落地犹如碎冰
[02:45.188]一片鳞一寸心 故事飘摇我不忍听
[02:52.661]将民族的命运 昂首抬起再次复兴
[03:00.136]游天地寻龙鳞 龙的血脉蔚然成林
[03:16.000]
`,
    name: '天地龙鳞',
    singer: '王力宏',
    banner: TDLLBanner,
    music: TDLLMp3,
  },
]

export const MusicPlayer = ({ className }: Props) => {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [play, setPlay] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentMusic = musicList[currentIndex]

  // 切换播放状态
  const clickPlayer = () => {
    setPlay((prev) => !prev)
  }

  // 播放状态改变时，播放或暂停
  useEffect(() => {
    if (!audio.current) return
    play
      ? audio.current.play().catch(console.error)
      : audio.current.pause()
  }, [play])

  // 每次切换音乐时重设 audio.src 和播放状态
  useEffect(() => {
    if (!audio.current) return
    audio.current.src = currentMusic.music
    audio.current.load()
    if (play) {
      audio.current.play().catch(console.error)
    }
  }, [currentIndex])

  // 播放完自动播放下一首
  const handleEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % musicList.length)
  }

  const clickPrev = (e: MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + musicList.length) % musicList.length)
  }

  const clickNext = (e: MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % musicList.length)
  }

  return (
    <>
      <audio
        ref={audio}
        onEnded={handleEnded}
        loop={false}
        preload="auto"
      />
      <div className={cn(style.player, className, play ? style.play : '')}>
        <div className={style.music}>
          <div className={style.musicInfo} onClick={clickPlayer}>
            <div className={style.musicBanner}>
              <img src={currentMusic.banner} alt="" />
            </div>
            <span className={style.musicName}>
              {currentMusic.name} - {currentMusic.singer}
            </span>
          </div>
          <div className={style.musicController}>
            <div className={style.musicControllerActions}>
              <span onClick={clickPrev}>
                <IconChevronLeftPipe color="#fff" width={20} height={20} />
              </span>
              <span onClick={clickPlayer}>
                {play ? (
                  <IconPlayerPause color="#fff" width={20} height={20} />
                ) : (
                  <IconPlayerPlay color="#fff" width={20} height={20} />
                )}
              </span>
              <span onClick={clickNext}>
                <IconChevronRightPipe color="#fff" width={20} height={20} />
              </span>
            </div>
            <div className={style.musicControllerWord}>
              <PlayerLyrics lyrics={currentMusic.rawLyrics} audio={audio.current} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
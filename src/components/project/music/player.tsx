import style from './music.module.css'
import { cn } from '@/lib/utils.ts'
import { HTMLProps, useState, useRef, MouseEvent, useEffect } from 'react'
import TDLLBanner from '@/assets/music/天地龙鳞.png'
import TDLLMp3 from '@/assets/music/天地龙鳞.mp3'
import {
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconPlayerPause,
} from '@tabler/icons-react'
import { PlayerLyrics } from '@/components/project/music/player-lyrics.tsx'

interface Props extends HTMLProps<HTMLDivElement> {
}

// 你后续可替换这里的歌词内容
const rawLyrics = `
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
`

export const MusicPlayer = ({ className }: Props) => {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [play, setPlay] = useState(false)

  const clickPlayer = () => {
    setPlay((prev) => !prev)
  }

  useEffect(() => {
    if (!audio.current) return
    play
      ? audio.current.play().catch(console.error)
      : audio.current.pause()
  }, [play])

  const clickPrev = (e: MouseEvent) => e.stopPropagation()
  const clickNext = (e: MouseEvent) => e.stopPropagation()

  return (
    <>
      <audio src={TDLLMp3} ref={audio} loop={true}></audio>
      <div className={cn(style.player, className, play ? style.play : '')}>
        <div className={style.music}>
          <div className={style.musicInfo} onClick={clickPlayer}>
            <div className={style.musicBanner}>
              <img src={TDLLBanner} alt="" />
            </div>
            <span className={style.musicName}>天地龙鳞-王力宏</span>
          </div>
          <div className={style.musicController}>
            <div className={style.musicControllerActions}>
              <span onClick={clickPrev}>
                <IconChevronLeftPipe color={'#fff'} width={20} height={20} />
              </span>
              <span onClick={clickPlayer}>
                <IconPlayerPause color={'#fff'} width={20} height={20} />
              </span>
              <span onClick={clickNext}>
                <IconChevronRightPipe color={'#fff'} width={20} height={20} />
              </span>
            </div>
            <div className={style.musicControllerWord}>
              <PlayerLyrics lyrics={rawLyrics} audio={audio.current}></PlayerLyrics>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
import style from './music.module.css'
import { cn } from '@/lib/utils.ts'
import { HTMLProps, useState, useRef, MouseEvent, useEffect } from 'react'
import {
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconPlayerPause,
  IconPlayerPlay,
} from '@tabler/icons-react'
import { PlayerLyrics } from '@/components/project/music/player-lyrics.tsx'
import { MusicConstType } from '@/constant/music-const.ts'

interface Props extends HTMLProps<HTMLDivElement> {
  musicList:MusicConstType[]
}

export const MusicPlayer = ({ className,musicList }: Props) => {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [play, setPlay] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState('0%')

  const currentMusic = musicList[currentIndex]

  const clickPlayer = () => {
    setPlay((prev) => !prev)
  }

  // 播放 / 暂停控制
  useEffect(() => {
    if (!audio.current) return
    play
      ? audio.current.play().catch(console.error)
      : audio.current.pause()
  }, [play])

  // 切歌时更新音频
  useEffect(() => {
    if (!audio.current) return
    audio.current.src = currentMusic.music
    audio.current.load()
    if (play) {
      audio.current.play().catch(console.error)
    }
  }, [currentIndex])

  // 更新播放进度
  useEffect(() => {
    const el = audio.current
    if (!el) return

    const handleTimeUpdate = () => {
      const percent = el.duration
        ? `${(el.currentTime / el.duration) * 100}%`
        : '0%'
      setProgress(percent)
    }

    el.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      el.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [currentIndex])

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
      <div
        className={cn(style.player, className, play ? style.play : '')}
        style={{ '--play-progress-value': progress } as React.CSSProperties}
      >
        <div className={style.music}>
          <div className={style.musicInfo} onClick={clickPlayer}>
            <div className={style.musicBanner}>
              <img src={currentMusic.banner} alt="" />
            </div>
            <span className={style.musicName}
                  style={{ 'width': (currentMusic.name.length + currentMusic.singer.length + 1) + 'em' }}>
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
import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './player-lyrics.module.css';

type LyricLine = {
  time: number; // 秒
  text: string;
};

function parseLrc(lrc: string): LyricLine[] {
  return lrc
    .split('\n')
    .map((line) => {
      const match = line.match(/\[(\d+):(\d+\.\d+)](.*)/);
      if (!match) return null;
      const [, min, sec, text] = match;
      return {
        time: parseInt(min) * 60 + parseFloat(sec),
        text: text.trim(),
      };
    })
    .filter((item): item is LyricLine => !!item);
}

export const PlayerLyrics = ({ lyrics, audio }: { lyrics: string; audio: HTMLAudioElement | null }) => {
  const [lyricsList, setLyricsList] = useState<LyricLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const prevIndexRef = useRef(0);
  const textRefs = useRef<HTMLSpanElement[]>([]);

  // 解析歌词
  useEffect(() => {
    setLyricsList(parseLrc(lyrics));
  }, [lyrics]);

  // 监听音频播放进度
  useEffect(() => {
    if (!audio || lyricsList.length === 0) return;

    const updateLyrics = () => {
      const currentTime = audio.currentTime;

      // 找到当前播放的歌词行
      let newIndex = 0;
      for (let i = 0; i < lyricsList.length; i++) {
        if (lyricsList[i].time <= currentTime) {
          newIndex = i;
        } else {
          break;
        }
      }

      // 检查歌词行切换是否需要跳过动画
      if (newIndex !== prevIndexRef.current) {
        // 计算当前行与下一行的时间间隔
        const currentLine = lyricsList[newIndex];
        const nextLine = lyricsList[newIndex + 1];
        const gap = nextLine ? nextLine.time - currentLine.time : 1;

        // 如果时间间隔小于0.3秒，跳过动画
        setSkipAnimation(gap < 0.3);
        prevIndexRef.current = newIndex;
      }

      setCurrentIndex(newIndex);

      // 计算当前行进度
      if (lyricsList[newIndex]) {
        const currentLine = lyricsList[newIndex];
        const nextLine = lyricsList[newIndex + 1];

        if (nextLine) {
          const lineDuration = nextLine.time - currentLine.time;
          const elapsed = currentTime - currentLine.time;
          setProgress(Math.min(elapsed / lineDuration, 1));
        } else {
          setProgress(1);
        }
      }
    };

    audio.addEventListener('timeupdate', updateLyrics);
    return () => audio.removeEventListener('timeupdate', updateLyrics);
  }, [audio, lyricsList]);

  // 获取显示的歌词行（当前行和下一行）
  const visibleLyrics = lyricsList
    .slice(currentIndex, currentIndex + 2)
    .map((line, index) => ({
      ...line,
      index: currentIndex + index,
      position: index // 0 = 当前行, 1 = 下一行
    }));

  // 计算长歌词的滚动位置（添加提前量）
  const calculateScrollPosition = useCallback((index: number) => {
    if (!textRefs.current[index]) return 0;

    const textElement = textRefs.current[index];
    const textWidth = textElement.scrollWidth;
    const containerWidth = 150; // 容器宽度

    // 如果文本宽度小于容器宽度，不需要滚动
    if (textWidth <= containerWidth) return 0;

    // 根据进度计算滚动位置（添加提前量）
    const maxScroll = textWidth - containerWidth;

    // 添加提前量：当进度达到70%时，已经滚动到80%的位置
    const adjustedProgress = progress < 0.7
      ? progress * (0.8 / 0.7)
      : 0.8 + (progress - 0.7) * (0.2 / 0.3);

    return -adjustedProgress * maxScroll;
  }, [progress]);

  return (
    <div className={style.container}>
      <AnimatePresence initial={false} mode="wait">
        {visibleLyrics.map((line) => {
          const isCurrentLine = line.position === 0;

          // 短间隔时不滚动（跳过动画）
          const shouldScroll = isCurrentLine && !skipAnimation;
          const scrollX = shouldScroll ? calculateScrollPosition(line.index) : 0;

          return (
            <motion.div
              key={`${line.time}-${line.position}`}
              className={`${style.lyricLine} ${isCurrentLine ? style.currentLine : style.nextLine}`}
              style={{ top: line.position * 18 }}
              initial={{
                y: skipAnimation ? 0 : (isCurrentLine ? 18 : -18),
                opacity: skipAnimation ? 1 : 0,
                filter: skipAnimation ? (isCurrentLine ? 'blur(0px)' : 'blur(2px)') : 'blur(4px)'
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: isCurrentLine ? 'blur(0px)' : 'blur(2px)'
              }}
              exit={{
                y: skipAnimation ? 0 : -18,
                opacity: skipAnimation ? 0 : 0,
              }}
              transition={{
                duration: skipAnimation ? 0 : 0.3,
                ease: "easeOut"
              }}
            >
              {/* 歌词文本容器 */}
              <div className={style.textContainer}>
                {/* 背景文本（完整歌词） */}
                <motion.span
                  ref={(el) => {
                    if (el) textRefs.current[line.index] = el;
                  }}
                  className={style.fullText}
                  animate={{ x: scrollX }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                  {line.text}
                </motion.span>

                {/* 前景文本（进度蒙版） */}
                {isCurrentLine && (
                  <motion.span
                    className={style.progressText}
                    animate={{
                      width: `${progress * 100}%`,
                      x: scrollX
                    }}
                    transition={{
                      width: { duration: 0.1 },
                      x: { type: 'spring', damping: 20, stiffness: 300 }
                    }}
                  >
                    {line.text}
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
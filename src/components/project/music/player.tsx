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
[00:00.783]编曲：唐达
[00:00.891]制作人：王力宏
[00:01.053]录音：王力宏
[00:01.188]混音：Mick Guzauski
[00:01.296]录音室：西东音乐 北京
[00:01.539]混音室：宏声音乐 台北
[00:01.782]特别鸣谢：西东音乐（王力宏工作室）
[00:02.160]首席运营官：杨文杰
[00:02.376]执行：王勇
[00:02.484]宣传：陈静/刘思琪
[00:02.700]花絮拍摄：文子洋/薛承旭
[00:02.997]助理：袁兵强
[00:03.132]妆发：李晓莹
[00:03.267]服装：“龙的传人”国潮品牌
[00:03.537]摄影：MAGIA
[00:03.618]制作协力：刘希艾
[00:03.807]制作协力：刘凤琴
[00:03.996]主题歌音乐专辑工作团队
[00:04.293]出品人：钱实穆
[00:04.455]总监制：徐毅
[00:04.590]监制：胡译友/吴志勇
[00:04.833]项目策划：朴林西思文化传媒
[00:05.157]总策划：张洋
[00:05.292]音乐总监：苟璘
[00:05.454]制作统筹：高溪丰
[00:05.643]音乐版权顾问：刘靖
[00:05.859]翻译：卢佳
[00:05.967]创意顾问：袁嘉骏
[00:06.156]平面摄影师：温璐
[00:06.345]海报设计团队：本真工作室：李贞（海报设计总监）/段冰洋/王世婷/林恩
[00:07.155]平面设计：包凡彬
[00:07.344]宣传物料及黑胶设计：周禹颉
[00:07.668]MV团队：
[00:07.749]总导演：张晓晨
[00:07.911]导演：孙峥/窦琨淇/张天明/张彬
[00:08.316]制片：张红昭/陈涛
[00:08.532]摄影指导：王春波/娄诞
[00:08.802]灯光师：尹娜威
[00:08.964]道具师：张磊
[00:09.099]剪辑：郑菲/宋文阳
[00:09.315]调色：罗梦舟
[00:09.450]合成：陈海涛/郝伟晋/沈诗翔/张立/李波/马福斌/郭倩倩/岳先贺
[00:10.287]承制：北京龙生堂文化传媒有限公司
[00:10.692]音乐发行：太合麦田
[00:10.908]项目总统筹：闫曼嘉
[00:11.124]项目/艺人统筹：李艺佳/李靖
[00:11.475]项目/艺人协力：张靓琳/肖晰美（实习）/陈尧天（实习）
[00:12.069]制作总监：蔡庭贵
[00:12.258]策略行销：武鹏
[00:12.420]视觉统筹：赵宏韬
[00:12.609]平面设计：张雯/夏马尾
[00:12.879]媒介：小美/肖琄/陈梦麟/张鹏远/罗茜/太阳/高仪/梁倩玉/赵天一/勘琦/成梓琪/陈婷
[00:14.013]运营：耿长春/曹瑞/张齐宪/谢思聪/王子龙/洪子斌/赵媛媛
[00:14.769]宣传营销：
[00:14.877]北京很有可能文化传播有限公司：
[00:15.255]金朝顺/沈雨娟/张倩玉/夏童/田贝贝/汪斯遥/丁敏
[00:15.930]资产管理：杨柳
[00:16.092]出品：北京广播电视台/故宫博物院/太合音乐集团
[00:16.686]联合出品：朴林西思文化传媒/微博
[00:17.091]协办单位：北京国际音乐产业大会
[00:17.469]技术支持：杜比实验室
[00:17.712]宣发合作伙伴：新浪娱乐/微博音乐/新浪音乐
[00:18.252]独家短视频平台：抖音
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
      <audio src={TDLLMp3} ref={audio}></audio>
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
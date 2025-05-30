'use client';

import {PartTitle} from "@/components/project/part-title/part-title";
import {Container} from "@/components/project/container";
import { Swiper, SwiperSlide } from 'swiper/react'
import {Scrollbar} from "swiper/modules";
import {PictureType} from "@/types/picture";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    PictureSwiperItemContent,
    PicturePreview,
} from '@/components/pages/picture/picture'

import LinQiTingA from '@/assets/images/演员/林琦婷/group-a-1.jpeg';
import LinQiTingB from '@/assets/images/演员/林琦婷/group-a-2.jpeg';
import LinQiTingC from '@/assets/images/演员/林琦婷/group-b-1.jpeg';
import LinQiTingAthumbnail from '@/assets/images/演员/林琦婷/thumbnail/group-a-1.jpeg';
import LinQiTingBthumbnail from '@/assets/images/演员/林琦婷/thumbnail/group-a-2.jpeg';
import LinQiTingCthumbnail from '@/assets/images/演员/林琦婷/thumbnail/group-a-3.jpeg';

import MaQiuYuanA from '@/assets/images/演员/马秋元/group-a-1.png'
import MaQiuYuanD from '@/assets/images/演员/马秋元/group-b-1.png'
import MaQiuYuanE from '@/assets/images/演员/马秋元/group-b-2.png'
import MaQiuYuanAthumbnail from '@/assets/images/演员/马秋元/thumbnail/group-a-1.png'
import MaQiuYuanDthumbnail from '@/assets/images/演员/马秋元/thumbnail/group-b-1.png'
import MaQiuYuanEthumbnail from '@/assets/images/演员/马秋元/thumbnail/group-b-2.png'

import LiShengXuanA from '@/assets/images/演员/黎晟萱/group-a-3.jpg'
import LiShengXuanB from '@/assets/images/演员/黎晟萱/group-a-2.jpg'
import LiShengXuanC from '@/assets/images/演员/黎晟萱/group-a-1.jpg'
import LiShengXuanAthumbnail from '@/assets/images/演员/黎晟萱/thumbnail/group-a-3.jpg'
import LiShengXuanBthumbnail from '@/assets/images/演员/黎晟萱/thumbnail/group-a-2.jpg'
import LiShengXuanCthumbnail from '@/assets/images/演员/黎晟萱/thumbnail/group-a-1.jpg'

import XingNuanC from '@/assets/images/演员/邢暖/mmexport1748234645762.jpeg'
import XingNuanG from '@/assets/images/演员/邢暖/mmexport1748234647097.jpeg'
import XingNuanN from '@/assets/images/演员/邢暖/mmexport1748234648802.jpeg'
import XingNuanCthumbnail from '@/assets/images/演员/邢暖/thumbnail/mmexport1748234645762.jpeg'
import XingNuanGthumbnail from '@/assets/images/演员/邢暖/thumbnail/mmexport1748234647097.jpeg'
import XingNuanNthumbnail from '@/assets/images/演员/邢暖/thumbnail/mmexport1748234648802.jpeg'

const PictureSwiper = ({setPreview}: { setPreview: (arg0: PictureType) => void }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const onSlideChange = (swiper: { activeIndex: number }) => {
        setActiveIndex(swiper.activeIndex);
    }
    const setStates = (state: PictureType) => {
        setPreview(state)
    }
    const [list] = useState<PictureType[]>([
        {
            name: '林琦婷（琦琦小霸王🧸）',
            tip: '是简简单单的欣赏',
            describe: `演员 林琦婷 努力加油 尽力而为
新剧：《穿成女配后 公主她不伺候了》姜玥 《开局遇到高冷校花》叶弥月 《归期未有期》颜朝舞《我的电子女友咋修成剑仙》李清然 《学姐我的心被你偷啦》苏白粥《锦绣繁华》谢静姝《偷听有戏》林清寒《悔不当初》柳如烟《年下弟弟又野又凶》林夕 《我家宝匣通古今 女帝认我做老公》独孤月 《订婚被抛弃 我转身娶了京圈大小姐》凌若潇 《听见你的声音》程清禾 《步步沉沦》林知夏`,
            date: new Date(),
            url: LinQiTingA,
            children: [
                {
                    name: '林琦婷（琦琦小霸王🧸）',
                    tip: '是简简单单的欣赏',
                    describe: `演员 林琦婷 努力加油 尽力而为
新剧：《穿成女配后 公主她不伺候了》姜玥 《开局遇到高冷校花》叶弥月 《归期未有期》颜朝舞《我的电子女友咋修成剑仙》李清然 《学姐我的心被你偷啦》苏白粥《锦绣繁华》谢静姝《偷听有戏》林清寒《悔不当初》柳如烟《年下弟弟又野又凶》林夕 《我家宝匣通古今 女帝认我做老公》独孤月 《订婚被抛弃 我转身娶了京圈大小姐》凌若潇 《听见你的声音》程清禾 《步步沉沦》林知夏`,
                    date: '2025/5/22',
                    url: LinQiTingA,
                    thumbnail:LinQiTingAthumbnail
                },
                {
                    name: '林琦婷（琦琦小霸王🧸）',
                    tip: '是简简单单的欣赏',
                    describe: `演员 林琦婷 努力加油 尽力而为
新剧：《穿成女配后 公主她不伺候了》姜玥 《开局遇到高冷校花》叶弥月 《归期未有期》颜朝舞《我的电子女友咋修成剑仙》李清然 《学姐我的心被你偷啦》苏白粥《锦绣繁华》谢静姝《偷听有戏》林清寒《悔不当初》柳如烟《年下弟弟又野又凶》林夕 《我家宝匣通古今 女帝认我做老公》独孤月 《订婚被抛弃 我转身娶了京圈大小姐》凌若潇 《听见你的声音》程清禾 《步步沉沦》林知夏`,
                    date: '2025/5/22',
                    url: LinQiTingB,
                    thumbnail:LinQiTingBthumbnail
                },
                {
                    name: '林琦婷（琦琦小霸王🧸）',
                    tip: '是简简单单的欣赏',
                    describe: `演员 林琦婷 努力加油 尽力而为
新剧：《穿成女配后 公主她不伺候了》姜玥 《开局遇到高冷校花》叶弥月 《归期未有期》颜朝舞《我的电子女友咋修成剑仙》李清然 《学姐我的心被你偷啦》苏白粥《锦绣繁华》谢静姝《偷听有戏》林清寒《悔不当初》柳如烟《年下弟弟又野又凶》林夕 《我家宝匣通古今 女帝认我做老公》独孤月 《订婚被抛弃 我转身娶了京圈大小姐》凌若潇 《听见你的声音》程清禾 《步步沉沦》林知夏`,
                    date: '2025/5/22',
                    url: LinQiTingC,
                    thumbnail:LinQiTingCthumbnail
                },
            ]
        },
        {
            name: '马秋元',
            tip: '是简简单单的欣赏',
            describe: '2022年底，马秋元拍摄短剧《小魔女秋元》正式踏入娱乐圈。2023年3月份参演首部古装剧集《回到古代当太子》，随后陆续拍摄《洛泱公主》、《一不小心撩错人》、《重生后我成了皇叔的心尖宠》、《少帅天天求复合》、《白月光攻略手册》、《合约期间爱上她》、《落花时节又逢君》、《清宫辞》、《桃花马上请长缨》等多部影视作品。2024年9月搭档杨泽出演古装甜宠剧《春宵》。',
            date: '2025/5/22',
            url: MaQiuYuanA,
            children: [
                {
                    name: '马秋元',
                    tip: '是简简单单的欣赏',
                    describe: '2022年底，马秋元拍摄短剧《小魔女秋元》正式踏入娱乐圈。2023年3月份参演首部古装剧集《回到古代当太子》，随后陆续拍摄《洛泱公主》、《一不小心撩错人》、《重生后我成了皇叔的心尖宠》、《少帅天天求复合》、《白月光攻略手册》、《合约期间爱上她》、《落花时节又逢君》、《清宫辞》、《桃花马上请长缨》等多部影视作品。2024年9月搭档杨泽出演古装甜宠剧《春宵》。',
                    date: '2025/5/22',
                    url: MaQiuYuanA,
                    thumbnail: MaQiuYuanAthumbnail
                },
                {
                    name: '马秋元',
                    tip: '是简简单单的欣赏',
                    describe: '2022年底，马秋元拍摄短剧《小魔女秋元》正式踏入娱乐圈。2023年3月份参演首部古装剧集《回到古代当太子》，随后陆续拍摄《洛泱公主》、《一不小心撩错人》、《重生后我成了皇叔的心尖宠》、《少帅天天求复合》、《白月光攻略手册》、《合约期间爱上她》、《落花时节又逢君》、《清宫辞》、《桃花马上请长缨》等多部影视作品。2024年9月搭档杨泽出演古装甜宠剧《春宵》。',
                    date: '2025/5/22',
                    url: MaQiuYuanD,
                    thumbnail: MaQiuYuanDthumbnail
                },
                {
                    name: '马秋元',
                    tip: '是简简单单的欣赏',
                    describe: '2022年底，马秋元拍摄短剧《小魔女秋元》正式踏入娱乐圈。2023年3月份参演首部古装剧集《回到古代当太子》，随后陆续拍摄《洛泱公主》、《一不小心撩错人》、《重生后我成了皇叔的心尖宠》、《少帅天天求复合》、《白月光攻略手册》、《合约期间爱上她》、《落花时节又逢君》、《清宫辞》、《桃花马上请长缨》等多部影视作品。2024年9月搭档杨泽出演古装甜宠剧《春宵》。',
                    date: '2025/5/22',
                    url: MaQiuYuanE,
                    thumbnail: MaQiuYuanEthumbnail
                },
            ]
        },
        {
            name: '黎晟萱',
            tip: '是简简单单的欣赏',
            describe: '一个理科生（应该算正在努力当演员）的养成系演员！短剧《开局女帝盯上了我的彩礼》《练气3000层，开局收女帝为徒》《犹为离人照落花》《厉总，江秘书她离职了》《你竟然是我的前妻》《爱上你的心脏》《上岸吧人鱼殿下》《婚姻的温度》《肥妻逆袭，冷酷厂长追疯了》《原谅他99次》《沈总，你养的金丝雀变凤凰了》《丑妃倾天下：禁欲王爷宠疯了》',
            date: '2025/5/22',
            url: LiShengXuanA,
            children: [
                {
                    name: '黎晟萱',
                    tip: '是简简单单的欣赏',
                    describe: '一个理科生（应该算正在努力当演员）的养成系演员！短剧《开局女帝盯上了我的彩礼》《练气3000层，开局收女帝为徒》《犹为离人照落花》《厉总，江秘书她离职了》《你竟然是我的前妻》《爱上你的心脏》《上岸吧人鱼殿下》《婚姻的温度》《肥妻逆袭，冷酷厂长追疯了》《原谅他99次》《沈总，你养的金丝雀变凤凰了》《丑妃倾天下：禁欲王爷宠疯了》',
                    date: '2025/5/22',
                    url: LiShengXuanA,
                    thumbnail:LiShengXuanAthumbnail
                },
                {
                    name: '黎晟萱',
                    tip: '是简简单单的欣赏',
                    describe: '一个理科生（应该算正在努力当演员）的养成系演员！短剧《开局女帝盯上了我的彩礼》《练气3000层，开局收女帝为徒》《犹为离人照落花》《厉总，江秘书她离职了》《你竟然是我的前妻》《爱上你的心脏》《上岸吧人鱼殿下》《婚姻的温度》《肥妻逆袭，冷酷厂长追疯了》《原谅他99次》《沈总，你养的金丝雀变凤凰了》《丑妃倾天下：禁欲王爷宠疯了》',
                    date: '2025/5/22',
                    url: LiShengXuanB,
                    thumbnail:LiShengXuanBthumbnail
                },
                {
                    name: '黎晟萱',
                    tip: '是简简单单的欣赏',
                    describe: '一个理科生（应该算正在努力当演员）的养成系演员！短剧《开局女帝盯上了我的彩礼》《练气3000层，开局收女帝为徒》《犹为离人照落花》《厉总，江秘书她离职了》《你竟然是我的前妻》《爱上你的心脏》《上岸吧人鱼殿下》《婚姻的温度》《肥妻逆袭，冷酷厂长追疯了》《原谅他99次》《沈总，你养的金丝雀变凤凰了》《丑妃倾天下：禁欲王爷宠疯了》',
                    date: '2025/5/22',
                    url: LiShengXuanC,
                    thumbnail:LiShengXuanCthumbnail
                },
            ]
        },
        {
            name: '邢暖',
            tip: '是简简单单的欣赏',
            describe: '',
            date: '2025/5/26',
            url: XingNuanC,
            children: [
                {
                    name: '邢暖',
                    tip: '是简简单单的欣赏',
                    describe: '',
                    date: '2025/5/26',
                    url: XingNuanC,
                    thumbnail: XingNuanCthumbnail
                },
                {
                    name: '邢暖',
                    tip: '是简简单单的欣赏',
                    describe: '',
                    date: '2025/5/26',
                    url: XingNuanG,
                    thumbnail: XingNuanGthumbnail
                },
                {
                    name: '邢暖',
                    tip: '是简简单单的欣赏',
                    describe: '',
                    date: '2025/5/26',
                    url: XingNuanN,
                    thumbnail: XingNuanNthumbnail
                },
            ]
        }
    ]);
    return <div
        className={'w-full h-full'}>
        <Swiper
            onSlideChange={(swiper) => onSlideChange(swiper)}
            className={'w-full h-full'}
            scrollbar={{
                hide: false,
                horizontalClass: 'custom-swiper-scrollbar',
            }}
            modules={[Scrollbar]}>
            {
                list.map((item, index) => {
                    return <SwiperSlide key={item.url}>
                        <PictureSwiperItemContent activeIndex={activeIndex}
                                                  showOptions={true}
                                                  slideIndex={index}
                                                  setStates={(state) => setStates(state)} {...item}></PictureSwiperItemContent>
                    </SwiperSlide>
                })
            }
        </Swiper>
    </div>
}

export const HomePicture = () => {
    const navigate = useNavigate()
    const goPicture = () => {
        navigate('/picture');
    }
    const [previewState, setPreviewState] = useState<PictureType>({
        name: '',
        tip: '',
        describe: '',
        date: '',
        url: '',
    });
    return <Container>
        <PartTitle title={'一些"小藏品"'} description={'信我都是在群里收藏的，我想你们知道我是个收藏仔...'} action={
            <div className={'w-[36px]'}>
                <PicturePreview {...previewState}></PicturePreview>
            </div>
        }></PartTitle>
        <div className={'w-full flex mt-3 xl:mt-6 select-none'}>
            <div
                className={'w-full h-[76vh] max-h-[768px] bg-background shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,.1)] rounded-[14px] overflow-hidden'}>
                <PictureSwiper setPreview={(state) => setPreviewState(state)}></PictureSwiper>
            </div>
        </div>
        <div className={'flex justify-center mt-[20px]'}>
            <div onClick={goPicture}
                 className={'cursor-pointer opacity-55 w-[120px] h-[36px] flex justify-center items-center text-foreground border-[1px] border-foreground rounded-[36px] text-[14px]'}>查看更多
            </div>
        </div>
    </Container>
}
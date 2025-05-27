import {DiaryType} from "@/types/diary";
import {useEffect, useState} from "react";
import {
    IconSquareRoundedChevronLeftFilled,
    IconSquareRoundedChevronRightFilled,
    IconSunFilled
} from "@tabler/icons-react";
import {cn} from "@/lib/utils";
import {Diary} from "@/components/project/diary/diary";
import dayjs from "dayjs";

export const DiaryDateList = ({date, onClick}: { date: Date, onClick: (arg0: DiaryType) => void }) => {
    const [selected, setSelected] = useState<DiaryType['id']>();
    const [list] = useState<DiaryType[]>([
        {
            id: '1',
            title: '春秋半夏',
            date: date,
            weather: <IconSunFilled width={24} height={24} color={'#ecca2f'}/>,
            content: '这天的风很平静...'
        },
        {
            id: '2',
            title: '访客-浪迹天涯',
            date: date,
            weather: <IconSunFilled width={24} height={24} color={'#ecca2f'}/>,
            content: '你也想飞起来吗...'
        },
        {
            id: '3',
            title: '访客-18岁少女被38岁大汉强教react',
            date: date,
            weather: <IconSunFilled width={24} height={24} color={'#ecca2f'}/>,
            content: '你也不想男朋友知道你学前端吧...'
        }
    ]);
    useEffect(() => {
        onItemClick(list[0])
    }, [date]);
    const onItemClick = (item: DiaryType) => {
        setSelected(item.id);
        onClick(item);
    }
    return <>
        {
            list.map((item, index) => {
                let itemClassName = '';
                if (index >= 1) {
                    itemClassName += 'mt-6'
                }
                let selectedClassName = '';
                if (item.id === selected) {
                    selectedClassName += 'shadow-[0_0_4px_rgba(153,133,210,1)]! dark:shadow-[0_0_4px_rgba(13,224,252,.3)]!'
                }
                return <div key={item.id} className={cn('w-full select-none cursor-pointer', itemClassName)}
                            onClick={() => onItemClick(item)}>
                    <Diary
                        className1={cn('min-h-[40px] px-2! py-4!', selectedClassName)}
                        className2={cn('min-h-[40px]', selectedClassName)}
                        className3={'min-h-[40px]'}
                        title={item.title}
                        date={dayjs(item.date).format('YYYY年MM月DD日')}
                        weather={item.weather}
                        content={item.content}></Diary>
                </div>
            })
        }
        <div className={'flex justify-around mt-6 pb-[12px] w-full'}>
            <IconSquareRoundedChevronLeftFilled width={36} height={36}
                                                className={'cursor-pointer'}></IconSquareRoundedChevronLeftFilled>
            <IconSquareRoundedChevronRightFilled width={36} height={36}
                                                 className={'cursor-pointer'}></IconSquareRoundedChevronRightFilled>
        </div>
    </>
}
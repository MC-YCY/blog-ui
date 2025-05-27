import {useEffect, useRef, useState} from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {SpanButton} from "@/components/ui/button";
import {Diary} from "@/components/project/diary/diary";
import dayjs from "dayjs";
import {IconSunFilled} from "@tabler/icons-react";

export const DiaryWriteButton = ({date, username, onSubmit}: {
    date: Date,
    username?: string,
    onSubmit?: (arg0: string) => void
}) => {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // 自动调整高度
    useEffect(() => {
        if (textareaRef.current) {
            // 先重置高度，再计算新的高度
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);
    const onClickSubmit = () => {
        if (onSubmit) {
            onSubmit(value);
        }
    }
    return <Drawer>
        <DrawerTrigger>
            <SpanButton onClick={() => setValue('')}>写点什么...</SpanButton>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Hi，开始你的记录吧。</DrawerTitle>
                <div className={'mt-6'}>
                    <Diary
                        className1={'min-h-[300px]'}
                        className2={'min-h-[300px]'}
                        className3={'min-h-[300px]'}
                        title={username ?? '春秋半夏'}
                        date={dayjs(date).format('YYYY年MM月DD日')}
                        weather={<IconSunFilled width={24} height={24} color={'#ecca2f'}/>}
                        content={<textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            rows={1}
                            className={'resize-none w-full outline-none'}
                            placeholder={'写点什么呢...'}
                        />}></Diary>
                </div>
            </DrawerHeader>
            <DrawerFooter>
                <DrawerClose>
                    <SpanButton onClick={onClickSubmit}>确定</SpanButton>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
}
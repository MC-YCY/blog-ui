'use client';

import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState,} from 'react';
import styles from "./styles/calendar.module.css";
import {
    CalendarProps,
    dateTableCell,
    dateTableRow,
    dateTableType,
    defaultProps,
    refMethods
} from './types';
import {getDateTable} from './composition/dateToTable';
import CalendarRow from './calendar.row';
import CalendarWeek from './calendar.week';
import {deepClone} from "./tools/deepClone";

export const Calendar = forwardRef<refMethods, CalendarProps>((props, ref) => {
    const [DayList, setDayList] = useState<dateTableType>([]);
    const [selected, setSelected] = useState<number>();
    const [tableHeight, setTableHeight] = useState<number>(0);
    const [open, setOpen] = useState<boolean>();
    const setDate = (prop: CalendarProps) => {
        const {data, selected: sel} = getDateTable(prop);
        setSelected(sel);
        setDayList(data);
        setTableHeight((props.cellHeight ? props.cellHeight : defaultProps.cellHeight) * data.length);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        props.onChange && props.onChange(prop, data);
    }
    useEffect(() => {
        setDate(props);
        setOpen(props.open);
    }, [props, props.date, props.open]);
    useImperativeHandle(ref, () => ({
        dateTable: DayList,
    }));
    const setStyleCellHeight = (): Record<string, string | null | number> => {
        let cellH: string | null;
        if ('open' in props) {
            if (props.cellHeight) cellH = props.cellHeight + 'px';
            else cellH = defaultProps.cellHeight + 'px';
        } else {
            cellH = null;
        }

        let tableH: string | null;
        let hideTableH: string | null;
        if (cellH) {
            tableH = (parseFloat(cellH) * DayList.length) + 'px';
            hideTableH = -parseFloat(cellH) * (DayList.length - 1) + 'px';
        } else {
            tableH = null;
            hideTableH = null;
        }

        return {
            '--cellHeight': cellH,
            '--tableHeight': tableH,
            '--hideTableHeight': hideTableH,
            '--rows-len': DayList.length
        }
    }
    const [isDown, setIsDown] = useState<boolean>(false);
    const [mouseEvent, setMouseEvent] = useState<{
        startY: number,
        moveY: number,
        endY: number,
    }>({
        startY: 0,
        moveY: 0,
        endY: 0,
    });
    const [moveNum, setMoveNum] = useState(0);
    const [clearTransition, setClearTransition] = useState(false);
    const calendarTable = useRef<HTMLDivElement>(null);
    const calendarLayer = useRef<HTMLDivElement>(null);
    const mouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!props.openEvent) return;
        if (!('open' in props)) return;
        setIsDown(true);
        setMoveNum(0);
        mouseEvent.startY = event.clientY;
        mouseEvent.moveY = 0;
        setMouseEvent(deepClone(mouseEvent));
        setClearTransition(false);
    }
    const mouseUp = (_: React.MouseEvent, record: dateTableCell) => {
        if (!props.openEvent) {
            if(props.onClick instanceof Function){
                props.onClick(record);
            }
            return;
        }
        setIsDown(false);
        mouseEvent.endY = _.clientY;
        mouseEvent.moveY = 0;
        setMouseEvent(deepClone(mouseEvent));
        if (moveNum < 5) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            props.onClick && props.onClick(record);
        } else {
            if (!props.cellHeight) return;
            if (!calendarTable.current) return;
            if (!calendarLayer.current) return;
            const dif = mouseEvent.startY - mouseEvent.endY;
            if (dif > props.cellHeight) {
                setOpen(false);
                calendarLayer.current.style.setProperty('--top', 'var(--hideTableHeight)');
                calendarLayer.current.style.setProperty('--height', 'var(--cellHeight)');
            } else {
                setOpen(true);
                calendarLayer.current.style.setProperty('--top', '0');
                calendarLayer.current.style.setProperty('--height', 'var(--tableHeight)');
            }
            if (open != null) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                props.onToggle && props.onToggle(open);
            }
        }
        setClearTransition(false);
    }
    const mouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!props.openEvent) return;
        if (!isDown) return;
        setMoveNum(moveNum + 1);
        if (moveNum > 5) {
            setClearTransition(true);
            if (!props.cellHeight) return;
            if (!calendarTable.current) return;
            if (!calendarLayer.current) return;

            let offsetY = event.clientY - mouseEvent.startY;
            const dif = event.clientY - mouseEvent.startY;

            if (open) {
                // 滑动中如果已经到最顶部就让toggle(visible)为true收起状态
                if (offsetY < -(tableHeight - props.cellHeight)) {
                    offsetY = -(tableHeight - props.cellHeight);
                    setOpen(false)
                }
                if (dif > 0) {
                    offsetY = 0;
                }
            } else {
                if (dif < 0) {
                    offsetY = 0;
                }
                offsetY = -(tableHeight - props.cellHeight - offsetY);
                let calendarLayerHeight = (tableHeight + offsetY)
                if (calendarLayerHeight > tableHeight) {
                    calendarLayerHeight = tableHeight;
                    setOpen(true)
                }
                calendarLayer.current.style.setProperty('--height', calendarLayerHeight + 'px');
            }

            const minY = -tableHeight;
            const maxY = 0;
            offsetY = Math.max(minY, Math.min(offsetY, maxY));

            mouseEvent.moveY = offsetY;
            setMouseEvent(deepClone(mouseEvent));

            calendarLayer.current.style.setProperty('--top', offsetY + 'px');
            calendarLayer.current.style.setProperty('--height', tableHeight + offsetY + 'px');
        }
    }
    const propsOpenToClassName = () => {
        if ('open' in props) {
            const openClassName = `${open ? styles.open : styles.close}`;
            return `${styles.calendarLayer} ${clearTransition ? '' : openClassName} ${styles.toggle}`
        } else {
            return `${styles.calendarLayer}`
        }
    }
    return <div className={styles.calendar}>
        <CalendarWeek firstDayOfWeek={props.firstDayOfWeek} customWeek={props.customWeek}></CalendarWeek>
        <div className={propsOpenToClassName()} style={setStyleCellHeight()} ref={calendarLayer}>
            <div className={styles.calendarTable} ref={calendarTable}>
                {
                    DayList.map((row: dateTableRow, index: number) => {
                        return <CalendarRow
                            mouseDown={mouseDown}
                            mouseMove={mouseMove}
                            mouseUp={mouseUp}
                            key={'calendar-row' + index} rowIndex={index} selected={selected} list={row}
                            customDay={props.customDay}></CalendarRow>
                    })
                }
            </div>
        </div>
    </div>
})
Calendar.displayName = 'Calendar';
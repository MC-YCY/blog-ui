import {FC, JSX} from 'react';
import {CalendarRowProps,dateTableCell} from './types';
import styles from './styles/calendar.module.css';

const renderCell = (record:dateTableCell,customDay:CalendarRowProps['customDay']):JSX.Element =>{
    const today = new Date();
    const ty = today.getFullYear();
    const tm = today.getMonth();
    const td = today.getDate();
    if(customDay) return customDay(record);
    let className: string = `${styles.calendarRowCellRect} `;
    if(record.status !== 1){
        className += styles.calendarRowCellNoMonth
    }else{
        className += styles.calendarRowCellMonth
    }
    if(record.active){
        className += ` ${styles.calendarRowCellActive}`;
    }
    if(ty === record.year && tm === record.month && td === record.day){
        className+= ` ${styles.calendarRowCellToday}`;
    }
    return <div className={className}>
        {record.day}
    </div>
}

const CalendarRow:FC<CalendarRowProps> = (props) =>{
    const setClassName = () =>{
        if(props.selected === props.rowIndex+1){
            return `${styles.calendarRow} ${styles.calendarRowOpen}`;
        }else{
            return styles.calendarRow;
        }
    }
    return <div className={setClassName()}>
        {
            props.list.map((record:dateTableCell,index:number)=>{
                return <div
                    onMouseDown={(event)=>props.mouseDown(event,record,props,index)}
                    onMouseMove={(event)=>props.mouseMove(event,record,props,index)}
                    onMouseUp={(event)=>props.mouseUp(event,record,props,index)}
                    key={index} className={styles.calendarRowCell}>
                    {renderCell(record,props.customDay)}
                </div>
            })
        }
    </div>
}
export default CalendarRow;

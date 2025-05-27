export const getDays = (year: number): number[] => {
    let leapYearOfDay: number = 0;
    if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
        leapYearOfDay = 1;
    } else {
        leapYearOfDay = 0;
    }
    return [31, 28 + leapYearOfDay, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

export const weekLabelToIndex: Record<string, number> = {
    '一': 0,
    '二': 1,
    '三': 2,
    '四': 3,
    '五': 4,
    '六': 5,
    '日': 6,
}
export const weekIndexToLabel: Record<string, string> = {
    '0': '一',
    '1': '二',
    '2': '三',
    '3': '四',
    '4': '五',
    '5': '六',
    '6': '日',
}

export interface weekDataItemType {
    label: string,
    weekIndex: number
}

export type weekDataType = weekDataItemType[];
export const getWeekData = (firstDayOfWeek: number): weekDataType => {
    const weeks: weekDataType = [];
    while(weeks.length < 7) {
        const key = firstDayOfWeek - 1;
        const label = weekIndexToLabel[key];
        const weekIndex = weekLabelToIndex[label];
        const weeksItem: weekDataItemType = {
            label,
            weekIndex
        }
        weeks.push(weeksItem)
        firstDayOfWeek++;
        if(firstDayOfWeek > 7) firstDayOfWeek = 1;
    }
    return weeks;
}

export interface dateTableCell {
    dateStr: string,
    day: number,
    month: number,
    year: number,
    active: boolean,
    status: number,
    task?: Record<string, string | null | number> | null
}

export type dateTableRow = dateTableCell[];
export type dateTableType = dateTableRow[];

export interface dateTableResult {
    selected: number,
    data: dateTableType,
}

export type refMethods = {
    dateTable: dateTableType,
}

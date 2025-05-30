import {ReactNode} from "react";

export interface CreateDiaryDto {
  username: string;
  content: string;
}

export interface GetDiariesDto {
  date: string; // ISO格式日期字符串 (YYYY-MM-DD)
  page?: number;
  limit?: number;
}

export interface Diary {
  id: number;
  username: string;
  content: string;
  date: Date | string;
}

export interface DiaryType{
  id?:string,
  title:string,
  date:string | Date,
  weather:string | ReactNode,
  content:string | ReactNode,
}
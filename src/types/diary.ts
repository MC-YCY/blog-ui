import {ReactNode} from "react";

export interface DiaryType{
  id?:string,
  title:string,
  date:string | Date,
  weather:string | ReactNode,
  content:string | ReactNode,
}
export interface CodeSegmentItem {
  title:string
  description:string
  code:{
    language:string,
    filename:string,
    content:string,
  } | {
    language:string,
    filename:string,
    content:string,
  }[]
}
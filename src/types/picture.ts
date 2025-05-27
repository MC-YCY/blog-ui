export interface PictureType {
    name: string;
    tip: string;
    describe: string;
    date: Date | string;
    url: string;
    children?: PictureType[];
}
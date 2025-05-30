export interface PictureType {
    name: string;
    tip: string;
    describe: string;
    date: Date | string;
    url: string;
    thumbnail?: string;
    children?: PictureType[];
}
export class Photo {
    id: number;
    albums: any[];
    base64ThumbnailPhoto: string;
    base64SrcPhoto: string;
    filePath: string;
    thumbnailFilePath: string;
    description: string;
    created: Date;
    updated: Date;
    title: string;
    // type: string;
    selected: boolean;
    file: File;
}
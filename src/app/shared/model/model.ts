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
    isPublic: boolean;
    // type: string;
    selected: boolean;
    file: File;
}

export class Album {
    id: number;
    title: string;
    description: string;
    previewPhotos: Photo[];
    photoIds: number[];
    created: Date;
    updated: Date;
}

export class Pageable {
    size: number;
    page: number;
    //sort
}
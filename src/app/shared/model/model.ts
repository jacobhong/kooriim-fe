export class Photo {
    id: number;
    albums: any[];
    base64OriginalImage: string;
    base64ThumbnailImage: string;
    base64CompressedImage: string;
    compressedImageFilePath: string;
    originalImageFilePath: string;
    thumbnailFilePath: string;
    description: string;
    created: Date;
    updated: Date;
    title: string;
    isPublic: boolean;
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
}
import { SafeResourceUrl } from "@angular/platform-browser";

export class Photo {
    id: number;
    albums: any[];
    videoSrc: SafeResourceUrl;
    base64OriginalImage: string;
    base64ThumbnailImage: string;
    base64CompressedImage: string;
    compressedImageFilePath: string;
    originalImageFilePath: string;
    thumbnailFilePath: string;
    videoFilePath: string;
    description: string;
    originalDate: Date;
    created: Date;
    updated: Date;
    title: string;
    mediaType: string;
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
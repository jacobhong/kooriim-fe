import { SafeResourceUrl } from "@angular/platform-browser";

export class Photo {
    id: number;
    mediaItemMetaData: MediaItemMetaData;
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
    created: Date;
    updated: Date;
    title: string;
    mediaType: string;
    isPublic: boolean;
    selected: boolean;
    file: File;
}

export class MediaItemMetaData {
    cameraMake: string;
    cameraModel: string;
    focalLength: number;
    apertureFNumber: number;
    isoEquivalent: number;
    exposureTime: number;
    creationTime: Date;
    width: number;
    height: number;
    fps: number;
}
export class Album {
    id: number;
    title: string;
    description: string;
    previewMediaItems: Photo[];
    photoIds: number[];
    created: Date;
    updated: Date;
}

export class Pageable {
    size: number;
    page: number;
}
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
    originalDate: Date;
    created: Date;
    updated: Date;
    title: string;
    mediaType: string;
    isPublic: boolean;
    selected: boolean;
    file: File;
}

export class MediaItemMetaData {
    id: number;
    mediaItemId: number;
    cameraMake: string;
    cameraModel: string;
    focalLength: number;
    apertureFNumber: number;
    isoEquivalent: number;
    exposureTime: number;
    width: number;
    height: number;
    fps: number;
    contrast: string;
    digitalZoomRatio: number;
    exposureCompensation: number;
    exposureMode: string;
    exposureProgram: string;
    lensModel: string;
    meteringMode: string;
    saturation: string;
    sceneCaptureType: string;
    sharpness: string;
    whiteBalance: string;
    createdDate: Date;
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
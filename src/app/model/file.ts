export class Photo {
    id: number;
    albums: any[];
    content: ArrayBuffer;
    filePath: string;
    description: string;
    created: Date;
    updated: Date;
    title: string;
    // type: string;
    selected: boolean;
    file: File;
}
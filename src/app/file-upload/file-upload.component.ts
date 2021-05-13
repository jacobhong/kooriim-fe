import { MediaItemMetaData } from './../shared/model/model';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../shared/keycloak/keycloak.service';
import exifr from 'exifr' // => exifr/dist/full.umd.cjs
import { PhotoServiceComponent } from '../photo/photo-service/photo-service.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  files: File[] = [];
  public res: { [key: string]: any };

  constructor(private keyCloak: KeycloakService,
    private photoService: PhotoServiceComponent,) {

  }

  onAddedFile(event) {
    console.log('added');
  }
  onAddedFiles(event) {
    console.log('added');
  }
  onUploadSuccess(event) {
    console.log('success');
    console.log(event);
    // get response and create metadata
    const file: Blob = event[0];
    exifr.parse(event[0])
      .then(output => {
        console.log(output);
        let metadata = new MediaItemMetaData();
        metadata.mediaItemId = event[1].id;
        metadata.cameraMake = output.Make;
        metadata.cameraModel = output.Model;
        metadata.contrast = output.Contrast;
        metadata.createdDate = output.CreateDate;
        metadata.digitalZoomRatio = output.DigitalZoomRatio;
        metadata.exposureCompensation = output.ExposureCompensation;
        metadata.exposureMode = output.ExposureMode;
        metadata.exposureTime = output.ExposureTime;
        metadata.exposureProgram = output.ExposureProgram;
        metadata.flash = output.Flash;
        metadata.focalLength = output.FocalLength;
        // metadata.fps = 
        metadata.height = output.ExifImageHeight;
        metadata.width = output.ExifImageWidth;
        metadata.isoEquivalent = output.ISO;
        // metadata.lensInfo = output.LensInfo;
        metadata.lensModel = output.LensModel;
        metadata.meteringMode = output.MeteringMode;
        metadata.saturation = output.Saturation;
        metadata.sceneCaptureType = output.SceneCaptureType;
        metadata.sharpness = output.Sharpness;
        metadata.whiteBalance = output.WhiteBalance;
        metadata.apertureFNumber = output.FNumber;
        this.photoService.saveMetaData(metadata).subscribe(result => {
          console.log('success metadata ' + result);
        });
        console.log(metadata);
      });
  }

  onUploadError(event) {
    console.log('error ' + event);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSending(event: XMLHttpRequest) {
    event.setRequestHeader('Authorization', 'Bearer ' + this.keyCloak.keycloak.token);
  }

  ngOnInit() {
  }

}

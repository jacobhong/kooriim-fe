import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  files: File[] = [];

  onUploadSuccess(event) {
    console.log(event);
  }
  
  onUploadError(event) {
    console.log('error ' + event);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  constructor() { }

  ngOnInit() {
  }

}

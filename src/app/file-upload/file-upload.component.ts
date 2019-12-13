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
    // const file = new File();
    // file.name = event.name;
    // this.files.push(...event.addedFiles);
    // const fileReader = new FileReader();
    // fileReader.onloadend = () => {
    //   console.log(fileReader.result);
    // }
    // fileReader.readAsArrayBuffer(event.addedFiles[0]);

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

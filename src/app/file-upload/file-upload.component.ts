import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../shared/keycloak/keycloak.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  files: File[] = [];

  constructor(private keyCloak: KeycloakService) {

  }

  onAddedFile(event) {
    console.log('added');
  }
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

  onSending(event: XMLHttpRequest) {
    event.setRequestHeader('Authorization', 'Bearer ' + this.keyCloak.keycloak.token);
  }

  ngOnInit() {
  }

}

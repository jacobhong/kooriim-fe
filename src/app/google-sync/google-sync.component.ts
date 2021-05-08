import { Component, OnInit } from '@angular/core';
import { PhotoServiceComponent } from '../photo/photo-service/photo-service.component';

@Component({
  selector: 'app-google-sync',
  templateUrl: './google-sync.component.html',
  styleUrls: ['./google-sync.component.scss']
})
export class GoogleSyncComponent implements OnInit {

  constructor(private photoService: PhotoServiceComponent) { }

  ngOnInit() {
    console.log('google');
  }


  googleSync() {
    this.photoService.googleSync().subscribe(result => {
      console.log('finished sgoogle sync');
    });
  }

}

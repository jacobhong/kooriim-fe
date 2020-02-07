import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fe-app';
  d : string;
  constructor(private httpClient: HttpClient) {

  }
  click() {
    let httpheaders = new HttpHeaders({ Accept: 'text/html' });
    // httpheaders.set('Accept', 'text/html');
    
    window.location.href = "http://localhost:8081/auth/realms/kooriim/protocol/openid-connect/auth?client_id=photo-album-service&response_type=code";
    // return this.httpClient
    //   .get<any[]>('photo-album-service/login', { headers: httpheaders, responseType: 'text' }).subscribe(r => {
    //     console.log('GOT');
    //     console.log(r);
    //     this.d = r;
    //   });
    // http://192.168.1.206.xip.io:4200/photo-gallery?state=zS4g_cWBLuvoPsk4e0y22DZJ3IPfg4aZPj2FwC656Rw%3D&code=4%2FwQHSgRCG1R8n9xaRAF74TGQeoU8f4okG47nos3cr42fitB_B32gZwI08oU9Me9yd2yukMSHQTjlniPXIsR7ksig&scope=email%20profile%20openid%20https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=none&session_state=190f0bd61feec28eaf4d196bc9220d5964d5ac78..7ef4
  }

}

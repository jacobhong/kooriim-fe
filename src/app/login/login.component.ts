import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private httpClient: HttpClient,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log('redirected here')
      console.log(params);
    });
  }
  click() {
    return this.httpClient
    .get<any[]>('photo-album-service/oauth2/authorization/google', {}).subscribe(r => {
      console.log(r);
    });
    // http://192.168.1.206.xip.io:4200/photo-gallery?state=zS4g_cWBLuvoPsk4e0y22DZJ3IPfg4aZPj2FwC656Rw%3D&code=4%2FwQHSgRCG1R8n9xaRAF74TGQeoU8f4okG47nos3cr42fitB_B32gZwI08oU9Me9yd2yukMSHQTjlniPXIsR7ksig&scope=email%20profile%20openid%20https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https:%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&authuser=0&prompt=none&session_state=190f0bd61feec28eaf4d196bc9220d5964d5ac78..7ef4
  }

}

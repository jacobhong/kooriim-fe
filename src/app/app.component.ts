import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fe-app';
  images = [
    {img: "assets/IMG_0330.JPG"},
    {img: "assets/IMG_0366.JPG"},
    {img: "assets/IMG_0373.JPG"},
    {img: "assets/IMG_0462.JPG"}
  ];
}

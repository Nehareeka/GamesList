import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Game List';
  on: boolean = true;
  public toggleDarkLight() {

    let body = document.getElementsByTagName("body")[0];
    let currentClass = body.className;
    body.className = currentClass === "dark-mode" ? "light-mode" : "dark-mode";
    if (body.className === "light-mode") {
        this.on = true;
    } else {
      this.on = false;
    }
  }
}

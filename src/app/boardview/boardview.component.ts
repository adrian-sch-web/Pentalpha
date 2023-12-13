import { Component } from '@angular/core';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent {
  public outerPoints = [[100, 10], [52.9, 172.8], [185.6, 72.2], [15, 72.2], [152.9, 172.2]];

  getPentagram(): string {
    return this.outerPoints.map(a => a.join(",")).join(" ");
  }

}

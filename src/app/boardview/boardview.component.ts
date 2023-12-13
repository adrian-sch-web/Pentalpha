import { Component, OnInit } from '@angular/core';
import { Pentagram } from './Pentagram';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent implements OnInit {
  private degreeToRadian = Math.PI / 180;
  private goldenRatio = (1 + Math.sqrt(5)) / 2;
  public outerPentagram: Pentagram = { points: [], stones: [] };
  public innerPentagram: Pentagram = { points: [], stones: [] };

  ngOnInit(): void {
    this.outerPentagram.points = this.getPoints(90, 270);
    this.outerPentagram.stones = [false, false, false, false, false];
    this.innerPentagram.points = this.getPoints(90 / (this.goldenRatio ** 2), 90);
    this.innerPentagram.stones = [false, false, false, false, false];
  }

  getPoints(radius: number, startAngle: number) {
    let points: number[][] = [];
    for (let i = 0; i < 5; i++) {
      points.push([100 + radius * Math.cos(startAngle * this.degreeToRadian), 100 + radius * Math.sin(startAngle * this.degreeToRadian)]);
      startAngle = (startAngle + 144) % 360;
    }
    return points;
  }

  getPentagram(): string {
    return this.outerPentagram.points.map(a => a.join(",")).join(" ");
  }
}

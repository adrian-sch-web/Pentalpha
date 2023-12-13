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
  public pentagram: Pentagram = {
    outerPoints: [],
    outerStones: [],
    innerPoints: [],
    innerStones: []
  };

  ngOnInit(): void {
    this.pentagram.outerPoints = this.getPoints(90, 270);
    this.pentagram.outerStones = [false, false, false, false, false];
    this.pentagram.innerPoints = this.getPoints(90 / (this.goldenRatio ** 2), 90);
    this.pentagram.innerStones = [false, false, false, false, false];
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
    return this.pentagram.outerPoints.map(a => a.join(",")).join(" ");
  }

  getStoneColor(index: number, outer: boolean): string {
    if (outer) {
      return this.pentagram.outerStones[index] ? 'black' : 'none';
    }
    else {
      return this.pentagram.innerStones[index] ? 'black' : 'none';
    }
  }
}

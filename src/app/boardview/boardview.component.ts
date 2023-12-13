import { Component, OnInit } from '@angular/core';
import { Pentagram, Color } from './Pentagram';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent implements OnInit {
  private degreeToRadian = Math.PI / 180;
  private goldenRatio = (1 + Math.sqrt(5)) / 2;
  public pentagram: Pentagram = [];

  ngOnInit(): void {
    this.getPoints(90, 270);
    this.getPoints(90 / (this.goldenRatio ** 2), 90);
  }

  getPoints(radius: number, startAngle: number) {
    let points: number[][] = [];
    for (let i = 0; i < 5; i++) {
      this.pentagram.push({
        point: [100 + radius * Math.cos(startAngle * this.degreeToRadian), 100 + radius * Math.sin(startAngle * this.degreeToRadian)],
        stone: false,
        color: Color.black
      });
      startAngle = (startAngle + 144) % 360;
    }
  }

  getPentagram(): string {
    let pentagramPoints = "";
    for (let i = 0; i < 5; i++) {
      pentagramPoints += this.pentagram[i].point.join(",") + " ";
    }
    return pentagramPoints;
  }

  getOpacity(index: number): string {
    return this.pentagram[index].stone ? "1" : "0.1";
  }

  test(index: number) {
    
  }
}

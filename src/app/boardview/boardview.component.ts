import { Component, OnInit } from '@angular/core';
import { Pentagram, Color } from './Pentagram';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent implements OnInit {
  private selectedNode?: number;
  private possibleNodes?: number[];

  public pentagram: Pentagram = [];
  public score: number = 0;
  public gameRunning = true;
  public learnMode: boolean = false;
  public placeNext: Set<number> = new Set<number>();
  public startTime?: Date;

  ngOnInit(): void {
    this.setupGame();
  }

  public buildPentagram(radius: number, startAngle: number) {
    let degreeToRadian = Math.PI / 180;
    for (let i = 0; i < 5; i++) {
      this.pentagram.push({
        point: [100 + radius * Math.cos(startAngle * degreeToRadian), 100 + radius * Math.sin(startAngle * degreeToRadian)],
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
    if (this.selectedNode == index) {
      return "1";
    }
    return this.pentagram[index].stone ? "1" : "0.2";
  }

  getColorString(color: Color): string {
    return Color[color];
  }

  mouseEnter(index: number) {
    if (this.selectedNode != undefined) {
      return;
    }
    if (!this.pentagram[index].stone) {
      this.pentagram[index].color = Color.red;
      for (let point of this.getPossibleNodes(index)) {
        this.pentagram[point].color = Color.green;
      }
    }
  }

  getPossibleNodes(index: number): number[] {
    let places: number[] = [];
    let temp = index > 4 ? 0 : 5;
    if (!this.pentagram[(index + 2) % 5 + temp].stone) places.push((index + 2) % 5 + temp);
    if (!this.pentagram[(index + 3) % 5 + temp].stone) places.push((index + 3) % 5 + temp);
    return places;
  }

  mouseLeave(index: number) {
    if (this.selectedNode != undefined) {
      return;
    }
    this.pentagram[index].color = Color.black;
    for (let point of this.getPossibleNodes(index)) {
      if (this.possibleNodes && this.possibleNodes.some(a => a == point)) {
        continue;
      }
      this.pentagram[point].color = Color.black;
      if (this.learnMode) {
        this.placeNext.forEach(i => this.pentagram[i].color = 3);
      }
    }
  }

  onClick(index: number) {
    if (!this.startTime) {
      this.startTime = new Date();
    }
    if (this.selectedNode == index) {
      this.selectedNode = undefined;
      this.possibleNodes = undefined;
      return;
    }
    let possibleNodes = this.getPossibleNodes(index);
    if (this.selectedNode != undefined || possibleNodes.length == 0) {
      if (this.possibleNodes?.some(a => a == index)) {
        this.place(index);
      }
      return;
    }
    this.selectedNode = index;
    this.possibleNodes = possibleNodes;
  }

  place(index: number) {
    this.pentagram[index].stone = true;
    let temp = this.selectedNode!;
    this.selectedNode = undefined;
    this.possibleNodes = undefined;
    this.mouseLeave(temp);
    this.score++;
    this.checkGame();
    if (this.learnMode) {
      this.learnModeCheck(index);
    }
  }

  checkGame() {
    this.gameRunning = this.pentagram.some((a, index) => !a.stone && this.getPossibleNodes(index).length > 0)
  }

  setupGame() {
    let goldenRatio = (1 + Math.sqrt(5)) / 2;
    this.score = 0;
    this.pentagram = [];
    this.gameRunning = true;
    this.learnMode = false;
    this.placeNext = new Set();
    this.startTime = undefined;
    this.buildPentagram(90, 270);
    this.buildPentagram(90 / (goldenRatio ** 2), 90);
  }

  learnModeCheck(index: number) {
    this.placeNext.delete(index);
    let temp = index > 4 ? 0 : 5;
    if (!this.pentagram[(index + 7) % 5 + temp].stone) this.placeNext.add((index + 7) % 5 + temp);
    if (!this.pentagram[(index + 8) % 5 + temp].stone) this.placeNext.add((index + 8) % 5 + temp);
    this.placeNext.forEach(i => this.pentagram[i].color = 3);
  }

  startLearnMode() {
    this.learnMode = true;
    this.pentagram.forEach((node, i) => {
      if (node.stone) {
        this.learnModeCheck(i);
      }
    })
  }

  getPassedTime(): number {
    if (this.startTime) {
      return new Date().getTime() - this.startTime.getTime();
    }
    return 0;
  }
}

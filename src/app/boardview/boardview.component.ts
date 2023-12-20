import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent implements OnInit {
  public pentagramCoords: number[][] = this.getPentagramCoords();

  constructor(private game: GameService) { }

  ngOnInit(): void {
    this.start();
  }

  getPentagram(coords: number[][]): string {
    let pentagramPoints = "";
    for (let i = 0; i < 5; i++) {
      pentagramPoints += coords[i].join(",") + " ";
    }
    return pentagramPoints;
  }

  public getPentagramCoords(): number[][] {
    let goldenRatio = (1 + Math.sqrt(5)) / 2;
    let coords: number[][] = this.buildPentagram(90, 270);
    coords.push(...this.buildPentagram(90 / (goldenRatio ** 2), 90));
    return coords;
  }

  private buildPentagram(radius: number, startAngle: number): number[][] {
    let degreeToRadian = Math.PI / 180;
    let coords: number[][] = [];
    for (let i = 0; i < 5; i++) {
      coords.push([100 + radius * Math.cos(startAngle * degreeToRadian), 100 + radius * Math.sin(startAngle * degreeToRadian)]);
      startAngle = (startAngle + 144) % 360;
    }
    return coords;
  }

  getOpacity(index: number): string {
    return this.game.getOpacity(index);
  }

  getColorString(index: number): string {
    return this.game.getColorString(index)
  }

  mouseEnter(index: number) {
    this.game.mouseEnter(index);
  }

  mouseLeave(index: number) {
    this.game.mouseLeave(index);
  }

  onClick(index: number) {
    this.game.onClick(index);
  }

  startLearnMode() {
    this.game.startLearnMode();
  }

  start() {
    this.game.start();
  }

  getScore() {
    return this.game.score;
  }

  getLearnMode() {
    return this.game.learnMode;
  }

  isGameRunning(): boolean {
    return this.game.gameRunning;
  }

  getTimeSpent(): number {
    return this.game.getTimeSpent();
  }
}

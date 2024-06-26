import { Injectable } from '@angular/core';
import { Color, Pentagram } from './boardview/Pentagram';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private pentagram = new Pentagram();
  private selectedNode?: number;
  private possibleNodes?: number[];
  private placeNext: Set<number> = new Set<number>();
  private startTime?: Date;
  private timeSpent: number = 0;
  public score: number = 0;
  public gameRunning: boolean = true;
  public learnMode: boolean = false;

  constructor() { }

  start() {
    this.score = 0;
    this.pentagram.spots = [];
    this.gameRunning = true;
    this.learnMode = false;
    this.placeNext = new Set();
    this.startTime = undefined;
    this.pentagram = new Pentagram();
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
    let possibleNodes = this.pentagram.getPossibleNodes(index);
    if (this.selectedNode != undefined || possibleNodes.length == 0) {
      if (this.possibleNodes?.some(a => a == index)) {
        this.place(index);
      }
      return;
    }
    if (this.pentagram.spots[index].stone) {
      return;
    }
    this.selectedNode = index;
    this.possibleNodes = possibleNodes;
  }

  mouseEnter(index: number) {
    if (this.selectedNode != undefined) {
      return;
    }
      if (!this.pentagram.spots[index].stone) {
          this.pentagram.spots[index].color = Color.red;
          for (let point of this.pentagram.getPossibleNodes(index)) {
              this.pentagram.spots[point].color = Color.green;
          }
      }
  }

  mouseLeave(index: number) {
    if (this.selectedNode != undefined) {
      return;
    }
    this.pentagram.spots[index].color = Color.black;
    for (let point of this.pentagram.getPossibleNodes(index)) {
      if (this.possibleNodes && this.possibleNodes.some(a => a == point)) {
        continue;
      }
      this.pentagram.spots[point].color = Color.black;
      if (this.learnMode) {
        this.placeNext.forEach(i => this.pentagram.spots[i].color = 3);
      }
    }
  }

  checkGame() {
    this.gameRunning = this.pentagram.spots.some((node, index) => !node.stone && this.pentagram.getPossibleNodes(index).length > 0);
    if (this.gameRunning && this.startTime) {
      this.timeSpent = new Date().getTime() - this.startTime.getTime();
    }
  }

  startLearnMode() {
    this.learnMode = true;
    this.pentagram.spots.forEach((node, i) => {
      if (node.stone) {
        this.learnModeCheck(i);
      }
    });
  }

  learnModeCheck(index: number) {
    this.placeNext.delete(index);
    let temp = index > 4 ? 0 : 5;
    if (!this.pentagram.spots[(index + 7) % 5 + temp].stone) this.placeNext.add((index + 7) % 5 + temp);
    if (!this.pentagram.spots[(index + 8) % 5 + temp].stone) this.placeNext.add((index + 8) % 5 + temp);
    this.placeNext.forEach(i => this.pentagram.spots[i].color = 3);
  }

  place(index: number) {
    this.pentagram.spots[index].stone = true;
    this.selectedNode = undefined;
    this.possibleNodes = undefined;
    this.score++;
    this.pentagram.updateAllColor();
    this.checkGame();
    if (this.learnMode) {
      this.learnModeCheck(index);
    }
  }

  getColorString(index: number): string {
    return Color[this.pentagram.spots[index].color];
  }

  getOpacity(index: number) {
    if (this.selectedNode == index) {
      return "1";
    }
    return this.pentagram.spots[index].stone ? "1" : "0.2";
  }

  getTimeSpent(): number {
    return this.timeSpent;
  }
}
import { Component, OnInit } from '@angular/core';
import { Pentagram, Color } from './Pentagram';
import { GameService } from '../game.service';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent implements OnInit {
  public pentagramCoords: number[][] = [];

  constructor(private game: GameService) { }

  ngOnInit(): void {
    this.game.start();
    this.pentagramCoords = this.game.getPentagramCoords();
  }

  getPentagram(coords: number[][]): string {
    let pentagramPoints = "";
    for (let i = 0; i < 5; i++) {
      pentagramPoints += coords[i].join(",") + " ";
    }
    return pentagramPoints;
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

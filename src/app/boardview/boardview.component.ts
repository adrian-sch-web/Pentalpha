import { Component, OnInit } from '@angular/core';
import { Pentagram, Color } from './Pentagram';
import { GameService } from '../game.service';

@Component({
  selector: 'app-boardview',
  templateUrl: './boardview.component.html',
  styleUrls: ['./boardview.component.scss']
})
export class BoardviewComponent implements OnInit {
  private selectedNode?: number;
  private possibleNodes?: number[];
  public pentagram: Pentagram = new Pentagram();
  public score: number = 0;
  public gameRunning = true;
  public learnMode: boolean = false;
  public placeNext: Set<number> = new Set<number>();
  public startTime?: Date;

  constructor(private game: GameService) { }

  ngOnInit(): void {
    this.game.start();
  }

  getPentagram(): string {
    return this.pentagram.getPentagram();
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

  getPassedTime(): number {
    return this.game.getPassedTime();
  }
}

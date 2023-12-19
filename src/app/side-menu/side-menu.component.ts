import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  @Input() score: number = 0;
  @Input() learnMode: boolean = false;
  @Output() newGame = new EventEmitter;
  @Output() enableLearn = new EventEmitter;
  public panelOpened = false;

  startLearnMode() {
    this.enableLearn.emit();
  }

  start() {
    this.newGame.emit()
  }
}

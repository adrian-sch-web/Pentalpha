import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gamefinished',
  templateUrl: './gamefinished.component.html',
  styleUrl: './gamefinished.component.scss'
})
export class GamefinishedComponent {
  @Input() score: number = 0;
  @Input() learnMode: boolean = false;
  @Input() time: number = 0;
  @Output() newGame = new EventEmitter;

  restartGame() {
    this.newGame.emit();
  }
}

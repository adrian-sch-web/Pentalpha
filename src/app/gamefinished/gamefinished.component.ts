import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gamefinished',
  templateUrl: './gamefinished.component.html',
  styleUrl: './gamefinished.component.scss'
})
export class GamefinishedComponent {
  @Input() score?: number;
  @Output() newGame = new EventEmitter<boolean>;

  restartGame() {
    this.newGame.emit(true);
  }
}

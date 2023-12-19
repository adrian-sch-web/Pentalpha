
export class Pentagram {
    public spots: Spot[] = [];

    constructor() {
        this.setup();
    }

    public setup() {
        for (let i = 0; i < 10; i++) {
            this.spots.push({ stone: false, color: Color.black });
        }
    }

    mouseHover(index: number) {
        if (!this.spots[index].stone) {
            this.spots[index].color = Color.red;
            for (let point of this.getPossibleNodes(index)) {
                this.spots[point].color = Color.green;
            }
        }
    }

    getPossibleNodes(index: number): number[] {
        let places: number[] = [];
        let temp = index > 4 ? 0 : 5;
        if (!this.spots[(index + 2) % 5 + temp].stone) places.push((index + 2) % 5 + temp);
        if (!this.spots[(index + 3) % 5 + temp].stone) places.push((index + 3) % 5 + temp);
        return places;
    }
}

export interface Spot {
    stone: boolean;
    color: Color;
}

export enum Color {
    black,
    green,
    red,
    yellow
}
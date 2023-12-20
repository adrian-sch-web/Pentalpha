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

    getPossibleNodes(index: number): number[] {
        let places: number[] = [];
        let temp = index > 4 ? 0 : 5;
        if (!this.spots[(index + 2) % 5 + temp].stone) places.push((index + 2) % 5 + temp);
        if (!this.spots[(index + 3) % 5 + temp].stone) places.push((index + 3) % 5 + temp);
        return places;
    }

    updateAllColor() {
        this.spots.forEach(a => a.color = Color.black);
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
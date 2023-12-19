
export class Pentagram {
    public spots: Spot[] = [];

    constructor() {
        let goldenRatio = (1 + Math.sqrt(5)) / 2;
        this.buildPentagram(90, 270);
        this.buildPentagram(90 / (goldenRatio ** 2), 90);
    }

    public buildPentagram(radius: number, startAngle: number) {
        let degreeToRadian = Math.PI / 180;
        for (let i = 0; i < 5; i++) {
            this.spots.push({
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
            pentagramPoints += this.spots[i].point.join(",") + " ";
        }
        return pentagramPoints;
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
    point: [number, number];
    stone: boolean;
    color: Color;
}

export enum Color {
    black,
    green,
    red,
    yellow
}
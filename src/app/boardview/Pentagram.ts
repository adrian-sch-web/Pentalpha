export type Pentagram = Spot[];

export interface Spot {
    point: [number, number];
    stone: boolean;
    color: Color;
}

export enum Color {
    black,
    green,
    red
}
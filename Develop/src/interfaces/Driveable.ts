import Driveable from "./Driveable";

class Car implements Driveable {
    started: boolean = false;
    currentSpeed: number = 0;

    start(): void {
        this.started = true;
        console.log("Car started.");
    }

    accelerate(change: number): void {
        this.currentSpeed += change;
        console.log(`Car accelerated to ${this.currentSpeed} mph.`);
    }

    decelerate(change: number): void {
        this.currentSpeed -= change;
        if (this.currentSpeed < 0) this.currentSpeed = 0;
        console.log(`Car decelerated to ${this.currentSpeed} mph.`);
    }

    stop(): void {
        this.currentSpeed = 0;
        console.log("Car stopped.");
    }

    turn(direction: string): void {
        console.log(`Car turned ${direction}.`);
    }

    reverse(): void {
        console.log("Car is reversing.");
    }
}

import Driveable from "../interfaces/Driveable";

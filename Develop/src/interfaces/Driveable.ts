import Vehicle from "../classes/Vehicle.js";

export interface Driveable {
  start(): void;
  stop(): void;
  accelerate(change: number): void;
  decelerate(change: number): void;
  turn(direction: string): void;
  reverse(): void;
}

class Car extends Vehicle implements Driveable {
  override start(): void {
    console.log("Car started.");
  }

  override stop(): void {
    console.log("Car stopped.");
  }

  override accelerate(change: number): void {
    console.log(`Car accelerated by ${change} mph.`);
  }

  override decelerate(change: number): void {
    console.log(`Car decelerated by ${change} mph.`);
  }

  turn(direction: string): void {
    console.log(`Car turned ${direction}.`);
  }

  reverse(): void {
    console.log("Car is reversing.");
  }
}

export default Car;

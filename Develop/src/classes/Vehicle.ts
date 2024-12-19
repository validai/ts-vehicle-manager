import Wheel from "./Wheel.js"; 

class Vehicle  {
  // Declare properties
  public vin: string;
  public color: string;
  public make: string;
  public model: string;
  public year: number;
  public weight: number;
  public topSpeed: number;
  public wheels: Wheel[]; 

  protected started: boolean = false;
  protected currentSpeed: number = 0;

  // Constructor
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.wheels = wheels;
  }

  // Print vehicle details
  printDetails(): void {
    console.log(
      `VIN: ${this.vin}, Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Color: ${this.color}, Weight: ${this.weight}, Top Speed: ${this.topSpeed}`
    );
  }

  // Start the vehicle
  start(): void {
    this.started = true;
    console.log("Vehicle started.");
  }

  // Stop the vehicle
  stop(): void {
    this.started = false;
    this.currentSpeed = 0;
    console.log("Vehicle stopped.");
  }

  // Accelerate
  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      console.log(`Vehicle accelerated to ${this.currentSpeed} mph.`);
    } else {
      console.log("Start the vehicle first!");
    }
  }

  // Decelerate
  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed -= change;
      if (this.currentSpeed < 0) this.currentSpeed = 0;
      console.log(`Vehicle decelerated to ${this.currentSpeed} mph.`);
    } else {
      console.log("Start the vehicle first!");
    }
  }
}

// Export Vehicle class
export default Vehicle;

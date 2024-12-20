import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";

class Motorbike extends Vehicle {
  override wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[] = [
      new Wheel(17, "Michelin"),
      new Wheel(18, "Michelin"),
      new Wheel(19, "Michelin"),
      new Wheel(20, "Michelin"),
    ]
  ) 
  {
    super(vin, color, make, model, year, weight, topSpeed, wheels);

    // Ensure 2 wheels
    this.wheels = wheels.length === 2 ? wheels : [new Wheel(17), new Wheel(17)];
  }

  wheelie(): void {
    console.log(`${this.make} ${this.model} is doing a wheelie!`);
  }

  override printDetails(): void {
    super.printDetails();
    console.log(`Number of wheels: ${this.wheels.length}`);
  }
}

export default Motorbike;

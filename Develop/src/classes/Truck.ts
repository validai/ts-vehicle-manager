import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
import { AbleToTow } from '../interfaces/AbleToTow.js';

class Truck extends Vehicle implements AbleToTow {
  towingCapacity: number;

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    super(vin, color, make, model, year, weight, topSpeed, wheels);

    // Ensure there are 4 wheels, or create default ones
    if (wheels.length !== 4) {
      this.wheels = [new Wheel(17), new Wheel(17), new Wheel(17), new Wheel(17)];
    } else {
      this.wheels = wheels;
    }

    this.towingCapacity = towingCapacity;
  }

  tow(vehicle: Vehicle): void {
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`${vehicle.make} ${vehicle.model} is being towed by ${this.make} ${this.model}.`);
    } else {
      console.log(`${vehicle.make} ${vehicle.model} is too heavy to be towed by ${this.make} ${this.model}.`);
    }
  }

  printDetails(): void {
    super.printDetails();
    console.log(
      `Towing Capacity: ${this.towingCapacity} kg, Wheels: ${this.wheels.length}`
    );
    this.wheels.forEach((wheel, index) => {
      console.log(`Wheel ${index + 1}: ${wheel.size} inches`);
    });
  }
}

export default Truck;

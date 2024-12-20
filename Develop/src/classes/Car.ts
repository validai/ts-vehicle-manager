import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Car class that extends Vehicle class
class Car extends Vehicle {
  // Override properties from the base class Vehicle
  override vin!: string;
  override color!: string;
  override make!: string;
  override model!: string;
  override year!: number;
  override weight!: number;
  override topSpeed!: number;
  override wheels!: Wheel[];

  // Constructor for the Car class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[] = [],
  
  ) {
    super(vin, color, make, model, year, weight, topSpeed, wheels); // Call parent constructor

    // Initialize properties of the Car class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;

    // Ensure the wheels array has exactly 4 elements
    if (wheels.length !== 4) {
      this.wheels = [
        new Wheel(17, 'Michelin'),
        new Wheel(18, 'Michelin'),
        new Wheel(19, 'Michelin'),
        new Wheel(20, 'Michelin'),
      ];
    } else {
      this.wheels = wheels;
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails(); // Call parent method
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);

    // Print details of the wheels
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter()} inch with a ${wheel.getTireBrand()} tire`
      );
    });
  }
}

// Export the Car class as the default export
export default Car;

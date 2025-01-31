import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// Car class that extends Vehicle
class Car extends Vehicle {
  // Constructor for the Car class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[] = []
  ) {
    super(vin, color, make, model, year, weight, topSpeed, wheels);

    // Ensure the car has exactly 4 wheels
    this.wheels =
      wheels.length === 4
        ? wheels
        : [
            new Wheel(17, 'Michelin'),
            new Wheel(17, 'Michelin'),
            new Wheel(17, 'Michelin'),
            new Wheel(17, 'Michelin'),
          ];
  }

  // Override the printDetails method from Vehicle
  override printDetails(): void {
    super.printDetails(); // Call parent method
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    
    // Print details of each wheel
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter()} inch with a ${wheel.getTireBrand()} tire`
      );
    });
  }
}

// Export the Car class
export default Car;

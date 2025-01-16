// Import Classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";


// Create an array of vehicles
const vehicles: (Car | Truck | Motorbike)[] = [];

// Create a new Truck instance with default wheels and a static method to generate a VIN
const truck1 = new Truck({
  vin: Cli.generateVin(),
  color: "red",
  make: "Ford",
  model: "F-150",
  year: 2021,
  weight: 5000,
  topSpeed: 120,
  wheels: [], // Optional if the constructor handles defaults
  towingCapacity: 10000,
});


// Create a new Car instance with default wheels
const car1 = new Car(
  Cli.generateVin(),
  "blue",
  "Toyota",
  "Camry",
  2021,
  3000,
  130,
  []
);

// Create custom wheels for the motorbike
const motorbikeWheels = [
  new Wheel(17, "Michelin"),
  new Wheel(17, "Michelin"),
];

// Create a new Motorbike instance
const motorbike1 = new Motorbike(
  Cli.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  motorbikeWheels
);

// Add vehicles to the vehicles array
vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// Create a new instance of the CLI class
const cli = new Cli(vehicles);

// Start the CLI
cli.startCli();

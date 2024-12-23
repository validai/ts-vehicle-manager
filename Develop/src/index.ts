import Truck from "./classes/Truck";
import Car from "./classes/Car";
import Motorbike from "./classes/Motorbike";
import Wheel from "./classes/Wheel";
import Cli from "./classes/Cli.js";

// Create an array of vehicles
const vehicles = [];

// Use default wheels and a static method to generate a VIN
const truck1 = new Truck(
  { vin: Cli.generateVin(), color: "red", make: "Ford", model: "F-150", year: 2021, weight: 5000, topSpeed: 120, wheels: [], towingCapacity: 10000 });

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

// Custom wheels for the motorbike
const motorbike1Wheels = [
  new Wheel(17, "Michelin"),
  new Wheel(17, "Michelin"),
];

const motorbike1 = new Motorbike(
  Cli.generateVin(),
  "black",
  "Harley Davidson",
  "Sportster",
  2021,
  500,
  125,
  motorbike1Wheels
);

vehicles.push(truck1);
vehicles.push(car1);
vehicles.push(motorbike1);

// Create a new instance of the Cli class
const cli = new Cli(vehicles);

// Start the CLI
cli.startCli();

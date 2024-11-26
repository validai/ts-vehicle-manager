// import classes
import Truck from './classes/Truck.js';
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from './classes/Wheel.js';;
import Cli from "./classes/Cli.js";

// create an array of vehicles
const truck1 = new Truck(Cli.generateVin(), "red", "Ford", "F-150", 2021, 5000, 120, [], 10000);
vehicles.push(truck1);

const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorbike1 = new Motorbike(Cli.generateVin(), "black", "Harley Davidson", "Sportster", 2021, 500, 125, motorbike1Wheels);
vehicles.push(motorbike1);

import Motorbike from './classes/Motorbike.js';
import Wheel from './classes/Wheel.js';

motorbike.printDetails();
motorbike.wheelie();
// TODO: uncomment once trucks are implemented
// const truck1 = new Truck(Cli.generateVin(),"red", "Ford", "F-150", 2021, 5000, 120, [], 10000);

// will use default wheels

// TODO: uncomment once motorbikes are implemented
// const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
// const motorbike1 = new Motorbike(Cli.generateVin(), "black", "Harley Davidson", "Sportster", 2021, 500, 125, motorbike1Wheels);

// push vehicles to array
// TODO: uncomment once trucks are implemented
// vehicles.push(truck1);
vehicles.push(car1);
// TODO: uncomment once motorbikes are implemented
// vehicles.push(motorbike1);

// create a new instance of the Cli class
class Cli {
  static generateVin(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  // ... other Cli methods
}


// start the cli
async startCli() {
  let exit = false;

  while (!exit) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["Create Vehicle", "Select Vehicle", "Exit"],
      },
    ]);

    switch (action) {
      case "Create Vehicle":
        await this.createVehicle();
        break;
      case "Select Vehicle":
        await this.selectVehicle();
        break;
      case "Exit":
        console.log("Goodbye!");
        exit = true;
        break;
    }
  }
}
async createVehicle() {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "What type of vehicle would you like to create?",
      choices: ["Car", "Truck", "Motorbike"],
    },
  ]);

  // Based on the type, prompt for vehicle details
  // Add the created vehicle to the `vehicles` array
}

async selectVehicle() {
  const { selectedVin } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedVin",
      message: "Select a vehicle by VIN:",
      choices: this.vehicles.map((v) => ({
        name: `${v.make} ${v.model} (${v.vin})`,
        value: v.vin,
      })),
    },
  ]);

  console.log(`You selected vehicle with VIN: ${selectedVin}`);
  // Perform actions on the selected vehicle
}


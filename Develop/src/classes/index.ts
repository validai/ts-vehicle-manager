import Truck from "./Truck";
import Car from "./Car";
import Motorbike from "./Motorbike";
import Wheel from "./Wheel";
import inquirer from "inquirer";
import { DefaultClause, DefaultKeyword } from "typescript";

class Cli {
  vehicles: Array<Car | Truck | Motorbike> = [];

  static generateVin(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  async startCli() {
    console.log("Welcome to the Vehicle Manager!");
    let exit = false;

    while (!exit) {
      const { action } = await inquirer.prompt([
        {
          type: "list",
          name: "action",
          message: "What would you like to do?",
          choices: ["Create Vehicle", "View Vehicle", "Exit"],
        },
      ]);

      switch (action) {
        case "Create Vehicle":
          await this.createVehicle();
          break;
        case "View Vehicle":
          await this.selectVehicle();
          break;
        case "Exit":
          exit = true;
          console.log("Goodbye!");
          break;
      }
    }
  }

  async createVehicle() {
    const { vehicleType } = await inquirer.prompt([
      {
        type: "list",
        name: "vehicleType",
        message: "Select vehicle type:",
        choices: ["Car", "Truck", "Motorbike"],
      },
    ]);

    const baseQuestions = [
      { type: "input", name: "color", message: "Enter vehicle color:" },
      { type: "input", name: "make", message: "Enter vehicle make:" },
      { type: "input", name: "model", message: "Enter vehicle model:" },
      { type: "input", name: "year", message: "Enter vehicle year:" },
      { type: "input", name: "weight", message: "Enter vehicle weight:" },
      { type: "input", name: "topSpeed", message: "Enter vehicle top speed:" },
    ];

    const extraQuestions =
      vehicleType === "Truck"
        ? [{ type: "input", name: "towingCapacity", message: "Enter towing capacity:" }]
        : [];

    const answers = await inquirer.prompt([...baseQuestions, ...extraQuestions]);

    let vehicle: Car | Truck | Motorbike;
    switch (vehicleType) {
      case "Car":
        vehicle = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")]
        );
        break;
      case "Truck":
        vehicle = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        break;
      case "Motorbike":
        vehicle = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")]
        );
        break;
        default:
          console.error("Invalid vehicle type selected");
          return; // Exit the function if no valid vehicle is created
      }
    
      // Push the vehicle to the array if it was successfully created
      if (vehicle) {
        this.vehicles.push(vehicle);
        console.log(`${vehicleType} created successfully!`);
      }
    }
  async selectVehicle() {
    if (this.vehicles.length === 0) {
      console.log("No vehicles available.");
      return;
    }

    const { selectedVin } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedVin",
        message: "Select a vehicle to view its details:",
        choices: this.vehicles.map((vehicle) => ({
          name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
          value: vehicle.vin,
        })),
      },
    ]);

    const selectedVehicle = this.vehicles.find((vehicle) => vehicle.vin === selectedVin);
    selectedVehicle?.printDetails();
  }
}

// Initialize CLI
const cli = new Cli();
cli.startCli();

export { default as Truck } from "./Truck";
export { default as Car } from "./Car";
export { default as Motorbike } from "./Motorbike";
export { default as Wheel } from "./Wheel";

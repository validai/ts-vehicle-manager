// Importing required modules and classes
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// Define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[]; // Union operator for multiple vehicle types
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // Updated constructor to accept Truck, Motorbike, and Car objects
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // Static method to generate a unique VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Method to choose an existing vehicle
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on:",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin; inquirer || Cli
        this.performActions(); // Perform actions on the selected vehicle
      });
  }

  // Method to create a new vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type:",
          choices: ["Car", "Truck", "Motorbike"], // Updated to include Truck and Motorbike
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  // Method to create a Car
  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color:" },
        { type: "input", name: "make", message: "Enter Make:" },
        { type: "input", name: "model", message: "Enter Model:" },
        { type: "input", name: "year", message: "Enter Year:" },
        { type: "input", name: "weight", message: "Enter Weight:" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed:" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  // Method to create a Truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color:" },
        { type: "input", name: "make", message: "Enter Make:" },
        { type: "input", name: "model", message: "Enter Model:" },
        { type: "input", name: "year", message: "Enter Year:" },
        { type: "input", name: "weight", message: "Enter Weight:" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed:" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity:" },
      ])
      .then((answers) => {
        const truck = new Truck(
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
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  // Method to create a Motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color:" },
        { type: "input", name: "make", message: "Enter Make:" },
        { type: "input", name: "model", message: "Enter Model:" },
        { type: "input", name: "year", message: "Enter Year:" },
        { type: "input", name: "weight", message: "Enter Weight:" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed:" },
        { type: "input", name: "frontWheelDiameter", message: "Enter Front Wheel Diameter:" },
        { type: "input", name: "frontWheelBrand", message: "Enter Front Wheel Brand:" },
        { type: "input", name: "rearWheelDiameter", message: "Enter Rear Wheel Diameter:" },
        { type: "input", name: "rearWheelBrand", message: "Enter Rear Wheel Brand:" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  // Method to perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action:",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Perform a wheelie (Motorbike only)",
            "Tow a vehicle (Truck only)",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );
        if (selectedVehicle) {
          if (answers.action === "Print details") {
            selectedVehicle.printDetails();
          } else if (answers.action === "Perform a wheelie (Motorbike only)" && selectedVehicle instanceof Motorbike) {
            selectedVehicle.wheelie();
          } else if (answers.action === "Tow a vehicle (Truck only)" && selectedVehicle instanceof Truck) {
            this.findVehicleToTow(selectedVehicle);
          }
          // Add more actions as needed
        }

        if (answers.action === "Select or create another vehicle") {
          this.startCli();
        } else if (answers.action === "Exit") {
          this.exit = true;
        } else if (!this.exit) {
          this.performActions();
        }
      });
  }

  // Method to find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTowVin",
          message: "Select a vehicle to tow:",
          choices: this.vehicles
            .filter((vehicle) => vehicle.vin !== truck.vin)
            .map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find((vehicle) => vehicle.vin === answers.vehicleToTowVin);
        if (vehicleToTow) {
          truck.tow(vehicleToTow);
        }
        this.performActions();
      });
  }

  // Start the CLI
  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "createOrSelect",
          message: "Would you like to create a new vehicle or select an existing one?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.createOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// Export the Cli class
export default Cli;

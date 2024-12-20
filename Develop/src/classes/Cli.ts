// Imports classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import Vehicle from "./Vehicle.js";


// Defines the Cli class
class Cli {
    vehicles: (Car | Truck | Motorbike)[] = [];
    selectedVehicleVin: string | null = null;
    exit = false;

    // Static method to generate a VIN
    static generateVin(): string {
        return (
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15)
        );
    }

    // Starts the CLI
    async startCli(): Promise<void> {
        while (!this.exit) {
            const { CreateOrSelect } = await inquirer.prompt([
                {
                    type: "list",
                    name: "CreateOrSelect",
                    message:
                        "Would you like to create a new vehicle or perform an action on an existing vehicle?",
                    choices: ["Create a new vehicle", "Select an existing vehicle", "Exit"],
                },
            ]);

            if (CreateOrSelect === "Create a new vehicle") {
                await this.createVehicle();
            } else if (CreateOrSelect === "Select an existing vehicle") {
                await this.chooseVehicle();
            } else {
                this.exit = true;
                console.log("Goodbye!");
            }
        }
    }

    // Consolidates prompts for shared vehicle attributes
   

private async getBaseVehicleDetails(): Promise<any> {
    return inquirer.prompt([
        { type: "list", name: "color", message: "Select color:"},
        { type: "list", name: "make", message: "Select make:"},
        { type: "list", name: "model", message: "Select model:"},
        { type: "input", name: "year", message: "Enter year:" }, 
        { type: "input", name: "weight", message: "Enter weight:" },
        { type: "input", name: "topSpeed", message: "Enter top speed:" },
    ]);
}

  // Prompts for wheel details
  private async getWheelDetails(): Promise<Wheel[]> {
    const { wheelDiameter, wheelBrand } = await inquirer.prompt([
      { type: "list", name: "wheelDiameter", message: "Select wheel diameter:"},
      { type: "list", name: "wheelBrand", message: "Select wheel brand:"},
    ]);
    return [
      new Wheel(parseInt(wheelDiameter), wheelBrand),
      new Wheel(parseInt(wheelDiameter), wheelBrand), // Duplicate since trucks and cars have 4 identical wheels
    ];
  }
    // Creates a new vehicle
    async createVehicle(): Promise<void> {
        const { vehicleType } = await inquirer.prompt([
            {
                type: "list",
                name: "vehicleType",
                message: "Select a vehicle type:",
                choices: ["Car", "Truck", "Motorbike"],
            },
        ]);

        const baseDetails = await this.getBaseVehicleDetails();

        let vehicle: Vehicle | null = null;

        if (vehicleType === "Car") {
            const wheels = await this.getWheelDetails();
            vehicle = new Car(
                Cli.generateVin(),
                baseDetails.color,
                baseDetails.make,
                baseDetails.model,
                parseInt(baseDetails.year),
                parseInt(baseDetails.weight),
                parseInt(baseDetails.topSpeed),
                wheels
            );
        } else if (vehicleType === "Truck") {
          const { towingCapacity } = await inquirer.prompt([
            {
                type: "input",
                name: "towingCapacity",
                message: "Enter towing capacity (default: 2000):",
                default: "2000", // Sets the default towing capacity to 2000 kg
            },
        ]);
        
            const wheels = await this.getWheelDetails();
            vehicle = new Truck(
              { vin: Cli.generateVin(), color: baseDetails.color, make: baseDetails.make, model: baseDetails.model, year: parseInt(baseDetails.year), weight: parseInt(baseDetails.weight), topSpeed: parseInt(baseDetails.topSpeed), wheels, towingCapacity: parseInt(towingCapacity) }            );
        } else if (vehicleType === "Motorbike") {
            const { wheelDiameter, wheelBrand } = await inquirer.prompt([
                { type: "input", name: "wheelDiameter", message: "Enter wheel diameter:" },
                { type: "input", name: "wheelBrand", message: "Enter wheel brand:" },
            ]);
            vehicle = new Motorbike(
                Cli.generateVin(),
                baseDetails.color,
                baseDetails.make,
                baseDetails.model,
                parseInt(baseDetails.year),
                parseInt(baseDetails.weight),
                parseInt(baseDetails.topSpeed),
                [new Wheel(parseInt(wheelDiameter), wheelBrand)]
            );
        }

        if (vehicle) {
            this.vehicles.push(vehicle);
            console.log(`${vehicleType} created successfully!`);
        }
    }

    // Selects an existing vehicle
    async chooseVehicle(): Promise<void> {
        if (this.vehicles.length === 0) {
            console.log("No vehicles available.");
            return;
        }

        const { selectedVehicleVin } = await inquirer.prompt([
            {
                type: "list",
                name: "selectedVehicleVin",
                message: "Select a vehicle to perform an action on:",
                choices: this.vehicles.map((vehicle) => ({
                    name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                    value: vehicle.vin,
                })),
            },
        ]);

        this.selectedVehicleVin = selectedVehicleVin;
        await this.performActions();
    }

    // Performs actions on a selected vehicle
    async performActions(): Promise<void> {
        const selectedVehicle = this.vehicles.find(
            (vehicle) => vehicle.vin === this.selectedVehicleVin
        );

        if (!selectedVehicle) {
            console.log("Vehicle not found.");
            return;
        }

        const { action } = await inquirer.prompt([
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
                    "Select another vehicle",
                    "Exit",
                ],
            },
        ]);

        switch (action) {
            case "Print details":
                selectedVehicle.printDetails();
                break;
            case "Start vehicle":
                selectedVehicle.start();
                break;
            case "Accelerate 5 MPH":
                selectedVehicle.accelerate(5);
                break;
            case "Decelerate 5 MPH":
                selectedVehicle.decelerate(5);
                break;
            case "Stop vehicle":
                selectedVehicle.stop();
                break;
            case "Select another vehicle":
                await this.chooseVehicle();
                return;
            case "Exit":
                this.exit = true;
                break;
        }

        if (!this.exit) {
            await this.performActions();
        }
    }
}

// Exports the Cli class
export default Cli;

    
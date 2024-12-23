// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import Vehicle from "./Vehicle.js";

// define the Cli class
class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

//   Consrtuctor for the Cli Class
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers) => {
        // set the selectedVehicleVin to the vin of the selected vehicle
        this.selectedVehicleVin = answers.selectedVehicleVin;
        // perform actions on the selected vehicle
        this.performActions();
      });
  }

  // method to create a vehicle
  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === 'Car') {
          // create a car
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
            this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
            this.createMotorbike();
        }
      });
  }

  // method to create a car
  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
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
        // push the car to the vehicles array
        this.vehicles.push(car);
        // set the selectedVehicleVin to the vin of the car
        this.selectedVehicleVin = car.vin;
        // perform actions on the car
        this.performActions();
        console.log('Car created successfully!');
      });
  }

  // method to create a truck
  createTruck(): void {
    inquirer
        .prompt([
            { type: "input", name: "color", message: "Enter Color" },
            { type: "input", name: "make", message: "Enter Make" },
            { type: "input", name: "model", message: "Enter Model" },
            { type: "input", name: "year", message: "Enter Year" },
            { type: "input", name: "weight", message: "Enter Weight" },
            { type: "input", name: "topSpeed", message: "Enter Top Speed" },
            { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
        ])
        .then((answers) => {
            const truck = new Truck({
                vin: Cli.generateVin(),
                color: answers.color,
                make: answers.make,
                model: answers.model,
                year: parseInt(answers.year),
                weight: parseInt(answers.weight),
                topSpeed: parseInt(answers.topSpeed),
                wheels: [], // Provide wheels if required, e.g., default ones
                towingCapacity: parseInt(answers.towingCapacity),
            });

            this.vehicles.push(truck);
            this.selectedVehicleVin = truck.vin;
            this.performActions();
            console.log("Truck created successfully!");
        });
}


  // method to create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'wheelDiameter',
          message: 'Enter Wheel Diameter',
        },
        {
          type: 'input',
          name: 'wheelBrand',
          message: 'Enter  Wheel Brand',
        },
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
                new Wheel(parseInt(answers.wheelDiameter), 'Michelin'),
              
            ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin
        this.performActions();
        console.log('Motorbike created successfully!');
      });
  }

  // method to find a vehicle to tow
findVehicleToTow(truck: Truck): void {
  if (this.vehicles.length === 0) {
      console.log("No vehicles available to tow.");
      return;
  }

  inquirer
      .prompt([
          {
              type: "list",
              name: "vehicleToTow",
              message: "Select a vehicle to tow:",
              choices: this.vehicles
                  .filter((vehicle) => vehicle !== truck) // Exclude the truck itself
                  .map((vehicle) => ({
                      name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model} (${vehicle.weight} lbs)`,
                      value: vehicle,
                  })),
          },
      ])
      .then((answers) => {
          const vehicleToTow: Vehicle = answers.vehicleToTow;

          // Check if the truck can tow the selected vehicle
          if (vehicleToTow.weight <= truck.towingCapacity) {
              console.log(
                  `${vehicleToTow.make} ${vehicleToTow.model} is being towed by ${truck.make} ${truck.model}.`
              );
          } else {
              console.log(
                  `${vehicleToTow.make} ${vehicleToTow.model} is too heavy to be towed by ${truck.make} ${truck.model}.`
              );
          }
      })
      .catch((error) => {
          console.error("Error selecting a vehicle to tow:", error);
      });
}


    // method to perform actions on a vehicle
    performActions(): void {
    inquirer
    .prompt([
    {
    type: 'list',
    name: 'action',
    message: 'Select an action',
    // TODO: add options to tow and wheelie
    choices: [
    'Print details',
    'Start vehicle',
    'Accelerate 5 MPH',
    'Decelerate 5 MPH',
    'Stop vehicle',
    'Turn right',
    'Turn left',
    'Reverse',
    'Tow',
    'Wheelie',
    'Select or create another vehicle',
    'Exit',
    ],
    },
    ])
    .then((answers) => {
    // perform the selected action
    if (answers.action === 'Print details') {
    // find the selected vehicle and print its details
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].printDetails();
    }
    }
    } else if (answers.action === 'Start vehicle') {
    // find the selected vehicle and start it
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].start();
    }
    }
    } else if (answers.action === 'Accelerate 5 MPH') {
    // find the selected vehicle and accelerate it by 5 MPH
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].accelerate(5);
    }
    }
    } else if (answers.action === 'Decelerate 5 MPH') {
    // find the selected vehicle and decelerate it by 5 MPH
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].decelerate(5);
    }
    }
    } else if (answers.action === 'Stop vehicle') {
    // find the selected vehicle and stop it
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].stop();
    }
    }
    } else if (answers.action === 'Turn right') {
    // find the selected vehicle and turn it right
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].turn('right');
    }
    }
    } else if (answers.action === 'Turn left') {
    // find the selected vehicle and turn it left
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].turn('left');
    }
    }
    } else if (answers.action === 'Reverse') {
    // find the selected vehicle and reverse it
    for (let i = 0; i < this.vehicles.length; i++) {
    if (this.vehicles[i].vin === this.selectedVehicleVin) {
    this.vehicles[i].reverse();
    }
    }
  } else if (answers.action === 'Wheelie') {
    // Perform the wheelie action if the selected vehicle is a motorbike
    for (let i = 0; i < this.vehicles.length; i++) {
      if (
        this.vehicles[i].vin === this.selectedVehicleVin &&
        this.vehicles[i] instanceof Motorbike // Ensure the vehicle is a Motorbike
      ) {
        (this.vehicles[i] as Motorbike).wheelie(); // Explicitly tell TypeScript it's a Motorbike
      }
    }
  }
  
        else if (answers.action === 'Select or create another vehicle') {
          // start the cli to return to the initial prompt if the user wants to select or create another vehicle
          this.startCli();
          return;
        } else {
          // exit the cli if the user selects exit
          this.exit = true;
        }
        if (!this.exit) {
          // if the user does not want to exit, perform actions on the selected vehicle
          this.performActions();
        }
      });
  }

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

// export the Cli class
export default Cli;


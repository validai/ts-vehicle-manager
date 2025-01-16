// Importing dependencies and classes
import inquirer from 'inquirer';
import Truck from './Truck.js';
import Car from './Car.js';
import Motorbike from './Motorbike.js';
import Wheel from './Wheel.js';
import Vehicle from './Vehicle.js';

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin?: string;
  exit: boolean = false;

  // Constructor for the Cli class
  constructor(vehicles: (Car | Truck | Motorbike)[] = []) {
    this.vehicles = vehicles;
  }

  // Static method to generate a VIN
  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // Start the CLI
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
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  // Create a new vehicle
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
        switch (answers.vehicleType) {
          case 'Car':
            this.createCar();
            break;
          case 'Truck':
            this.createTruck();
            break;
          case 'Motorbike':
            this.createMotorbike();
            break;
        }
      });
  }

  // Select an existing vehicle
  chooseVehicle(): void {
    if (this.vehicles.length === 0) {
      console.log('No vehicles available. Please create a new vehicle first.');
      this.startCli();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  // Create a car
  createCar(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
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
        console.log('Car created successfully!');
        this.performActions();
      });
  }

  // Create a truck
  createTruck(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'towingCapacity', message: 'Enter Towing Capacity' },
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
          wheels: [],
          towingCapacity: parseInt(answers.towingCapacity),
        });
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        console.log('Truck created successfully!');
        this.performActions();
      });
  }

  // Create a motorbike
  createMotorbike(): void {
    inquirer
      .prompt([
        { type: 'input', name: 'color', message: 'Enter Color' },
        { type: 'input', name: 'make', message: 'Enter Make' },
        { type: 'input', name: 'model', message: 'Enter Model' },
        { type: 'input', name: 'year', message: 'Enter Year' },
        { type: 'input', name: 'weight', message: 'Enter Weight' },
        { type: 'input', name: 'topSpeed', message: 'Enter Top Speed' },
        { type: 'input', name: 'wheelDiameter', message: 'Enter Wheel Diameter' },
        { type: 'input', name: 'wheelBrand', message: 'Enter Wheel Brand' },
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
          [new Wheel(parseInt(answers.wheelDiameter), answers.wheelBrand)]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        console.log('Motorbike created successfully!');
        this.performActions();
      });
  }

  // Perform actions on a vehicle
  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
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
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );

        if (!selectedVehicle) {
          console.log('Vehicle not found.');
          this.startCli();
          return;
        }

        switch (answers.action) {
          case 'Print details':
            selectedVehicle.printDetails();
            break;
          case 'Start vehicle':
            selectedVehicle.start();
            break;
          case 'Accelerate 5 MPH':
            selectedVehicle.accelerate(5);
            break;
          case 'Decelerate 5 MPH':
            selectedVehicle.decelerate(5);
            break;
          case 'Stop vehicle':
            selectedVehicle.stop();
            break;
          case 'Turn right':
            selectedVehicle.turn('right');
            break;
          case 'Turn left':
            selectedVehicle.turn('left');
            break;
          case 'Reverse':
            selectedVehicle.reverse();
            break;
          case 'Tow':
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
            } else {
              console.log('Only trucks can tow.');
            }
            break;
          case 'Wheelie':
            if (selectedVehicle instanceof Motorbike) {
              (selectedVehicle as Motorbike).wheelie();
            } else {
              console.log('Only motorbikes can perform a wheelie.');
            }
            break;
          case 'Select or create another vehicle':
            this.startCli();
            return;
          case 'Exit':
            this.exit = true;
            break;
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  // Find a vehicle to tow
  findVehicleToTow(truck: Truck): void {
    const towableVehicles = this.vehicles.filter(
      (vehicle) => vehicle !== truck
    );

    if (towableVehicles.length === 0) {
      console.log('No vehicles available to tow.');
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow:',
          choices: towableVehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model} (${vehicle.weight} lbs)`,
            value: vehicle,
          })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = answers.vehicleToTow as Vehicle;

        if (vehicleToTow.weight <= truck.towingCapacity) {
          console.log(
            `${vehicleToTow.make} ${vehicleToTow.model} is being towed by ${truck.make} ${truck.model}.`
          );
        } else {
          console.log(
            `${vehicleToTow.make} ${vehicleToTow.model} is too heavy to be towed by ${truck.make} ${truck.model}.`
          );
        }
      });
  }
}

export default Cli;

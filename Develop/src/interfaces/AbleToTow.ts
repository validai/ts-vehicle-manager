// Import the base Vehicle class, which will be used in the interface
import Vehicle from '../classes/Vehicle.js';

// Define the AbleToTow interface
export interface AbleToTow {
  /**
   * The towing capacity of the vehicle in kilograms.
   */
  towingCapacity: number;

  /**
   * Method to tow another vehicle.
   * @param vehicle - The vehicle to be towed. It must be a subclass of Vehicle (e.g., Truck, Motorbike, or Car).
   */
  tow(vehicle: Vehicle): void;
}

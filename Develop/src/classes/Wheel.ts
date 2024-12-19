// Wheel class that defines the properties of a wheel
class Wheel {
  private diameter: number; // Private property for diameter
  private tireBrand: string; // Private property for tire brand

  // Constructor with default values
  constructor(diameter: number = 18, tireBrand: string = "GoodYear") {
    this.diameter = diameter;
    this.tireBrand = tireBrand;
  }

  // Getter for diameter
  getDiameter(): number {
    return this.diameter;
  }

  // Getter for tire brand
  getTireBrand(): string {
    return this.tireBrand;
  }
}

// Export the Wheel class
export default Wheel;

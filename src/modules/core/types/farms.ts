export default interface Farm {
  id: number;
  name: string;
  rating: number;
  distance: number;
  x: number; // Position on map (percentage)
  y: number; // Position on map (percentage)
  products: number[];
}

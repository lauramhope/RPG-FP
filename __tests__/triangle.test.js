import { hydrate } from './../src/js/plant.js';

describe('hydrate', () => {
  test('should create a new plant object with a water value of 1', () => {
    const plant = { water: 0 };
    const newPlant = hydrate(plant);
    expect(newPlant.water).toEqual(1);
  });

  test('should not mutate the state of the plant', () => {
    const plant = { water: 0 };
    expect(plant.water).toEqual(0);
  });
});
import carsData from "@/data/cars.json";

export type Car = {
  id: string;
  make: string;
  model: string;
  modelFamily: string;
  year: number;
  category: string;
  difficulty: string;
  imageUrl: string;
};

export const cars: Car[] = carsData as Car[];

export function getCarImageUrl(car: Car): string {
  return car.imageUrl;
}

export function getCarLabel(car: Car): string {
  return `${car.make} ${car.model}`;
}

export function getRandomCar(exclude?: string[]): Car {
  const available = exclude
    ? cars.filter((c) => !exclude.includes(c.id))
    : cars;
  return available[Math.floor(Math.random() * available.length)];
}

export function getWrongChoices(correct: Car, count = 3): Car[] {
  const sameCategory = cars.filter(
    (c) => c.category === correct.category && c.id !== correct.id
  );
  const others = cars.filter(
    (c) => c.category !== correct.category && c.id !== correct.id
  );

  const choices: Car[] = [];
  const pool = [...sameCategory];

  // Pick primarily from same category for harder choices
  while (choices.length < Math.min(2, count) && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    choices.push(pool.splice(idx, 1)[0]);
  }

  // Fill remainder from other categories
  const remaining = [...others];
  while (choices.length < count && remaining.length > 0) {
    const idx = Math.floor(Math.random() * remaining.length);
    choices.push(remaining.splice(idx, 1)[0]);
  }

  return choices;
}

export function getAllCarLabels(): string[] {
  return cars.map(getCarLabel);
}

export function findCarByLabel(label: string): Car | undefined {
  return cars.find((c) => getCarLabel(c).toLowerCase() === label.toLowerCase());
}

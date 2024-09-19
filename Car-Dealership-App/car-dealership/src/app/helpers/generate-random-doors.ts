export function generateRandomDoors(): number {
  const doorsOptions = [2, 3, 4, 5];
  const randomIndex = Math.floor(Math.random() * doorsOptions.length);
  return doorsOptions[randomIndex];
}

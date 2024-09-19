export function generateRandomDescription(): string {
  const descriptions = [
    'A reliable and fuel-efficient sedan, perfect for city driving.',
    'A spacious SUV with excellent off-road capabilities.',
    'A compact hatchback, ideal for urban environments.',
    'A luxury sedan with a comfortable interior and advanced features.',
    'A powerful sports car with exceptional acceleration.',
    'An eco-friendly electric vehicle with a long range.',
    'A family-friendly minivan with ample seating and storage.',
    'A versatile pickup truck, great for both work and leisure.',
    'A classic car with timeless design and style.',
    'A convertible, perfect for enjoying sunny days on the road.',
    'A rugged 4x4 built for adventure and tough terrain.',
    'A stylish coupe with sleek lines and dynamic performance.',
    'A hybrid vehicle combining efficiency and performance.',
    'A spacious station wagon with a large cargo area.',
    'A high-performance supercar with cutting-edge technology.',
    'A practical and reliable van, ideal for transporting goods.',
    'A compact crossover with a sporty feel and ample space.',
    'A vintage car with a rich history and character.',
    'A sleek and modern sedan with advanced safety features.',
    'A durable and powerful truck, perfect for heavy-duty tasks.',
    'A luxury SUV with a premium interior and advanced tech.',
    'A nimble and agile roadster, designed for pure driving pleasure.',
    'A versatile compact SUV, great for both city and country roads.',
    'An all-electric compact car, perfect for eco-conscious drivers.',
    'A luxurious and spacious limousine, perfect for special occasions.',
  ];

  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}

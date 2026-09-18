import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialRooms = [
  {
    slug: 'standard-room',
    name: 'Standard Room',
    badge: 'Classic Comfort',
    pricePerNight: 3000.00,
    description: 'A warm and welcoming room designed for comfort and simplicity, ideal for solo travelers or couples.',
    capacity: 2,
    amenities: [
      'Cozy queen bed',
      'Private bathroom',
      'Wi-Fi',
      'Television',
      'Air conditioning',
      'Work desk',
      'Coffee & tea',
      'Toiletries'
    ]
  },
  {
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    badge: 'Elevated Space',
    pricePerNight: 4500.00,
    description: 'Enjoy a little more space and comfort with refined furniture, warm lighting, and carefully selected Filipino-inspired details.',
    capacity: 2,
    amenities: [
      'Larger room',
      'Premium bedding',
      'Private bathroom',
      'Wi-Fi',
      'Television',
      'Work desk',
      'Coffee & tea',
      'Bottled water',
      'Toiletries',
      'Housekeeping'
    ]
  },
  {
    slug: 'studio-room',
    name: 'Studio Room',
    badge: 'Flexible Living',
    pricePerNight: 6500.00,
    description: 'An open and comfortable living space with a small kitchen area, designed for flexibility and longer stays.',
    capacity: 2,
    amenities: [
      'Open living space',
      'Small kitchen',
      'Comfortable bed',
      'Dining area',
      'Private bathroom',
      'Wi-Fi',
      'Air conditioning',
      'Refrigerator',
      'Kitchen facilities',
      'Toiletries'
    ]
  },
  {
    slug: 'junior-suite',
    name: 'Junior Suite',
    badge: 'Relaxed Luxury',
    pricePerNight: 8000.00,
    description: 'A spacious retreat combining a comfortable sleeping area with a cozy sitting space for relaxing, working, and enjoying a more elevated stay.',
    capacity: 3,
    amenities: [
      'Spacious bedroom',
      'Sitting area',
      'Premium bedding',
      'Private bathroom',
      'Work desk',
      'Wi-Fi',
      'Television',
      'Coffee & tea',
      'Bottled water',
      'Toiletries'
    ]
  },
  {
    slug: 'grand-suite',
    name: 'Grand Suite',
    badge: 'Refined Retreat',
    pricePerNight: 10500.00,
    description: 'A generous retreat for guests who value comfort, privacy, and refined surroundings, with separate areas for relaxing and sleeping.',
    capacity: 4,
    amenities: [
      'Spacious bedroom',
      'Separate living area',
      'Premium linens',
      'Lounge furniture',
      'Private bathroom',
      'Work desk',
      'Wi-Fi',
      'Refrigerator',
      'Coffee & tea',
      'Housekeeping'
    ]
  },
  {
    slug: 'presidential-suite',
    name: 'Presidential Suite',
    badge: 'Our Highest Tier',
    pricePerNight: 21500.00,
    description: 'The highest level of accommodation at Gunita Pamana Hotel, designed for an exceptional stay with generous spaces and elevated comfort.',
    capacity: 6,
    amenities: [
      'Multiple bedrooms',
      'Spacious living room',
      'Dining area',
      'Premium furnishings',
      'Luxury bathrooms',
      'Work area',
      'Wi-Fi',
      'Refrigerator',
      'Premium toiletries',
      'Service on request'
    ]
  }
];

async function main() {
  console.log('Seeding Gunita Pamana rooms database...');
  for (const roomData of initialRooms) {
    await prisma.room.upsert({
      where: { slug: roomData.slug },
      update: roomData,
      create: roomData,
    });
  }
  console.log('Seeding complete! 6 rooms created/updated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

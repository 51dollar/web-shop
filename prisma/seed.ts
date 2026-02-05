import { prisma } from "@/lib/prisma";
import { hashSync } from "bcrypt";

async function create() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Admin",
        email: "admin@shop.dev",
        password: hashSync("admin123", 10),
        verified: new Date(),
        role: "ADMIN",
      },
      {
        fullName: "User",
        email: "user@shop.dev",
        password: hashSync("user123", 10),
        verified: new Date(),
        role: "USER",
      },
    ],
  });

  const apple = await prisma.category.create({
    data: { name: "Apple" },
  });

  const samsung = await prisma.category.create({
    data: { name: "Samsung" },
  });

  await prisma.product.create({
    data: {
      name: "iPhone 16е",
      imageUrl:
        "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
      categoryId: apple.id,
      variants: {
        create: [
          {
            color: "Black",
            storage: 128,
            price: 1599,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
          {
            color: "White",
            storage: 256,
            price: 1799,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.1,
          displayType: "OLED",
          resolution: "2556x1179",
          processor: "A18",
          ram: 8,
          battery: 3300,
          mainCamera: "48 MP",
          frontCamera: "12 MP",
          os: "iOS",
          releaseYear: 2024,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Galaxy S25",
      imageUrl:
        "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$",
      categoryId: samsung.id,
      variants: {
        create: [
          {
            color: "Silver",
            storage: 128,
            price: 1999,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$",
          },
          {
            color: "Black",
            storage: 256,
            price: 2299,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s731uzwexaa/gallery/us-galaxy-s25-fe-sm-s731-sm-s731uzwexaa-548774647?$product-details-jpg$",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.6,
          displayType: "AMOLED",
          resolution: "3200x1440",
          processor: "Snapdragon Gen 4",
          ram: 12,
          battery: 5000,
          mainCamera: "50 MP",
          frontCamera: "12 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.cart.createMany({
    data: [
      { userId: 1, totalAmount: 0, token: "111" },
      { userId: 2, totalAmount: 0, token: "111" },
    ],
  });

  await prisma.cartItem.createMany({
    data: [
      { productVariantId: 1, cartId: 1, quantity: 1 },
      { productVariantId: 3, cartId: 2, quantity: 1 },
    ],
  });
}

async function remove() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
      "CartItem",
      "Cart",
      "Order",
      "ProductVariant",
      "Specifications",
      "Product",
      "Category",
      "VerificationCode",
      "User"
    RESTART IDENTITY CASCADE;
  `);
}

async function main() {
  try {
    await remove();
    await create();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

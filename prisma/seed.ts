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

  const [apple, samsung, google, xiaomi] = await Promise.all([
    prisma.category.create({data: {name: "Apple"}}),
    prisma.category.create({data: {name: "Samsung"}}),
    prisma.category.create({data: {name: "Google"}}),
    prisma.category.create({data: {name: "Xiaomi"}}),
  ]);

  await prisma.product.create({
    data: {
      name: "iPhone 16 Pro",
      imageUrl:
        "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
      categoryId: apple.id,
      description: "Ultimate flagship iPhone",
      variants: {
        create: [
          {
            color: "Black",
            storage: 256,
            price: 3599,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
          {
            color: "White",
            storage: 512,
            price: 4499,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.3,
          displayType: "OLED",
          resolution: "2622x1206",
          processor: "A18 Pro",
          ram: 8,
          battery: 3400,
          mainCamera: "48 MP",
          frontCamera: "12 MP",
          os: "iOS",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "iPhone 16",
      imageUrl:
        "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
      categoryId: apple.id,
      description: "Next generation iPhone",
      variants: {
        create: [
          {
            color: "Blue",
            storage: 128,
            price: 2299,
            imageUrl:
              "https://www.apple.com/v/iphone-17/d/images/overview/contrast/iphone_17__ck7zzemcw37m_large.jpg",
          },
          {
            color: "Blue",
            storage: 256,
            price: 2499,
            imageUrl:
              "https://www.apple.com/v/iphone-17/d/images/overview/contrast/iphone_17__ck7zzemcw37m_large.jpg",
          },
          {
            color: "Blue",
            storage: 512,
            price: 2699,
            imageUrl:
              "https://www.apple.com/v/iphone-17/d/images/overview/contrast/iphone_17__ck7zzemcw37m_large.jpg",
          },
          {
            color: "Black",
            storage: 128,
            price: 2299,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
          {
            color: "Black",
            storage: 256,
            price: 2499,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
          {
            color: "Black",
            storage: 512,
            price: 2699,
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
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "iPhone 16 Plus",
      imageUrl:
        "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
      categoryId: apple.id,
      description: "Bigger display, bigger battery",
      variants: {
        create: [
          {
            color: "Black",
            storage: 128,
            price: 2499,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
          {
            color: "Pink",
            storage: 256,
            price: 2899,
            imageUrl:
              "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.7,
          displayType: "OLED",
          resolution: "2796x1290",
          processor: "A18",
          ram: 8,
          battery: 4300,
          mainCamera: "48 MP",
          frontCamera: "12 MP",
          os: "iOS",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "iPhone 16e",
      imageUrl:
        "https://www.apple.com/v/iphone-16e/f/images/overview/contrast/iphone_16e__dxha4illuf2a_xlarge_2x.jpg",
      categoryId: apple.id,
      description: "Affordable iPhone",
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
          ram: 6,
          battery: 3200,
          mainCamera: "48 MP",
          frontCamera: "12 MP",
          os: "iOS",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Galaxy S25 Ultra",
      imageUrl:
        "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
      categoryId: samsung.id,
      description: "Samsung flagship beast",
      variants: {
        create: [
          {
            color: "Titanium",
            storage: 256,
            price: 2999,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
          },
          {
            color: "Black",
            storage: 512,
            price: 3399,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.8,
          displayType: "AMOLED",
          resolution: "3200x1440",
          processor: "Snapdragon Gen 4",
          ram: 12,
          battery: 5000,
          mainCamera: "200 MP",
          frontCamera: "12 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Galaxy S25",
      imageUrl:
        "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
      categoryId: samsung.id,
      description: "Balanced flagship",
      variants: {
        create: [
          {
            color: "Silver",
            storage: 128,
            price: 1999,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
          },
          {
            color: "Black",
            storage: 256,
            price: 2299,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
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
          battery: 4800,
          mainCamera: "50 MP",
          frontCamera: "12 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Galaxy S25+",
      imageUrl:
        "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
      categoryId: samsung.id,
      description: "Bigger battery and display",
      variants: {
        create: [
          {
            color: "Blue",
            storage: 256,
            price: 2399,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
          },
          {
            color: "Black",
            storage: 512,
            price: 2899,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.7,
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

  await prisma.product.create({
    data: {
      name: "Galaxy S25 FE",
      imageUrl:
        "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
      categoryId: samsung.id,
      description: "Fan edition affordable flagship",
      variants: {
        create: [
          {
            color: "Green",
            storage: 128,
            price: 1599,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
          },
          {
            color: "Black",
            storage: 256,
            price: 1799,
            imageUrl:
              "https://images.samsung.com/is/image/samsung/p6pim/us/sm-s938uakexaa/gallery/us-galaxy-s25-s938-536276-sm-s938uakexaa-548617075?$product-details-jpg$",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.6,
          displayType: "AMOLED",
          resolution: "2400x1080",
          processor: "Exynos 2500",
          ram: 8,
          battery: 4800,
          mainCamera: "50 MP",
          frontCamera: "12 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Pixel 9 Pro",
      imageUrl:
        "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
      categoryId: google.id,
      description: "Google flagship with AI power",
      variants: {
        create: [
          {
            color: "Obsidian",
            storage: 256,
            price: 2399,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
          {
            color: "Porcelain",
            storage: 512,
            price: 2699,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.7,
          displayType: "OLED",
          resolution: "2992x1344",
          processor: "Tensor G4",
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

  await prisma.product.create({
    data: {
      name: "Pixel 9",
      imageUrl:
        "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
      categoryId: google.id,
      description: "Pure Android experience",
      variants: {
        create: [
          {
            color: "Black",
            storage: 128,
            price: 2499,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
          {
            color: "White",
            storage: 256,
            price: 2799,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.3,
          displayType: "OLED",
          resolution: "2400x1080",
          processor: "Tensor G4",
          ram: 8,
          battery: 4700,
          mainCamera: "50 MP",
          frontCamera: "10 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Pixel 9 Pro XL",
      imageUrl:
        "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
      categoryId: google.id,
      description: "Bigger display, more power",
      variants: {
        create: [
          {
            color: "Gray",
            storage: 256,
            price: 2799,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
          {
            color: "Black",
            storage: 512,
            price: 3299,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.8,
          displayType: "OLED",
          resolution: "3120x1440",
          processor: "Tensor G4",
          ram: 12,
          battery: 5200,
          mainCamera: "50 MP",
          frontCamera: "12 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Pixel 9a",
      imageUrl:
        "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
      categoryId: google.id,
      description: "Affordable Pixel",
      variants: {
        create: [
          {
            color: "Blue",
            storage: 128,
            price: 1399,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
          {
            color: "Black",
            storage: 256,
            price: 1499,
            imageUrl:
              "https://lh3.googleusercontent.com/A-q-HRIUI7U9cjSmPK6s77SQrbFxnJC84MvYoIlEiXiWoHeGJXnifDn7t1EQI3-VE4FPLwApZqgKJxn3Pw7sWpBpf1-3jjAeBw=s4092-w4092-e365-rw-v0-nu",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.1,
          displayType: "OLED",
          resolution: "2400x1080",
          processor: "Tensor G4 Lite",
          ram: 8,
          battery: 4500,
          mainCamera: "48 MP",
          frontCamera: "10 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Xiaomi 14 Ultra",
      imageUrl:
        "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
      categoryId: xiaomi.id,
      description: "Ultimate Xiaomi flagship",
      variants: {
        create: [
          {
            color: "Black",
            storage: 256,
            price: 2299,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
          {
            color: "White",
            storage: 512,
            price: 2599,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.73,
          displayType: "AMOLED",
          resolution: "3200x1440",
          processor: "Snapdragon 8 Gen 3",
          ram: 12,
          battery: 5300,
          mainCamera: "50 MP",
          frontCamera: "32 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Xiaomi 14",
      imageUrl:
        "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
      categoryId: xiaomi.id,
      description: "Compact flagship",
      variants: {
        create: [
          {
            color: "Green",
            storage: 128,
            price: 1699,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
          {
            color: "Black",
            storage: 256,
            price: 2099,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.36,
          displayType: "AMOLED",
          resolution: "2670x1200",
          processor: "Snapdragon 8 Gen 3",
          ram: 8,
          battery: 4610,
          mainCamera: "50 MP",
          frontCamera: "32 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Xiaomi Note 14 Pro",
      imageUrl:
        "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
      categoryId: xiaomi.id,
      description: "Pro performance and camera",
      variants: {
        create: [
          {
            color: "Black",
            storage: 256,
            price: 1499,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
          {
            color: "Silver",
            storage: 512,
            price: 1699,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.73,
          displayType: "AMOLED",
          resolution: "3200x1440",
          processor: "Snapdragon 8 Gen 3",
          ram: 12,
          battery: 5000,
          mainCamera: "50 MP",
          frontCamera: "32 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.product.create({
    data: {
      name: "Xiaomi Note 14 Lite",
      imageUrl:
        "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
      categoryId: xiaomi.id,
      description: "Affordable performance",
      variants: {
        create: [
          {
            color: "Blue",
            storage: 128,
            price: 799,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
          {
            color: "Black",
            storage: 256,
            price: 1099,
            imageUrl:
              "https://i05.appmifile.com/856_item_uk/21/02/2024/d0d81f33dec4af6db73cdf0cc6a02d3a.png?thumb=1&f=webp&q=85",
          },
        ],
      },
      specifications: {
        create: {
          displaySize: 6.55,
          displayType: "AMOLED",
          resolution: "2400x1080",
          processor: "Snapdragon 7 Gen 3",
          ram: 8,
          battery: 4700,
          mainCamera: "50 MP",
          frontCamera: "16 MP",
          os: "Android",
          releaseYear: 2025,
        },
      },
    },
  });

  await prisma.cart.createMany({
    data: [
      {userId: 1, totalAmount: 0, token: "111"},
      {userId: 2, totalAmount: 0, token: "111"},
    ],
  });

  await prisma.cartItem.createMany({
    data: [
      {productVariantId: 1, cartId: 1, quantity: 1},
      {productVariantId: 3, cartId: 2, quantity: 1},
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

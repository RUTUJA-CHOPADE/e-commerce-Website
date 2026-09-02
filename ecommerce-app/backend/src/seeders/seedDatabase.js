const bcrypt = require('bcrypt');
const { sequelize, User, Category, Product } = require('../models');

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Wait for models to sync
    await sequelize.sync({ alter: true });
    console.log('Tables synced.');

    // 1. Define All 17 Categories + Parents
    const categoriesData = [
      // Men Categories
      { name: "Men's T-Shirts", description: "Casual and stylish T-shirts for men" },
      { name: "Men's Shirts", description: "Casual and formal shirts for men" },
      { name: "Men's Jeans", description: "Denim jeans for men" },
      { name: "Men's Trousers", description: "Chinos, formals, and casual trousers for men" },
      { name: "Men's Jackets", description: "Stylish coats and jackets for men" },
      { name: "Men's Hoodies", description: "Warm hoodies and sweatshirts for men" },
      { name: "Men's Shoes", description: "Sneakers, boots, loafers, and sports shoes for men" },
      { name: "Men's Accessories", description: "Watches, belts, sunglasses, and wallets for men" },

      // Women Categories
      { name: "Women's T-Shirts", description: "Comfortable and trendy T-shirts for women" },
      { name: "Women's Tops", description: "Fashionable tops and blouses for women" },
      { name: "Women's Shirts", description: "Button-down shirts for women" },
      { name: "Women's Jeans", description: "High-waist, slim fit, and denim jeans for women" },
      { name: "Women's Dresses", description: "Floral, evening, and summer dresses for women" },
      { name: "Women's Trousers", description: "Formal and relaxed trousers for women" },
      { name: "Women's Jackets", description: "Coats, denim, and leather jackets for women" },
      { name: "Women's Shoes", description: "Heels, sneakers, flats, and boots for women" },
      { name: "Women's Accessories", description: "Handbags, jewelry, scarves, and watches for women" }
    ];

    const categoryMap = {};
    for (const cat of categoriesData) {
      const [categoryInstance] = await Category.findOrCreate({
        where: { name: cat.name },
        defaults: cat
      });
      categoryMap[cat.name] = categoryInstance.id;
    }
    console.log('Categories created successfully');

    // 2. Define 75+ Products
    const productsData = [
      // ========================== MEN'S T-SHIRTS (5) ==========================
      {
        category_name: "Men's T-Shirts",
        name: "Men's Classic Black Crewneck Tee",
        description: "100% premium combed cotton breathable t-shirt for daily comfort.",
        price: 699,
        stock: 50,
        size: "S,M,L,XL,XXL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 140
      },
      {
        category_name: "Men's T-Shirts",
        name: "Men's Pure White Minimalist Tee",
        description: "Essential white organic cotton t-shirt with modern slim fit.",
        price: 599,
        stock: 65,
        size: "S,M,L,XL",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 210
      },
      {
        category_name: "Men's T-Shirts",
        name: "Men's Graphic Vintage Print T-Shirt",
        description: "Retro streetwear graphic tee printed on soft washed cotton fabric.",
        price: 899,
        stock: 35,
        size: "M,L,XL,XXL",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 95
      },
      {
        category_name: "Men's T-Shirts",
        name: "Men's Navy Blue Polo T-Shirt",
        description: "Pique cotton polo t-shirt with ribbed collar and subtle chest embroidery.",
        price: 999,
        stock: 40,
        size: "S,M,L,XL",
        color: "Navy",
        image_url: "https://images.unsplash.com/photo-1625910513413-4ec2b12395b0?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 180
      },
      {
        category_name: "Men's T-Shirts",
        name: "Men's Olive Green Oversized Tee",
        description: "Heavyweight drop-shoulder oversized t-shirt for contemporary streetwear look.",
        price: 799,
        stock: 30,
        size: "M,L,XL",
        color: "Green",
        image_url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
        rating: 4.4,
        review_count: 88
      },

      // ========================== MEN'S SHIRTS (5) ==========================
      {
        category_name: "Men's Shirts",
        name: "Men's Slim Fit Light Blue Denim Shirt",
        description: "Durable cotton denim shirt styled with classic pearl snap buttons.",
        price: 1499,
        stock: 25,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 130
      },
      {
        category_name: "Men's Shirts",
        name: "Men's White Formal Oxford Shirt",
        description: "Wrinkle-resistant crisp oxford dress shirt engineered for corporate sharp look.",
        price: 1299,
        stock: 50,
        size: "S,M,L,XL,XXL",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 310
      },
      {
        category_name: "Men's Shirts",
        name: "Men's Plaid Flannel Casual Shirt",
        description: "Warm brushed cotton flannel shirt featuring classic red and navy tartan pattern.",
        price: 1399,
        stock: 30,
        size: "M,L,XL",
        color: "Red",
        image_url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 175
      },
      {
        category_name: "Men's Shirts",
        name: "Men's Linen Breathable Summer Shirt",
        description: "Lightweight 100% pure linen casual shirt for hot weather and beach vacations.",
        price: 1799,
        stock: 20,
        size: "S,M,L,XL",
        color: "Beige",
        image_url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 140
      },
      {
        category_name: "Men's Shirts",
        name: "Men's Charcoal Black Casual Shirt",
        description: "Dark washed casual shirt with spread collar and double patch pockets.",
        price: 1199,
        stock: 35,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 90
      },

      // ========================== MEN'S JEANS (5) ==========================
      {
        category_name: "Men's Jeans",
        name: "Men's Regular Fit Blue Jeans",
        description: "Classic 5-pocket blue denim jeans with sturdy stretch fabric.",
        price: 1799,
        stock: 45,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 260
      },
      {
        category_name: "Men's Jeans",
        name: "Men's Slim Fit Dark Charcoal Jeans",
        description: "Modern tapered slim-fit jeans in deep charcoal wash.",
        price: 1999,
        stock: 35,
        size: "M,L,XL,XXL",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 190
      },
      {
        category_name: "Men's Jeans",
        name: "Men's Black Distressed Denim Jeans",
        description: "Edgy black stretch denim jeans styled with knee rip detailing.",
        price: 2199,
        stock: 20,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 110
      },
      {
        category_name: "Men's Jeans",
        name: "Men's Straight Leg Vintage Wash Jeans",
        description: "Heavyweight authentic vintage washed jeans inspired by 90s heritage style.",
        price: 2299,
        stock: 25,
        size: "M,L,XL",
        color: "Navy",
        image_url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 85
      },
      {
        category_name: "Men's Jeans",
        name: "Men's Light Indigo Skinny Fit Jeans",
        description: "Super stretch light blue denim engineered for maximum flexibility.",
        price: 1699,
        stock: 40,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80",
        rating: 4.4,
        review_count: 150
      },

      // ========================== MEN'S TROUSERS (5) ==========================
      {
        category_name: "Men's Trousers",
        name: "Men's Slim Fit Khaki Chino Trousers",
        description: "Versatile stretch cotton chino trousers for semi-formal and casual wear.",
        price: 1499,
        stock: 50,
        size: "S,M,L,XL,XXL",
        color: "Beige",
        image_url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 220
      },
      {
        category_name: "Men's Trousers",
        name: "Men's Navy Blue Formal Dress Trousers",
        description: "Tailored formal trousers made from wrinkle-free poly-viscose blend fabric.",
        price: 1899,
        stock: 30,
        size: "M,L,XL",
        color: "Navy",
        image_url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 140
      },
      {
        category_name: "Men's Trousers",
        name: "Men's Black Tactical Cargo Trousers",
        description: "Utility cargo pants with multiple flap pockets and drawstring hem ankles.",
        price: 1999,
        stock: 25,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 160
      },
      {
        category_name: "Men's Trousers",
        name: "Men's Olive Relaxed Fit Trousers",
        description: "Comfortable breathable cotton pants with elastic waistband.",
        price: 1399,
        stock: 35,
        size: "M,L,XL",
        color: "Green",
        image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 95
      },
      {
        category_name: "Men's Trousers",
        name: "Men's Charcoal Grey Checked Trousers",
        description: "Modern plaid pattern formal trousers with slim tapered leg fit.",
        price: 1799,
        stock: 20,
        size: "S,M,L,XL",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 115
      },

      // ========================== MEN'S JACKETS (3) ==========================
      {
        category_name: "Men's Jackets",
        name: "Men's Casual Blue Bomber Jacket",
        description: "Lightweight windproof bomber jacket with ribbed collar and zip closure.",
        price: 2499,
        stock: 20,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 195
      },
      {
        category_name: "Men's Jackets",
        name: "Men's Genuine Black Leather Biker Jacket",
        description: "Rugged asymmetrical leather jacket with metallic zippers and quilted lining.",
        price: 4999,
        stock: 12,
        size: "M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 280
      },
      {
        category_name: "Men's Jackets",
        name: "Men's Classic Tan Puffer Jacket",
        description: "Insulated winter puffer jacket featuring high collar and thermal insulation.",
        price: 2999,
        stock: 18,
        size: "S,M,L,XL,XXL",
        color: "Brown",
        image_url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 140
      },

      // ========================== MEN'S HOODIES (3) ==========================
      {
        category_name: "Men's Hoodies",
        name: "Men's Heavyweight Black Fleece Hoodie",
        description: "Cozy fleece-lined hoodie with kangaroo pouch pocket and sturdy drawstring.",
        price: 1699,
        stock: 35,
        size: "S,M,L,XL,XXL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 230
      },
      {
        category_name: "Men's Hoodies",
        name: "Men's Grey Melange Zip-Up Hoodie",
        description: "Versatile athletic zip-up hoodie crafted from ultra-soft cotton terry.",
        price: 1899,
        stock: 25,
        size: "M,L,XL",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 150
      },
      {
        category_name: "Men's Hoodies",
        name: "Men's Olive Oversized Graphic Sweatshirt",
        description: "Streetwear minimalist crewneck sweatshirt with dropped shoulders.",
        price: 1599,
        stock: 30,
        size: "S,M,L,XL",
        color: "Green",
        image_url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 95
      },

      // ========================== MEN'S SHOES (5) ==========================
      {
        category_name: "Men's Shoes",
        name: "Men's White Leather Running Sneakers",
        description: "Lightweight cushioned sneakers with ergonomic soles for everyday running.",
        price: 2199,
        stock: 40,
        size: "6,7,8,9,10,11",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 420
      },
      {
        category_name: "Men's Shoes",
        name: "Men's Handcrafted Brown Leather Loafers",
        description: "Elegant full-grain leather slip-on loafers perfect for formal events.",
        price: 2999,
        stock: 20,
        size: "7,8,9,10,11",
        color: "Brown",
        image_url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 180
      },
      {
        category_name: "Men's Shoes",
        name: "Men's Black High-Top Canvas Sneakers",
        description: "Timeless rubber sole canvas high-top shoes for casual streetwear styling.",
        price: 1599,
        stock: 50,
        size: "6,7,8,9,10,11",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 270
      },
      {
        category_name: "Men's Shoes",
        name: "Men's Waterproof Chelsea Leather Boots",
        description: "Classic elastic side panel leather Chelsea boots with non-slip traction soles.",
        price: 3499,
        stock: 15,
        size: "7,8,9,10,11",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 135
      },
      {
        category_name: "Men's Shoes",
        name: "Men's Performance Athletic Training Shoes",
        description: "Breathable mesh upper training shoes designed for intensive gym workouts.",
        price: 2499,
        stock: 35,
        size: "7,8,9,10,11",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 210
      },

      // ========================== MEN'S ACCESSORIES (3) ==========================
      {
        category_name: "Men's Accessories",
        name: "Men's Chronograph Stainless Steel Watch",
        description: "Precision quartz movement metallic watch with scratch-resistant glass face.",
        price: 3999,
        stock: 15,
        size: "One Size",
        color: "Navy",
        image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 310
      },
      {
        category_name: "Men's Accessories",
        name: "Men's Genuine Leather Bifold Wallet",
        description: "Slim RFID-blocking genuine leather wallet with multiple card slots.",
        price: 899,
        stock: 60,
        size: "One Size",
        color: "Brown",
        image_url: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 450
      },
      {
        category_name: "Men's Accessories",
        name: "Men's Polarized Matte Black Sunglasses",
        description: "UV400 protection lightweight aviator sunglasses with durable metal frames.",
        price: 1199,
        stock: 45,
        size: "One Size",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 190
      },

      // =======================================================================
      // ========================== WOMEN'S T-SHIRTS (5) ==========================
      // =======================================================================
      {
        category_name: "Women's T-Shirts",
        name: "Women's Pure White Organic Cotton Tee",
        description: "Ultra-soft daily essential crewneck t-shirt made with 100% organic cotton.",
        price: 599,
        stock: 60,
        size: "S,M,L,XL,XXL",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 290
      },
      {
        category_name: "Women's T-Shirts",
        name: "Women's Pastel Pink Cropped T-Shirt",
        description: "Trendy relaxed crop top t-shirt styled with rolled cuffs.",
        price: 699,
        stock: 40,
        size: "S,M,L,XL",
        color: "Pink",
        image_url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 180
      },
      {
        category_name: "Women's T-Shirts",
        name: "Women's Graphic Botanical Print Tee",
        description: "Chic floral graphic design printed on soft breathable cotton blend fabric.",
        price: 799,
        stock: 35,
        size: "S,M,L,XL",
        color: "Beige",
        image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 110
      },
      {
        category_name: "Women's T-Shirts",
        name: "Women's Black Oversized Graphic Tee",
        description: "Vintage vintage washed black oversized t-shirt for effortless casual vibes.",
        price: 899,
        stock: 30,
        size: "S,M,L,XL,XXL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 95
      },
      {
        category_name: "Women's T-Shirts",
        name: "Women's Striped Nautical Crewneck Tee",
        description: "Classic blue and white Breton horizontal stripe short sleeve t-shirt.",
        price: 649,
        stock: 45,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 160
      },

      // ========================== WOMEN'S TOPS (5) ==========================
      {
        category_name: "Women's Tops",
        name: "Women's Elegant Floral Chiffon Top",
        description: "Flowy sheer chiffon blouse with delicate ruffle collar and cuff detail.",
        price: 799,
        stock: 35,
        size: "S,M,L,XL",
        color: "Cream",
        image_url: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 240
      },
      {
        category_name: "Women's Tops",
        name: "Women's Ribbed Knit Tank Top",
        description: "Form-fitting stretchy ribbed cotton sleeveless tank top.",
        price: 499,
        stock: 55,
        size: "S,M,L",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 310
      },
      {
        category_name: "Women's Tops",
        name: "Women's Satin Peplum Party Top",
        description: "Luxurious glossy satin blouse with flared peplum hem and deep V-neckline.",
        price: 1199,
        stock: 20,
        size: "S,M,L,XL",
        color: "Red",
        image_url: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 145
      },
      {
        category_name: "Women's Tops",
        name: "Women's Puff Sleeve Casual Blouse",
        description: "Vintage-inspired square neck blouse featuring romantic puff sleeves.",
        price: 899,
        stock: 40,
        size: "S,M,L,XL",
        color: "Pink",
        image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 175
      },
      {
        category_name: "Women's Tops",
        name: "Women's Off-Shoulder Summer Top",
        description: "Lightweight elasticated off-shoulder top designed for sunny outings.",
        price: 699,
        stock: 25,
        size: "S,M,L",
        color: "Beige",
        image_url: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 80
      },

      // ========================== WOMEN'S SHIRTS (5) ==========================
      {
        category_name: "Women's Shirts",
        name: "Women's Oversized White Linen Shirt",
        description: "Relaxed fit pure linen button-down shirt ideal for effortless chic layering.",
        price: 1399,
        stock: 30,
        size: "S,M,L,XL,XXL",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 210
      },
      {
        category_name: "Women's Shirts",
        name: "Women's Blue Striped Formal Shirt",
        description: "Professional vertical pinstripe cotton shirt tailored for office wear.",
        price: 1199,
        stock: 40,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 155
      },
      {
        category_name: "Women's Shirts",
        name: "Women's Black Silk-Blend Satin Shirt",
        description: "Silky smooth button-up shirt offering high shine finish and elegant drape.",
        price: 1699,
        stock: 20,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1588359348347-9bc6cbaa689e?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 190
      },
      {
        category_name: "Women's Shirts",
        name: "Women's Olive Corduroy Overshirt",
        description: "Cozy fine-wale corduroy shirt featuring chest pockets and curved hemline.",
        price: 1599,
        stock: 25,
        size: "S,M,L,XL",
        color: "Green",
        image_url: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 105
      },
      {
        category_name: "Women's Shirts",
        name: "Women's Plaid Flannel Casual Shirt",
        description: "Soft brushed flannel shirt in warm autumn check pattern.",
        price: 1299,
        stock: 35,
        size: "S,M,L,XL",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 120
      },

      // ========================== WOMEN'S JEANS (5) ==========================
      {
        category_name: "Women's Jeans",
        name: "Women's High Waist Light Blue Skinny Jeans",
        description: "Super stretch denim pants designed to sculpt and accentuate your figure.",
        price: 1899,
        stock: 45,
        size: "S,M,L,XL,XXL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 340
      },
      {
        category_name: "Women's Jeans",
        name: "Women's Mom Fit Vintage Wash Jeans",
        description: "High-rise relaxed fit rigid cotton denim with authentic 90s vintage wash.",
        price: 1999,
        stock: 30,
        size: "S,M,L,XL",
        color: "Navy",
        image_url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 270
      },
      {
        category_name: "Women's Jeans",
        name: "Women's Wide Leg Black Flare Jeans",
        description: "Trendy wide-leg high waisted black denim jeans with subtle flare cuffs.",
        price: 2199,
        stock: 25,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 160
      },
      {
        category_name: "Women's Jeans",
        name: "Women's Straight Ankle Cut White Jeans",
        description: "Crisp white denim trousers featuring clean straight leg cut and high waist.",
        price: 1799,
        stock: 35,
        size: "S,M,L,XL",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 110
      },
      {
        category_name: "Women's Jeans",
        name: "Women's Ripped Knee Boyfriend Jeans",
        description: "Casual slouchy boyfriend jeans with distressed knees and raw hem.",
        price: 1999,
        stock: 20,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1542272604-780c36856842?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 140
      },

      // ========================== WOMEN'S DRESSES (5) ==========================
      {
        category_name: "Women's Dresses",
        name: "Women's Floral Summer Wrap Dress",
        description: "Vibrant botanical print V-neck wrap dress with cascading ruffle skirt hem.",
        price: 1499,
        stock: 30,
        size: "S,M,L,XL",
        color: "Pink",
        image_url: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 380
      },
      {
        category_name: "Women's Dresses",
        name: "Women's Little Black Evening Dress",
        description: "Sleek bodycon knee-length black dress crafted for cocktail parties.",
        price: 1899,
        stock: 25,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 220
      },
      {
        category_name: "Women's Dresses",
        name: "Women's White Tiered Maxi Dress",
        description: "Breezy bohemian style maxi dress with delicate lace insert trims.",
        price: 2299,
        stock: 18,
        size: "S,M,L,XL",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 195
      },
      {
        category_name: "Women's Dresses",
        name: "Women's Emerald Green Satin Slip Dress",
        description: "Elegant bias-cut glossy satin midi dress with adjustable spaghetti straps.",
        price: 2499,
        stock: 15,
        size: "S,M,L",
        color: "Green",
        image_url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 140
      },
      {
        category_name: "Women's Dresses",
        name: "Women's Casual Ribbed Bodycon Midi Dress",
        description: "Stretchy comfortable long-sleeve knit midi dress for everyday styling.",
        price: 1299,
        stock: 40,
        size: "S,M,L,XL",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 105
      },

      // ========================== WOMEN'S TROUSERS (5) ==========================
      {
        category_name: "Women's Trousers",
        name: "Women's High Waist Beige Wide Leg Trousers",
        description: "Sophisticated pleated formal trousers with tailored wide leg silhouette.",
        price: 1699,
        stock: 35,
        size: "S,M,L,XL,XXL",
        color: "Beige",
        image_url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 200
      },
      {
        category_name: "Women's Trousers",
        name: "Women's Black Slim Fit Cigarette Trousers",
        description: "Ankle-length professional work pants engineered from stretch fabric.",
        price: 1499,
        stock: 45,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 240
      },
      {
        category_name: "Women's Trousers",
        name: "Women's Navy Blue Paperbag Waist Trousers",
        description: "Chic paperbag high-rise pants featuring matching tie fabric belt.",
        price: 1599,
        stock: 25,
        size: "S,M,L,XL",
        color: "Navy",
        image_url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 130
      },
      {
        category_name: "Women's Trousers",
        name: "Women's Relaxed Linen Blend Pants",
        description: "Ultra lightweight elastic waist pants crafted for hot tropical climate.",
        price: 1399,
        stock: 30,
        size: "S,M,L,XL",
        color: "Cream",
        image_url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 170
      },
      {
        category_name: "Women's Trousers",
        name: "Women's Plaid Tailored Smart Trousers",
        description: "Classic houndstooth grid print formal trousers with side pockets.",
        price: 1799,
        stock: 20,
        size: "S,M,L,XL",
        color: "Grey",
        image_url: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80",
        rating: 4.5,
        review_count: 85
      },

      // ========================== WOMEN'S JACKETS (3) ==========================
      {
        category_name: "Women's Jackets",
        name: "Women's Oversized Denim Jacket",
        description: "Classic blue denim jacket styled with dropped shoulders and button closures.",
        price: 2299,
        stock: 30,
        size: "S,M,L,XL",
        color: "Blue",
        image_url: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 260
      },
      {
        category_name: "Women's Jackets",
        name: "Women's Tailored Double Breasted Blazer",
        description: "Sharp corporate blazer featuring notch lapels and metallic buttons.",
        price: 2799,
        stock: 20,
        size: "S,M,L,XL",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 185
      },
      {
        category_name: "Women's Jackets",
        name: "Women's Camel Faux Suede Biker Jacket",
        description: "Plush faux suede jacket with asymmetrical zip and belt buckle detailing.",
        price: 3299,
        stock: 15,
        size: "S,M,L",
        color: "Beige",
        image_url: "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 120
      },

      // ========================== WOMEN'S SHOES (5) ==========================
      {
        category_name: "Women's Shoes",
        name: "Women's Casual White Chunky Sneakers",
        description: "Modern platform lifestyle sneakers designed with cushioned insoles.",
        price: 1999,
        stock: 45,
        size: "6,7,8,9,10",
        color: "White",
        image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 480
      },
      {
        category_name: "Women's Shoes",
        name: "Women's Classic Black Stiletto Heels",
        description: "Pointed toe high heels crafted from sleek patent leather.",
        price: 2499,
        stock: 25,
        size: "6,7,8,9,10",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 210
      },
      {
        category_name: "Women's Shoes",
        name: "Women's Nude Leather Flat Ballerinas",
        description: "Ultra comfortable slip-on ballet flats with padded footbeds.",
        price: 1499,
        stock: 35,
        size: "6,7,8,9,10",
        color: "Beige",
        image_url: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=600&q=80",
        rating: 4.6,
        review_count: 160
      },
      {
        category_name: "Women's Shoes",
        name: "Women's Ankle Strap Block Heel Sandals",
        description: "Chic open-toe sandals with comfortable 2.5-inch block heels.",
        price: 1899,
        stock: 30,
        size: "6,7,8,9,10",
        color: "Red",
        image_url: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 140
      },
      {
        category_name: "Women's Shoes",
        name: "Women's Tan Faux Leather Ankle Boots",
        description: "Versatile low heel boots with side zipper for autumn styling.",
        price: 2799,
        stock: 20,
        size: "6,7,8,9,10",
        color: "Brown",
        image_url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 195
      },

      // ========================== WOMEN'S ACCESSORIES (3) ==========================
      {
        category_name: "Women's Accessories",
        name: "Women's Luxury Leather Tote Handbag",
        description: "Spacious Structured genuine leather tote bag with gold-tone hardware.",
        price: 2999,
        stock: 25,
        size: "One Size",
        color: "Black",
        image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        rating: 4.9,
        review_count: 360
      },
      {
        category_name: "Women's Accessories",
        name: "Women's Rose Gold Minimalist Mesh Watch",
        description: "Elegant ultra-thin quartz watch featuring adjustable mesh strap.",
        price: 3299,
        stock: 18,
        size: "One Size",
        color: "Pink",
        image_url: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
        rating: 4.8,
        review_count: 230
      },
      {
        category_name: "Women's Accessories",
        name: "Women's Silk Satin Printed Neck Scarf",
        description: "Soft vintage paisley print square silk scarf for luxury accessorizing.",
        price: 799,
        stock: 50,
        size: "One Size",
        color: "Red",
        image_url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80",
        rating: 4.7,
        review_count: 140
      }
    ];

    let createdCount = 0;
    for (const prodData of productsData) {
      const categoryId = categoryMap[prodData.category_name];
      if (!categoryId) {
        console.warn(`Category not found for: ${prodData.category_name}`);
        continue;
      }

      const [prod, created] = await Product.findOrCreate({
        where: { name: prodData.name },
        defaults: {
          category_id: categoryId,
          name: prodData.name,
          description: prodData.description,
          price: prodData.price,
          stock: prodData.stock,
          size: prodData.size,
          color: prodData.color,
          image_url: prodData.image_url,
          rating: prodData.rating,
          review_count: prodData.review_count
        }
      });

      if (created) createdCount++;
    }

    console.log(`Men products created successfully`);
    console.log(`Women products created successfully`);
    console.log(`Product seeding completed (${createdCount} new products added, ${productsData.length} total active)`);

    // 3. Seed Sample User
    const hashedPassword = await bcrypt.hash('password123', 10);
    await User.findOrCreate({
      where: { email: 'john@example.com' },
      defaults: {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        phone: '9876543210'
      }
    });
    console.log('Sample user verified (email: john@example.com, password: password123).');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

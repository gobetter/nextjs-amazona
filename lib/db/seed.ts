import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

import data from "@/lib/data";
import { connectToDatabase } from ".";
import Product from "./models/product.model";

loadEnvConfig(cwd());

const main = async () => {
  try {
    const { products } = data;
    await connectToDatabase(process.env.MONGODB_URI);

    await Product.deleteMany();
    const createdProducts = await Product.insertMany(products);

    console.log({
      createdProducts,
      message: "Database seeded successfully",
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

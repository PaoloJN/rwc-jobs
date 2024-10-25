
import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
    schema: "./src/database/schema.ts",
    out: "./src/database/db/migrations",
    dialect: "postgresql",
    dbCredentials: { url: env.DATABASE_URL }
});

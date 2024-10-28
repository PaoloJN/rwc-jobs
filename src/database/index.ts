import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { config } from "dotenv";

config({ path: ".env.local" });

export const db = drizzle(sql);

// Applying changes to the database
// You can generate migrations using drizzle-kit generate command and
// then run them using the drizzle-kit migrate command.

// Generate migrations:
// bunx drizzle-kit generate
// Run migrations:
// bunx drizzle-kit migrate

// Alternatively, you can push changes directly to the database using Drizzle kit push command:
// bunx drizzle-kit push
// Launch Drizzle Studio
// bunx drizzle-kit studio

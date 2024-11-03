import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateMigration() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Please provide a migration name");
    console.log("Usage: node generateMigration.js create_users_table");
    process.exit(1);
  }

  const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
  const migrationName = args[0].toLowerCase();
  const fileName = `${timestamp}_${migrationName}.js`;

  const template = `import mongoose from 'mongoose';

export async function up() {
  // Add your migration code here
  // Example:
  // await SomeModel.updateMany({ /* query */ }, { /* update */ });
}

export async function down() {
  // Add your rollback code here
  // Example:
  // await SomeModel.updateMany({ /* query */ }, { /* rollback */ });
}
`;

  const migrationsDir = path.join(__dirname, "..", "migrations");

  try {
    await fs.mkdir(migrationsDir, { recursive: true });
    await fs.writeFile(path.join(migrationsDir, fileName), template);
    console.log(`Created migration: ${fileName}`);
  } catch (error) {
    console.error("Error creating migration:", error);
    process.exit(1);
  }
}

generateMigration();

import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import config from "../../../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationSchema = new mongoose.Schema({
  filename: String,
  appliedAt: { type: Date, default: Date.now },
});

const Migration = mongoose.model("Migration", migrationSchema);

export async function runMigrations(direction = "up", version = null) {
  try {
    await mongoose.connect(config.MONGODB_URI || "", {});
    console.log("Connected to MongoDB");

    const migrationsDir = path.join(__dirname, "..", "migrations");
    await fs.mkdir(migrationsDir, { recursive: true });

    const files = await fs.readdir(migrationsDir);
    let migrationFiles = files.filter(f => f.endsWith(".js"));

    // If version is specified, only run that specific migration
    if (version) {
      migrationFiles = migrationFiles.filter(f => f.includes(version));
      if (migrationFiles.length === 0) {
        throw new Error(`No migration found with version ${version}`);
      }
    }

    migrationFiles.sort((a, b) => (direction === "up" ? a.localeCompare(b) : b.localeCompare(a)));

    for (const file of migrationFiles) {
      if (direction === "up") {
        const applied = await Migration.findOne({ filename: file });
        if (!applied) {
          console.log(`Running migration up: ${file}`);
          const migration = await import(path.join(migrationsDir, file));
          await migration.up();
          await Migration.create({ filename: file });
          console.log(`Completed migration up: ${file}`);
        }
      } else {
        const applied = await Migration.findOne({ filename: file });
        if (applied) {
          console.log(`Running migration down: ${file}`);
          const migration = await import(path.join(migrationsDir, file));
          await migration.down();
          await Migration.deleteOne({ filename: file });
          console.log(`Completed migration down: ${file}`);
        }
      }
    }

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Migration error:", error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

export async function redoMigration(version) {
  if (!version) {
    throw new Error("Version is required for redo");
  }

  await runMigrations("down", version);
  await runMigrations("up", version);
}

// If running directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const command = process.argv[2] || "up";
  const version = process.argv[3];

  switch (command) {
    case "down":
      runMigrations("down", version).catch(console.error);
      break;
    case "redo":
      redoMigration(version).catch(console.error);
      break;
    default:
      runMigrations("up", version).catch(console.error);
  }
}

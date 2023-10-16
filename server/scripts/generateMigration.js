const fs = require("fs");
const path = require("path");

const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
const migrationName = process.argv[2] || "new_migration";
const fileName = `${timestamp}_${migrationName}.js`;

const migrationTemplate = `
module.exports = {
  async up(db, client) {
    // TODO: write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('mycollection').updateMany({a: null}, {$set: {a: ''}});
  },

  async down(db, client) {
    // TODO: write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('mycollection').updateMany({a: ''}, {$set: {a: null}});
  }
};
`;

fs.writeFileSync(path.join(__dirname, "../api/migrations", fileName), migrationTemplate);

console.log(`Generated new migration file: ${fileName}`);

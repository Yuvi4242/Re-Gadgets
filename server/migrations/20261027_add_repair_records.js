import mongoose from 'mongoose';
import dotenv from 'dotenv';
import RepairRecord from '../models/RepairRecord.js';
import RepairBooking from '../models/RepairBooking.js';
import Order from '../models/Order.js';

dotenv.config();

/**
 * Migration: 20261027_add_repair_records
 * Description: Additive migration establishing RepairRecord schema, indexes,
 * and linking fields on RepairBooking and Order.
 */
export async function up() {
  console.log('Running migration UP: 20261027_add_repair_records...');
  
  // Ensure indexes on RepairRecord
  await RepairRecord.createIndexes();
  console.log('Created indexes on RepairRecord collection.');

  // Ensure indexes on RepairBooking and Order
  await RepairBooking.createIndexes();
  await Order.createIndexes();
  console.log('Ensured indexes on RepairBooking and Order.');

  console.log('Migration UP complete.');
}

export async function down() {
  console.log('Running migration DOWN: 20261027_add_repair_records...');
  
  try {
    const collection = mongoose.connection.collection('repairrecords');
    if (collection) {
      await collection.dropIndexes();
      console.log('Dropped indexes on repairrecords collection.');
    }
  } catch (err) {
    console.warn('Notice during DOWN migration:', err.message);
  }

  console.log('Migration DOWN complete.');
}

// Standalone execution support
if (process.argv[1]?.endsWith('20261027_add_repair_records.js')) {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/re-gadgets';
  mongoose.connect(uri)
    .then(async () => {
      if (process.argv[2] === 'down') {
        await down();
      } else {
        await up();
      }
      await mongoose.disconnect();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      process.exit(1);
    });
}

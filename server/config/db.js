import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to MongoDB with connection pooling, cached instance support for serverless,
 * retry logic, and test environment fallback support.
 */
export const connectDB = async (options = {}) => {
  const { maxRetries = 3, retryInterval = 1000 } = options;

  if (process.env.SKIP_DB === 'true') {
    console.log('Skipping MongoDB connection (SKIP_DB=true)');
    return null;
  }

  if (!process.env.MONGO_URI) {
    if (process.env.NODE_ENV === 'test') {
      console.warn('MONGO_URI missing in test environment. Skipping DB connection.');
      return null;
    }
    throw new Error('MONGO_URI environment variable is missing.');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: parseInt(process.env.MONGO_POOL_SIZE, 10) || 10,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = (async () => {
      let attempts = 0;
      while (attempts < maxRetries) {
        try {
          attempts++;
          const mongooseInstance = await mongoose.connect(process.env.MONGO_URI, opts);
          console.log(`MongoDB Connected: ${mongooseInstance.connection.host}`);
          return mongooseInstance;
        } catch (err) {
          if (attempts >= maxRetries) {
            console.error(`Error connecting to MongoDB after ${attempts} attempts: ${err.message}`);
            throw err;
          }
          console.warn(`MongoDB connection attempt ${attempts} failed. Retrying in ${retryInterval}ms...`);
          await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    if (process.env.NODE_ENV === 'test') {
      console.warn(`Test environment: MongoDB connection failed (${e.message}). Proceeding without active DB connection.`);
      return null;
    }
    throw e;
  }

  return cached.conn;
};

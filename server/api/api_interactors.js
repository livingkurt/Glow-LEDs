import mongoose from "mongoose";
import config from "../config.js";
const { MongoClient, ObjectId } = require("mongodb");

export const mongodbFindAllNoPopulate = async (collectionName, options) => {
  const client = await MongoClient.connect(config.MONGODB_URI);
  const db = client.db(config.MONGODB_DATABASE);
  const collection = db.collection(collectionName);

  // For sorting
  const sort = options.sort || {};
  const filter = options.filter || {};

  // For pagination
  const limit = options.limit ? parseInt(options.limit) : 0;
  const skip = options.page ? Math.max(parseInt(options.page), 0) * limit : 0;

  const cursor = collection.find(filter).sort(sort).skip(skip).limit(limit);

  const result = await cursor.toArray();

  client.close(); // Close the connection
  return result;
};

export const mongodbFindAll = async (collectionName, options, populateMap) => {
  const client = await MongoClient.connect(config.MONGODB_URI);
  const db = client.db(config.MONGODB_DATABASE);
  const collection = db.collection(collectionName);

  const sort = options.sort || {};
  const filter = options.filter || {};
  const limit = options.limit ? parseInt(options.limit) : 0;
  const skip = options.page ? Math.max(parseInt(options.page), 0) * limit : 0;

  const cursor = collection.find(filter).sort(sort).skip(skip).limit(limit);
  let result = await cursor.toArray();

  if (populateMap) {
    for (let field in populateMap) {
      const relatedCollectionName = populateMap[field];
      const relatedCollection = db.collection(relatedCollectionName);

      // Filter out null or undefined ids
      const idsToFetch = result.map(doc => new ObjectId(doc[field])).filter(id => id != null);

      const relatedDocs = await relatedCollection.find({ _id: { $in: idsToFetch } }).toArray();

      const idToRelatedDoc = {};
      relatedDocs.forEach(doc => {
        idToRelatedDoc[doc._id.toString()] = doc;
      });

      result = result.map(doc => {
        if (doc[field] == null) {
          return doc;
        }
        return {
          ...doc,
          [field]: idToRelatedDoc[doc[field]?.toString()],
        };
      });
    }
  }
  client.close();
  return result;
};

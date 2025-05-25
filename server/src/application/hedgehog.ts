import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { hedgehogSchema } from "@server/hedgehog";
import { sql } from "slonik";

// When getting hedgehogs, note that location is stored as a ST_Point
// This should be converted to latitude and longitude before returning
export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().any(
      sql.type(hedgehogSchema)`
      SELECT id, name, gender, age, ST_Y(location) as latitude, ST_X(location) as longitude
      FROM hedgehog`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function getHedgehog(id: number) {
  try {
    const hedgehog = await getPool().maybeOne(
      sql.type(hedgehogSchema)`
      SELECT id, name, gender, age, ST_Y(location) as latitude, ST_X(location) as longitude
      FROM hedgehog
      WHERE id = ${id}`
    );

    return hedgehog;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

// Add new hedgehog. Using a spatial type point to store the location
// This is to retain the possibility to use PostGIS functionality in the future 
export async function addHedgehog(name: string, age: number, gender: string, latitude: number, longitude: number) {
  try {
    const newHedgehog = await getPool().one(
      sql.type(hedgehogSchema)`INSERT INTO hedgehog (name, age, gender, location) VALUES (
        ${name}, ${age}, ${gender}, ST_MakePoint(${longitude}, ${latitude})
      ) RETURNING id, name, gender, age, ST_Y(location) as latitude, ST_X(location) as longitude`
    );
    return newHedgehog;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

// Delete function to be able to clean up db. Not implemented front end
export async function deleteHedgehog(id: number) {
  try {
    const deletedHedgehog = await getPool().maybeOne(
      sql.type(hedgehogSchema)`DELETE FROM hedgehog WHERE id = ${id}
            RETURNING id, name, gender, age, ST_Y(location) as latitude, ST_X(location) as longitude`
    );

    // if no hedgehog was found to be deleted by id
    if (!deletedHedgehog) {
      return null;
    }
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
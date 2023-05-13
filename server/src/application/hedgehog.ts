import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { sql } from "slonik";
import { z } from "zod";

async function checkDB(): Promise<any> {
  const checkTime = new Date();
  try {
    const pingResult = await getPool().oneFirst(
      sql.type(z.string())`SELECT 'pong'`
    );
    return {
      status: pingResult === "pong" ? "pass" : "fail",
      time: checkTime,
    };
  } catch (error) {
    logger.error(error);
    return {
      status: "fail",
      time: checkTime,
    };
  }
}

export async function getAllHedgehogs() {
  try {
    const hedgehogs = await getPool().many(
      sql.type(z.number())`SELECT id FROM hedgehogs`
    );

    return hedgehogs;
  } catch (error) {
    logger.error(error);
  }
}

// TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä

// TODO: Yksittäisen siilin lisäämisen sovelluslogiikka

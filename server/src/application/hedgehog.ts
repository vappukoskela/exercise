import { getPool } from "@server/db";
import { logger } from "@server/logging";
import { Hedgehog } from "@shared/hedgehog";
import { sql } from "slonik";
import { z } from "zod";

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

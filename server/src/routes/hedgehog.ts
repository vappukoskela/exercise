import { addHedgehog, deleteHedgehog, getAllHedgehogs, getHedgehog } from "@server/application/hedgehog";
import { Hedgehog } from "@server/hedgehog";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
interface GetHedgehogRequest {
  Params: {
    id: string
  }
}

export function hedgehogRouter(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.get("/", async function (_request, reply) {
    try {
      const hedgehogs = await getAllHedgehogs();
      return reply.code(200).send({
        hedgehogs,
      });
    } catch (error) {
      return reply.code(500).send({ message: "Failed to fetch all hedgehogs" });
    }
  });

  fastify.get("/:id", async function (_request: FastifyRequest<GetHedgehogRequest>, reply: FastifyReply) {
    console.log(_request.params);
    const id = parseInt(_request.params.id, 10);
    try {
      const hedgehog = await getHedgehog(id);
      return reply.code(200).send({
        hedgehog,
      });

    } catch (error) {
      return reply.code(500).send({ message: "Failed to fetch hedgehog by id" });
    }
  });

  fastify.post("/", async function (_request: FastifyRequest<{ Body: Hedgehog }>, reply) {
    const { name, age, gender, latitude, longitude } = _request.body;
    try {
      const hedgehog = await addHedgehog(name, age, gender, latitude, longitude);
      return reply.code(201).send({
        hedgehog,
      });
    } catch (error) {
      return reply.code(500).send({ message: "Failed to add hedgehog" });
    }

  });

  fastify.delete("/:id", async function (_request: FastifyRequest<GetHedgehogRequest>, reply: FastifyReply) {
    const id = parseInt(_request.params.id, 10);
    try {
      await deleteHedgehog(id);
      return reply.code(204).send();
    } catch (error) {
      return reply.code(500).send({ message: "Failed to delete hedgehog" });
    }
  });
  done();
}
export { Hedgehog };


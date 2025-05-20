import { addHedgehog, getAllHedgehogs, getHedgehog } from "@server/application/hedgehog";
import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { Hedgehog } from "@shared/hedgehog";
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
    const hedgehogs = await getAllHedgehogs();

    return reply.code(200).send({
      hedgehogs,
    });
  });

  fastify.get("/:id", async function (_request: FastifyRequest<GetHedgehogRequest>, reply: FastifyReply) {
    console.log(_request.params)
    const id = parseInt(_request.params.id, 10)
    const hedgehog = await getHedgehog(id);

    return reply.code(200).send({
      hedgehog,
    });
  });

  fastify.post("/", async function (_request: FastifyRequest<{ Body: Hedgehog }>, reply) {
    const { name, age, gender, latitude, longitude } = _request.body
    const hedgehog = await addHedgehog(name, age, gender, latitude, longitude)
    return reply.code(201).send({
      hedgehog,
    });
  })

  // TODO: Yksittäisen siilin hakeminen tietokannasta ID:llä
  // fastify.get(...);

  // TODO: Yksittäisen siilin lisäämisen sovelluslogiikka
  // fastify.post(...)

  done();
}

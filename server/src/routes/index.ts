import { healthRouter } from './health';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export function routes(
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) {
  fastify.register(healthRouter, { prefix: '/health' });
  done();
}

import fastify from "fastify";

export const app = fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MMss Z",
				ignore: "pid,hostname",
			},
		},
	},
});

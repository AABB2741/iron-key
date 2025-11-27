import "fastify";

declare module "fastify" {
	export interface FastifyRequest {
		user: {
			id: string;
			email: string;
			name: string;
		};
	}
}

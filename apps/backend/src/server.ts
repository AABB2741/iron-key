import { app } from "./app.ts";

app
	.listen({ port: 3333 })
	.then((host) => console.log("HTTP server running at", host));

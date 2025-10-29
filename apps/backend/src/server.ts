import { app } from "./app.ts";
import { env } from "./env.ts";

app.listen({ port: env.PORT, host: "0.0.0.0" }).then((host) => {
	console.log("HTTP server running at", host);

	if (env.NODE_ENV === "development") {
		console.log("📖 Docs are available at", `${host}/docs`);
	}
});

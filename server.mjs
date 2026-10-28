
import {
  HttpClient,
  startServer,
  AllmangaProvider,
  GogoanimeProvider,
  AnikotoProvider,
  MegaPlayProvider,
  AnimeParadiseProvider,
} from "./dist/index.js";

const token = process.env.API_TOKEN;

if (!token) {
  throw new Error("Missing API_TOKEN environment variable");
}

const http = new HttpClient({ timeoutMs: 25000 });

const providers = [
  new AllmangaProvider(http),
  new GogoanimeProvider(http),
  new AnikotoProvider(http),
  new MegaPlayProvider(http),
  new AnimeParadiseProvider(http),
];

const server = startServer({
  providers,
  port: Number(process.env.PORT || 10000),
  auth: { token },
});

server.on("error", (error) => {
  console.error("Anime-SDK server error:", error);
});

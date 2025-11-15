import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const VISITORS_KEY = "visitors_count";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Increment the visitor count atomically and get updated count
    let count = await redis.incr(VISITORS_KEY);

    res.status(200).json({ count });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

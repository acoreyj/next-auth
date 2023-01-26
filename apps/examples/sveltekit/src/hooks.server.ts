import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import {
  GITHUB_ID,
  GITHUB_SECRET,
  EMAIL_SERVER,
  EMAIL_FROM,
  UPSTASH_REDIS_URL,
  UPSTASH_REDIS_TOKEN,
} from "$env/static/private"
import { Email } from "@auth/core/providers/email"
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: UPSTASH_REDIS_URL,
  token: UPSTASH_REDIS_TOKEN,
})

export const handle = SvelteKitAuth({
  adapter: UpstashRedisAdapter(redis) as any,
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }) as any,
    Email({
      id: "email",
      name: "Email Magic Link",
      server: EMAIL_SERVER as string,
      from: EMAIL_FROM as string,
      type: "email",
      async sendVerificationRequest(params) {
        console.log("params", params)
      },
    }),
  ],
})

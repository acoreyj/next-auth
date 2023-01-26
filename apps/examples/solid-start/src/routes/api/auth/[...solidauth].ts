import { SolidAuth, type SolidAuthConfig } from "@solid-auth/next"
import GitHub from "@auth/core/providers/github"
import { serverEnv } from "~/env/server"
import { type APIEvent } from "solid-start"
import Email from "@auth/core/providers/email"
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: serverEnv.UPSTASH_REDIS_URL,
  token: serverEnv.UPSTASH_REDIS_TOKEN,
})

export const authOpts: SolidAuthConfig = {
  adapter: UpstashRedisAdapter(redis) as any,
  providers: [
    GitHub({
      clientId: serverEnv.GITHUB_ID,
      clientSecret: serverEnv.GITHUB_SECRET,
    }),
    Email({
      id: "email",
      name: "Email Magic Link",
      server: serverEnv.EMAIL_SERVER,
      from: serverEnv.EMAIL_FROM,
      type: "email",
      async sendVerificationRequest(params) {
        console.log("params", params)
      },
    }),
  ],

  debug: true,
}

export const { GET, POST } = SolidAuth(authOpts)

import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import {
  GITHUB_ID,
  GITHUB_SECRET,
  EMAIL_SERVER,
  EMAIL_FROM,
} from "$env/static/private"
import { Email } from "@auth/core/providers/email"

export const handle = SvelteKitAuth({
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
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

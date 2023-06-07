import type { RequestHandler } from "@sveltejs/kit"
import { text, error } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ fetch, cookies }) => {
	const response = await fetch("https://auth.roblox.com", {
		method: "POST",
		headers: {
			cookie: import.meta.env.VITE_COOKIE
		}
	})

	const token = response.headers.get("x-csrf-token")

	if (!token) {
		throw error(500, "Failed to get the token")
	}

	return text(token)
}

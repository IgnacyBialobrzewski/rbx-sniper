import type { RequestHandler } from "@sveltejs/kit"
import { json, error } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ fetch, params }) => {
	const response = await fetch(`https://economy.roblox.com/v1/assets/${params.id}/resellers`, {
		headers: {
			cookie: import.meta.env.VITE_COOKIE
		}
	})

	if (response.ok) {
		return json(await response.json())
	} else {
		throw error(response.status, response.statusText)
	}
}

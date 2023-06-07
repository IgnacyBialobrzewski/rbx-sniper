import type { RequestHandler } from "@sveltejs/kit"
import { json, error } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ fetch, request, cookies }) => {
	const response = await fetch("https://catalog.roblox.com/v1/catalog/items/details", {
		method: "POST",
		headers: {
			cookie: import.meta.env.VITE_COOKIE,
			"x-csrf-token": cookies.get("token") as string
		},
		body: JSON.stringify(await request.json())
	})

	if (response.ok) {
		return json(await response.json())
	} else {
		throw error(response.status, response.statusText)
	}
}

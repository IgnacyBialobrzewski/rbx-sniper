import type { RequestHandler } from "@sveltejs/kit"
import { json, error } from "@sveltejs/kit"

export const POST: RequestHandler = async ({ fetch, params, cookies, request }) => {
	const response = await fetch(`https://economy.roblox.com/v1/purchases/products/${params.id}`, {
		method: "POST",
		headers: {
			cookie: import.meta.env.VITE_COOKIE,
			"content-type": "application/json;charset=UTF-8",
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

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function fetchExternalHtml(url: string, { username, password, fallback = "" }: { username?: string; password?: string; fallback?: string } = {}): Promise<string> {
    try {
        const headers: Record<string, string> = {}

        if (username && password) {
            const auth = Buffer.from(`${username}:${password}`).toString("base64")
            headers["Authorization"] = `Basic ${auth}`
        }

        const res = await fetch(url, { headers })

        if (!res.ok) {
            console.warn(`[fetchExternalHtml] Failed to fetch ${url}. Status: ${res.status}`)
            return fallback
        }

        return await res.text()
    } catch (err) {
        console.error(`[fetchExternalHtml] Error fetching ${url}:`, err)
        return fallback
    }
}

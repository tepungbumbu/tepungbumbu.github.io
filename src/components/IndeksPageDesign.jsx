import { useEffect, useState } from "react"

const IndeksPageDesign = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    // Define your manually added URLs
    const manualUrls = ["404.html"] // Add more URLs as needed

    // Define URLs to exclude
    const excludeUrls = ["indeks-page-design"] // Add more URLs to exclude as needed

    const urlExtract = (url) => {
        const prefix = import.meta.env.BASE_URL
        // If the URL doesn't contain the prefix, return it as-is without modification
        if (!url.includes(prefix)) {
            return url
        }
        const lastIndex = url.lastIndexOf(prefix) + prefix.length
        let getUrl = url.substring(lastIndex)
        // Remove trailing slash if it exists
        getUrl = getUrl.endsWith("/") ? getUrl.slice(0, -1) : getUrl
        // Return "index" if getUrl is empty, or remove the leading slash if present
        return getUrl ? getUrl.replace(/^\//, "") : "index"
    }

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}/sitemap-0.xml`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.text()
            })
            .then((xmlData) => {
                const parser = new DOMParser()
                const xml = parser.parseFromString(xmlData, "application/xml")
                const items = xml.getElementsByTagName("url")

                // Process URLs during data transformation and filter out excluded URLs
                const parsedData = Array.from(items)
                    .map((item) => {
                        const loc = item.getElementsByTagName("loc")[0].textContent
                        const extractedUrl = urlExtract(loc)
                        return {
                            originalLoc: loc,
                            url: extractedUrl,
                            path: extractedUrl === "index" ? "" : `/${extractedUrl}`,
                        }
                    })
                    .filter((item) => !excludeUrls.includes(item.url)) // Filter out excluded URLs

                // Add manual URLs with the same structure
                const processedManualUrls = manualUrls.map((url) => ({
                    originalLoc: url,
                    url: url,
                    path: url === "index" ? "" : `/${url}`,
                }))

                setData([...processedManualUrls, ...parsedData])
            })
            .catch((error) => {
                setError(error)
            })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <ul className="divide-y-[1px] rounded border p-4">
            {data.map((item) => (
                <li key={item.originalLoc} className="">
                    <a href={`${import.meta.env.BASE_URL}${item.path}`} className="block px-3 py-2">
                        {item.url}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default IndeksPageDesign

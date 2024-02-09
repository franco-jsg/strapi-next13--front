import qs from "qs"
import { getStrapiURL } from "./api-helper"

export const fetchApi = async (
    path: string,
    urlPathObject = {},
    options = {}
) => {

    try {
        const mergedOptions = {
            next: {revalidate: 60},
            ...options,
            headers: {
                "Content-Type": "applications-json"
            }
        }

        const queryString = qs.stringify(urlPathObject, {encodeValuesOnly: true}) // el segundo parametro solo es para qu se vea un poco mas limpio el resultado, es opcional

        const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`)}`

        const res = await fetch(requestUrl, mergedOptions)
        const data = await res.json()

        return data
    } catch(error) {
        console.log(error)
        throw new Error("Error fetching API")
    }
}
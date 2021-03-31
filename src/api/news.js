export async function getTopHeadlines() {
    let data
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=d91135e9b304455297ba359cd77365c9', { method: 'GET' })
        data = await response.json()
        if (response.ok) {
            return data
        }
        throw new Error(response.status)
    } catch (err) {
        return Promise.reject(`${err.message} - ${data.message}`)
    }
}

export async function getSearchResults(query, sortBy) {
    let data
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&sortBy=${sortBy}&apiKey=d91135e9b304455297ba359cd77365c9`, { method: 'GET' })
        data = await response.json()
        if (response.ok) {
            return data
        }
        throw new Error(response.status)
    } catch (err) {
        return Promise.reject(`${err.message} - ${data.message}`)
    }
}
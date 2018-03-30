const AK = `AIzaSyAj3oBqPRNQZCJSuOQVb8195Y3tnA62W-0`

export async function fetchBook({ bookId }) {
  const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=id:${bookId}`
  const allUrl = `${baseUrl}&key=${AK}`
  const response = await fetch(`${allUrl}`)
  const data = await response.json()
  if (response.ok) {
    return {
      items: data.items,
      totalItems: data.totalItems,
      isLoaded: true,
    }
  }
  throw new Error(
    `Fetch failed! ${data.message || response.statusText}.
     Status: ${response.status}`
  )
}

export async function fetchData({ searchText, startIndex = 0 }) {
  const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
  const allUrl = `${baseUrl}&key=${AK}&startIndex=${startIndex}`
  const nextIndex = startIndex + 10
  const response = await fetch(`${allUrl}`)
  const data = await response.json()
  if (response.ok) {
    return {
      items: data.items,
      totalItems: data.totalItems,
      isLoaded: true,
      startIndex: nextIndex,
      searchText
    }
  }
  throw new Error(
    `Fetch failed! ${data.message || response.statusText}.
     Status: ${response.status}`
  )
}

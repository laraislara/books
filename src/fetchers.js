
const AK = `AIzaSyAj3oBqPRNQZCJSuOQVb8195Y3tnA62W-0`

export function fetchBook({bookId}) {
  const baseUrl = `https://www.googleapis.com/books/v1/volumes?q=id:${bookId}`
  const allUrl = `${baseUrl}&key=${AK}`
  fetch(`${allUrl}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Ooooops!')
    })
    .then(book => ({
      items: book.items,
      totalItems: book.totalItems,
      isLoaded: true,
    }))
    .catch(error => (
        {error}
      )
    )

}

export async function fetchData({searchText, startIndex = 0}) {
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
    }
  }
  throw new Error(
    `Fetch failed! ${data.message || response.statusText}.
     Status: ${response.status}`
  )
}

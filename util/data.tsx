export async function getData(
  slug: string = '', 
  page: number = 0, 
  points: number = 0,
) {  

  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${slug}&page=${page}&numericFilters=points>=${points}`  

  console.log("=====", points)

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch!')
  }

  return res.json() 

}
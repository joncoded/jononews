const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const nextYear = new Date(currentYear + 1, 0, 1)

export async function getData(
  slug: string = '', 
  page: number = 0, 
  points: number = 50,
  after: number = 0,
  before: number = nextYear.valueOf()
) {  

  const root = `https://hn.algolia.com/api/v1/`
  const endpoint = `search_by_date`
  const tag = `tags=story`
  const term = `&query=${slug}`
  const pg = `&page=${page}`
  const pts = `points>=${points}`
  const earliest = `created_at_i>=${after}`
  const latest = `created_at_i<=${before}`
  const url = `${root}${endpoint}?${tag}${term}${pg}&numericFilters=${pts},${earliest},${latest}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch!')
  }

  return res.json() 

}
async function getData() {

  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch!')
  }

  return res.json() 

}

export default async function Main() {

  const data = await getData()
  
  return (
    <>
      <h1>jononews</h1>
      {data.hits.map(hit => <h2>{hit.title}</h2>)}
    </>
  )

}
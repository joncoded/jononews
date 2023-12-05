import { MainDiv } from "../components/main"
import Link from "next/link"

async function getData(query: string) {

  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${query}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch!')
  }

  return res.json() 

}

interface MainProps {
  searchParams: {
    query: string
  }
}

export default async function Main({searchParams}: MainProps) {

  const { query } = searchParams    
  const data = await getData(query)

  const getURLHost = (url) => {
    return (url) ? new URL(url).host.toString() : ''
  }

  return (
    <MainDiv>
      
      <h2>The latest</h2>
      
      <div className="main-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.hits.map(hit => 
      
          <article className="main-item mt-10" key={hit.objectID}>

            <aside className="main-date text-gray-500 text-sm">
              {`${hit.created_at.substring(0,10)} ${hit.created_at.substring(11,16)}`} 
            </aside>
            
            <p className="main-host">via {getURLHost(hit.url)}</p>
            
            <h3 className="main-link text-3xl">
              <Link href={hit.url ? hit.url : ''} target="_blank">{hit.title}</Link>
            </h3>            
            
          </article>

        )}
      </div>

    </MainDiv>
  )

}
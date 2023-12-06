import { Fragment } from "react"
import { MainDiv } from "../components/main"
import Link from "next/link"

async function getData(query: string = '', page: number = 0) {

  
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${query}&page=${page}`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch!')
  }

  return res.json() 

}

interface MainProps {
  searchParams: {
    query: string,
    page?: number
  }
}

export default async function Main({searchParams}: MainProps) {

  const { query = '', page } = searchParams  
  const data = await getData(query, page)  

  const getURLHost = (url: string) => {
    return (url) ? new URL(url).host.toString() : ''
  }

  const queryLabel = (query === undefined || query === '') ? '' : query
  const newerPage = page ? Number(page) - 1 : null
  const olderPage = page ? Number(page) + 1 : 2

  return (
    <>

      <nav className="navi-wrap sticky top-0 z-40 p-5 bg-green-500 w-full shadow-xl">
        <div className="navi-prop max-w-screen-xl mx-auto">
          <div className="navi-flex flex justify-between items-center gap-5">
            <h2 className="navi-name text-md md:text-5xl text-black font-bold uppercase">
              {queryLabel} 
              {page ? ` / ${page} ` : ''}
            </h2>
            <div className="navi-page flex gap-5">
              { newerPage > 0 && <Link href={`?query=${query}&page=${newerPage}`}>newer</Link>}
              { olderPage > 0 && <Link href={`?query=${query}&page=${olderPage}`}>older</Link>}
            </div>
          </div>
        </div>
      </nav>
    
      <MainDiv>  
        
        <div className="main-list grid grid-cols-1 gap-1">
          {data.hits.map((hit: any) =>                   
            
            <Fragment key={hit.objectID}>
              
              {hit.url && 
              
                <article className="main-item mt-5">

                  <aside className="main-date text-gray-700 text-sm">
                    {`${hit.created_at.substring(0,10)} ${hit.created_at.substring(11,16)}`} 
                    <span className="main-host ml-1 text-gray-400">via {getURLHost(hit.url)}</span>
                  </aside>
                                                  
                  <h3 className="main-link text-3xl lowercase">
                    <Link href={hit.url} target="_blank">{hit.title}</Link>
                  </h3>            
                  
                </article>
            
              }

            </Fragment>

          )}
          
          {data.hits.length === 0 && (

            <p>no items or end of file</p>

          )}
        </div>

      </MainDiv>

    </>
  )

}
import { Fragment } from "react"
import { MainDiv } from "../components/main"
import Link from "next/link"
import { text } from "../components/text"

async function getData(query: string = '', page: number = 0) {

  
  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${query}&page=${page}&numericFilters=points>=50`
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

      <nav className="navi-wrap bg-green-500 w-full fixed z-40 p-5 shadow-xl">
        <div className="navi-prop max-w-screen-xl mx-auto">
          <div className="navi-flex flex justify-between items-center gap-5">
            <h2 className="navi-name text-md md:text-3xl text-black font-bold uppercase">
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

                  <aside className="main-item-meta text-gray-700 text-sm">
                    <span className="main-item-date font-bold mr-1">{hit.created_at.substring(0,10)}</span>
                    <span className="main-item-time mx-1">{`${hit.created_at.substring(11,16)}`}</span>
                    <span className="main-item-skor mx-1">({hit.points} pts)</span>
                    <span className="main-item-host ml-1 text-gray-400">via {getURLHost(hit.url)}</span>                    
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
          <p>{text["no items"]}</p>

      </MainDiv>

    </>
  )

}
import { Fragment } from "react"
import { PageNavi, NaviName, NaviPage } from "../components/navi"
import { MainDiv, MainList } from "../components/main"
import Item from "../components/item"
import { text } from "../components/text"

async function getData(slug: string = '', page: number = 0) {

  const url = `https://hn.algolia.com/api/v1/search_by_date?tags=story&query=${slug}&page=${page}`  

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch!')
  }

  return res.json() 

}

interface MainProps {
  searchParams: {    
    page?: number
  }
}

export default async function Main({searchParams}: MainProps) {

  const slug = text['home']
  const { page = 1 } = searchParams
  const data = await getData('', page-1)
  const { hits: list } = data    
  const newerPage = page ? Number(page) - 1 : 1
  const olderPage = page ? Number(page) + 1 : 2

  return (
    <>

      <PageNavi>
        <NaviName page={page} label={slug} />
        <NaviPage platform="" slug="" newerPage={newerPage} olderPage={olderPage} />
      </PageNavi>    
    
      <MainDiv>  
        
        { list.length > 0 && 
        
          <MainList>
            {list.map((item: any) =>              
              <Fragment key={item.objectID}>                
                {item.url && <Item item={item} /> }
              </Fragment>
            )}                      
          </MainList>
        
        }

        {list.length === 0 && (

          <p>{text["no items"]}</p>

        )}

      </MainDiv>

    </>
  )

}
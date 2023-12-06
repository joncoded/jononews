import { Fragment } from "react"
import { PageNavi, NaviName, NaviPage } from "../../../components/navi"
import { MainDiv, MainList } from "../../../components/main"
import Item from "../../../components/item"
import { text } from "../../../components/text"
import { getData } from "../../../util/data"

interface MainProps {
  params: {
    slug: string
  },
  searchParams: {    
    page?: number,
    points?: number
  }
}

export default async function Main({params, searchParams}: MainProps) {

  const { slug } = params  
  const { page = 1, points = 0 } = searchParams

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const thisYear = new Date(Date.UTC(currentYear, 0, 1)).valueOf() / 1000
  const nextYear = new Date(Date.UTC(currentYear + 1, 0, 1)).valueOf() / 1000  

  const slugYear = Number(slug)  
  const isSlugYearGood = Number.isInteger(slugYear)   

  const slugAfter = isSlugYearGood ? new Date(Date.UTC(slugYear, 0, 1)).valueOf() / 1000 : null
  const slugBefore = isSlugYearGood ?  new Date(Date.UTC(slugYear + 1, 0, 1)).valueOf() / 1000 : null

  const after = slugAfter ?? thisYear
  const before = slugBefore ?? nextYear

  const data = await getData('', page - 1, points, after, before)
  const { hits: list } = data    
  
  return (
    <>

      <PageNavi>
        <NaviName label={slug} page={page} />
        <NaviPage platform="year" slug={slug} current={page} points={points} />
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
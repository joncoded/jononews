import Link from "next/link";

export const PageNavi = ({children}: any) => {
  return (
    <nav className="navi-wrap bg-green-500 fixed w-full z-40 p-5 shadow-xl">
      <div className="navi-prop max-w-screen-xl mx-auto">
        <div className="navi-flex flex justify-between items-center gap-5">
          {children}
        </div>
      </div>
    </nav>
  )
}

export const NaviName = (
  {label, page} : { label: string, page: number}
) => {
  return (
    <h2 className="navi-name text-md md:text-3xl text-black font-bold uppercase">
      {label} 
      {page ? ` / ${page} ` : ''}
    </h2>
  )
}

export const NaviPage = (
  {platform, slug, current, points} : { platform?: string, slug?: string; current: number, points: number}
) => {

  const newerPage = current ? Number(current) - 1 : 1
  const olderPage = Number(current) + 1 

  const getURL = (page) => {
    const pre = platform ? `/${platform}` : ''
    const sub = slug ? `/${slug}` : ''
    const pts = points ? `&points=${points}` : ''     
    return `${pre}${sub}?page=${page}${pts}`
  }

  return (
    <div className="navi-page flex gap-5">
      { newerPage > 0 && <Link href={getURL(newerPage)}>newer</Link>}
      { olderPage > 0 && <Link href={getURL(olderPage)}>older</Link>}
    </div>
  )
}  
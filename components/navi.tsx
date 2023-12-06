import Link from "next/link";

export const PageNavi = ({children}: any) => {
  return (
    <nav className="navi-wrap bg-green-500 w-full fixed z-40 p-5 shadow-xl">
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
  {platform, slug, newerPage, olderPage} : { platform: string, slug: string; newerPage: number, olderPage: number}
) => {
  return (
    <div className="navi-page flex gap-5">
      { newerPage > 0 && <Link href={`${platform ? `/${platform}` : ''}/${slug}?page=${newerPage}`}>newer</Link>}
      { olderPage > 0 && <Link href={`${platform ? `/${platform}` : ''}/${slug}?page=${olderPage}`}>older</Link>}
    </div>
  )
}  
'use client'

import { useState } from 'react'
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Head() {

  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleMenuChange = (e: any) => {
    e.preventDefault()
    if (e.target.value)
      router.push(e.target.value)
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault()
    router.push(`?query=${decodeURIComponent(searchTerm)}`)    
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setSearchTerm(event.target.value)
  }

  return (
    <header className="head-wrap bg-black text-white w-full sticky fixed top-0 z-40 p-5">
      <div className="head-prop max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
      
        <div className="head-name flex items-center gap-5">
          <h1 className="head-ding text-4xl">
            <Link href="/"><span aria-hidden="true">📰</span> JONONEWS</Link>            
          </h1>
          <div className="head-line text-md block">news from the gain-stream media</div>
        </div>
      
        <div className="head-navi flex gap-5">
          
          <div className="head-find">
            <form onSubmit={handleSubmit}>
              <input type="text" className="p-2 text-black" placeholder="🔎 search" onChange={handleSearchChange} />
              <input type="submit" className="p-2 px-5 bg-green-500 text-white" value="go" />
            </form>
          </div>
          
          <select className="head-menu bg-transparent text-white py-2 px-5" onChange={handleMenuChange}>
            <option value="">M E N U</option>
            <option value="/">home</option>
          </select>

        </div>

      </div>
    </header>
  )
}
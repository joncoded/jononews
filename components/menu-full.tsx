'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import FocusTrap from 'focus-trap-react'
import { MenuFind } from './menu-find'
import { useHotkeys } from 'react-hotkeys-hook'
import { ChildrenProps } from './prop'
import { site, text } from './text'
import Link from 'next/link'

interface MenuFindWrapperProps {
  children: React.ReactNode | React.ReactNode[],
  className: string
}

export function MenuFull() {

  const [ showMenu, setShowMenu ] = useState(false)  
  const [ menuOpenedAlready, setMenuOpenedAlready ] = useState(false)  

  useHotkeys('ctrl+k, meta+k', () => document.getElementById('desktop-search-in-nav')?.focus())
  useHotkeys('ctrl+/, meta+/', () => document.getElementById('open-menu')?.click())
  useHotkeys('escape', () => closeMenu())

  /* def dark mode */
  const { theme, setTheme } = useTheme()

  const handleTheme = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault()
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  /* end dark mode */
  
  /* def menu ui */
  const openMenu = () => {
    setShowMenu(true) 
    setMenuOpenedAlready(true)   
  }

  const closeMenu = () => {
    setShowMenu(false)    
  }

  useEffect(() => {
    if (menuOpenedAlready) document.getElementById('open-menu')?.focus()
  }, [showMenu, menuOpenedAlready])

  const MenuButton = () => {
    return (
      <div>
        <button className={`text-sm uppercase`} onClick={openMenu} id="open-menu">
          <span className={`mr-1 text-2xl`} aria-hidden={true}>≡</span>
          <span className={`mx-1 text-2xl`}>{text['menu']}</span>
          <span className={`ml-1 text-gray-400 hidden sm:inline`}>(⌘/)</span>
        </button>
      </div>
    )
  }

  const MenuDialog = ({children}: ChildrenProps) => {
    return (
      <dialog 
        aria-label={text['menu']} 
        className={`menu-dialog 
          bg-gradient-to-b from-zinc-100 to-zinc-200
          dark:from-black dark:to-gray-800
          flex z-50 overflow-y-auto 
          w-full h-screen fixed top-0 left-0 p-10
      `}>
        {children}
      </dialog>
    )
  }

  const MenuWrapper = ({children}: ChildrenProps) => {
    return (
      <div className={`menu-wrapper w-full lg:max-w-4xl mx-auto`}>
        {children}
      </div>
    )
  }

  const MenuHead = ({children}: ChildrenProps) => {
    return (
      <div className={`menu-head 
        flex flex-col sm:flex-row sm:justify-between items-center
      `}>
        {children}
      </div>
    )
  }

  const MenuHeading = () => {
    return (
      <h1 className={`menu-heading`}>
        <span className={`text-3xl font-bold mr-2 uppercase`}>{site['title']}</span>
        <span className={`text-xl font-light`}>{text['menu']}</span>
      </h1>
    )
  }

  const MenuTagline = () => {
    return (
      <div 
        className={`menu-tagline 
          block sm:hidden text-center my-2
        `}
      >
        <span>{site['tagline']}</span>
      </div>
    )
  }

  const MenuOptions = ({children} : ChildrenProps) => {
    return (
      <div 
        className={`menu-options 
          flex justify-right gap-5 mb-10
        `}
      >
        {children}
      </div>
    )
  }

  const MenuCloseOption = () => {
    return (
      <div 
        className={`menu-close 
          mt-5
        `}
      >
        <button onClick={closeMenu}>
          <span 
            aria-hidden="true" 
            className={`mr-2`}>❌</span> 
          <span>{text['close menu']}</span>
        </button>
      </div>
    )
  }

  const MenuThemeOption = () => {
    return (
      <div 
        className={`menu-theme
          mt-5
        `}
      >
        <button onClick={handleTheme}>
          <span 
            aria-hidden="true"
            className={`mr-2`}>
            {theme === 'dark' ? '💡' : '🌜' }
          </span>
          <span>
            {theme === 'dark' 
              ? text["switch to light mode"]
              : text["switch to dark mode"]
            }
          </span>
        </button>
      </div>
    )
  }

  const MenuContent = () => {
    return (
      <ul className="menu-list list-none mx-auto py-10" onClick={closeMenu}>
        <li className="text-3xl"><Link href="/about">About</Link></li>
        <li className="text-3xl"><Link href="/omni">Omnisearch</Link></li>
        <li className="text-3xl"><Link href="/year/2023">2023</Link></li>
        <li className="text-3xl"><Link href="/year/2022">2022</Link></li>
        <li className="text-3xl"><Link href="/year/2021">2021</Link></li>
        <li className="text-3xl"><Link href="/year/2020">2020</Link></li>
        <li className="text-3xl"><Link href="/year/2019">2019</Link></li>
        <li className="text-3xl"><Link href="/year/2018">2018</Link></li>
        <li className="text-3xl"><Link href="/year/2017">2017</Link></li>
        <li className="text-3xl"><Link href="/year/2016">2016</Link></li>
        <li className="text-3xl"><Link href="/year/2015">2015</Link></li>
        <li className="text-3xl"><Link href="/year/2014">2014</Link></li>
        <li className="text-3xl"><Link href="/year/2013">2013</Link></li>
        <li className="text-3xl"><Link href="/year/2012">2012</Link></li>
        <li className="text-3xl"><Link href="/year/2011">2011</Link></li>
        <li className="text-3xl"><Link href="/year/2010">2010</Link></li>
        <li className="text-3xl"><Link href="/year/2009">2009</Link></li>
        <li className="text-3xl"><Link href="/year/2008">2008</Link></li>
        <li className="text-3xl"><Link href="/year/2007">2007</Link></li>
        <li className="text-3xl"><Link href="/year/2006">2006</Link></li>
      </ul>
    )
  }

  const MenuFindWrapper = ({children, className}: MenuFindWrapperProps) => {
    return (
      <div 
        className={`menu-find-wrapper 
          ${className}
        `}
      >
        {children}
      </div>
    )
  }
  /* end menu ui */

  return (
    <>
      <MenuButton />
      { showMenu && (
        <FocusTrap>
          <div>
            <MenuDialog>
              <MenuWrapper>
                <MenuHead>
                  <MenuHeading />
                  <MenuTagline />
                  <MenuOptions>
                    <MenuCloseOption />
                    <MenuThemeOption />
                  </MenuOptions>
                </MenuHead>
                <MenuFindWrapper className={`block md:hidden`}>
                  <MenuFind                                         
                    inputName={`mobile-search-in-menu`} 
                    placeholder={text['search with keybinding']} 
                  />
                </MenuFindWrapper>
                <MenuContent />
                <MenuFindWrapper className={`hidden md:block pb-16 w-full`}>
                  <MenuFind                     
                    inputName={`desktop-search-in-menu`} 
                    placeholder={text['search with keybinding']} 
                  />
                </MenuFindWrapper>
              </MenuWrapper>
            </MenuDialog>
          </div>
        </FocusTrap>
      )}
    </>
  )
}
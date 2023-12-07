import Link from "next/link"

export default function Tail () {
  return (
    <footer className="p-5 py-16 bg-gradient-to-b from-gray-800 to-gray-900 w-full bottom-0">
      <div className="w-screen-xl max-w-screen-xl mx-auto text-white text-center md:text-left flex justify-between gap-5">
        <div className="tail-1">a @joncoded <span aria-hidden="true">🐼🧑🏻‍💻</span> project</div>
        <div className="tail-2 flex gap-5">
          <Link href="/">home</Link>
          <Link href="/about">about</Link>
          <Link href="/omni">omni</Link>
          <Link href="https://github.com/joncoded/jononews">github</Link>
        </div>
      </div>
    </footer>
  )
}
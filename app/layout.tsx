import "../global.css"
import Head from "../components/head"
import Tail from '../components/tail'

export const metadata = {
  title: 'jononews',
  description: 'curating a free and open news line',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Head />        
        {children}        
        <Tail />
      </body>
    </html>
  )
}

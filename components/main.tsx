export const MainDiv = ({children, className}: any) => {
  return (
    <main className={`p-5 ${className}`}>
      <div className="w-screen-xl max-w-screen-xl mx-auto">
        {children}
      </div>
    </main>
  )
}

export const MainList = ({children}: any ) => {
  return (
    <div className="main-list grid grid-cols-1 gap-1">
      {children}
    </div>
  )
}
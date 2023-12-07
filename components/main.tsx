export const MainDiv = ({children}: any) => {
  return (
    <main className="p-5 my-10">
      <div className="w-screen-xl max-w-screen-xl mx-auto">
        {children}
      </div>
    </main>
  )
}

export const MainList = ({children}: any ) => {
  return (
    <div className="main-list grid grid-cols-1 gap-1 mt-10">
      {children}
    </div>
  )
}
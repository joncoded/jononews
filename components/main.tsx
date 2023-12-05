export const MainDiv = ({children}: any) => {
  return (
    <main className="p-5">
      <div className="w-screen-xl max-w-screen-xl mx-auto">
        {children}
      </div>
    </main>
  )
}
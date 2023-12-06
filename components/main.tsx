export const MainDiv = ({children}: any) => {
  return (
    <main className="p-5 mt-16">
      <div className="w-screen-xl max-w-screen-xl mx-auto">
        {children}
      </div>
    </main>
  )
}
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#111111] overflow-x-hidden">
      <main className="flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 relative">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout


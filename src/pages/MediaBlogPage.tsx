import React from "react"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchMediaBlogSection from "../components/organisms/StitchMediaBlogSection"
import StitchBottomNav from "../components/molecules/StitchBottomNav"

export const MediaBlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0d0f15] font-body-md text-zinc-100 antialiased flex flex-col selection:bg-emerald-400 selection:text-zinc-950 relative overflow-x-hidden">
      <StitchHeader />

      <main className="flex-1 flex flex-col relative w-full pt-24 pb-safe px-4 sm:px-8 max-w-6xl mx-auto">
        <StitchMediaBlogSection />
      </main>

      <StitchBottomNav />
    </div>
  )
}

export default MediaBlogPage

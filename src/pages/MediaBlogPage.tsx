import React from "react"
import StitchHeader from "../components/organisms/StitchHeader"
import StitchMediaBlogSection from "../components/organisms/StitchMediaBlogSection"

export const MediaBlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#154c94] via-[#1a5ab3] to-[#14488a] font-body-md text-white antialiased flex flex-col selection:bg-white selection:text-[#144b91] relative overflow-x-hidden">
      <StitchHeader />

      <main className="flex-1 flex flex-col relative w-full pt-24 pb-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <StitchMediaBlogSection />
      </main>
    </div>
  )
}

export default MediaBlogPage

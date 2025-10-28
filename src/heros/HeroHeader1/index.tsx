import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

type HeroHeader1Type = Extract<Page['hero'], { type: 'heroheader1' }>

export const HeroHeader1: React.FC<HeroHeader1Type> = ({ title, richText, image }) => {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{title}</h1>
            {richText && (
              <div className="md:text-md">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
          </div>
          <div>
            {image && typeof image !== 'string' && (
              <Media resource={image} className="w-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

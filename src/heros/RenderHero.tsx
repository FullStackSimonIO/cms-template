import React from 'react'

import type { Page } from '@/payload-types'
import { PostHero } from './PostHero'

const heroes = {
  postHero: PostHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}

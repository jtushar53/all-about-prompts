import React from 'react'
import { Hud, Text } from '@react-three/drei'
import meta from '../data/meta.json'

// Uses drei <Hud> to pin a text overlay in screen-space on every route.
// Rendered at renderPriority=2 so it always appears on top.
export default function LastUpdatedHUD() {
  const label = `updated ${meta.lastUpdated} · ${meta.commit}`

  return (
    <Hud renderPriority={1}>
      <Text
        position={[-3.5, -2.6, 0]}
        fontSize={0.13}
        color="#b4a0ff"
        anchorX="left"
        anchorY="bottom"
        font={undefined}
      >
        {label}
      </Text>
    </Hud>
  )
}

import React, { useRef, useState } from 'react'
import './index.scss'

import { ComponentLeft } from '@components/ComponentsLogin/ComponentLeft'
import { ComponentRight } from '@components/ComponentsLogin/ComponentRight'

const Component: React.FunctionComponent = () => {
  return (
    <div className='p_home'>
      <ComponentLeft />
      <ComponentRight />
    </div>
  )
}
export default Component

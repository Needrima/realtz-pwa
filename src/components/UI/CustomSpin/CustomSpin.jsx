import { Spin } from 'antd'
import React from 'react'
import './CustomSpin.scss'

const CustomSpin = ({color, spinning}) => {
  return (
    <span className={`${color === 'white' ? 'customSpin-White' : ''}`}>
        <Spin spinning={spinning} />
    </span>
  )
}

export default CustomSpin
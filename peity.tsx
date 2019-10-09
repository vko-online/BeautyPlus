import React, { useEffect } from 'react'
import Svg, { Circle, Rect, Polygon } from 'react-native-svg'

interface LineOptions {
  fill?: string
  height?: number
  width?: number
  min?: number
  max?: number
  stroke?: string
  strokeWidth?: number
}
interface PieOptions extends Omit<LineOptions, 'stroke' | 'strokeWidth'> {
  radius?: number
}

interface LineProps extends LineOptions {
  data: number[]
}
interface PieProps extends PieOptions {
  data: number
}
export function Line ({ data,
  fill = '#c6d9fd',
  height = 16,
  min = 0,
  max,
  stroke = '#4d89f9',
  strokeWidth = 1,
  width = 32
}: LineProps) {
  const normalizedData = data.map(d => Math.max(d, 0))
  const _max = max || Math.max(...normalizedData)
  const _min = min || Math.min(...normalizedData)
  const _diff = _max - _min

  function xScale (input) {
    return input * (width / (normalizedData.length - 1))
  }
  function yScale (input) {
    let y = height

    if (_diff) {
      y -= ((input - min) / _diff) * height
    }

    return y + strokeWidth / 2
  }
  const zero = yScale(Math.max(min, 0))
  const coords = [0, zero]

  for (let i = 0; i < normalizedData.length; i++) {
    coords.push(
      xScale(i),
      yScale(normalizedData[i])
    )
  }
  coords.push(width, zero)
  return (
    <Svg>
      <Polygon
        fill={fill}
        points={coords.join(' ')}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap='square'
      />
    </Svg>
  )
}
export function Pie ({ data, radius }: PieProps) {
  console.log('pie')
  return null
}

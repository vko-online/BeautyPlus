import React, { useEffect } from 'react'
import Svg, { Circle, Rect, Polygon } from 'react-native-svg'

interface Options {
  fill?: string[],
}
interface PieOptions extends Options {
  radius?: number
}
interface DonutOptions extends PieOptions {}
interface LinearOptins {
  delimiter?: string,
  height?: number,
  min?: number,
  width?: number
}
interface BarOptions extends LinearOptins {
  padding?: number,
}
interface LineOptions extends LinearOptins {
  stroke?: string,
  strokeWidth?: number,
}
type Types = 'pie' | 'bar' | 'donut' | 'line'
interface Props {
  data: number[]
  type: Types
  options: PieOptions | DonutOptions | BarOptions | LineOptions
}
const graphers: any = {}
export default function Peity1 ({ data, type, options }: Props) {
  let content
  useEffect(() => {
    content = graphers[type](data, options)
  }, [data])

  return (
    <Svg>
      {content}
    </Svg>
  )
}

// graphers['pie'] = (data, options) => {
//   const {
//     fill = ['#ff9900', '#fff4dd', '#ffc66e'],
//     radius = 8,
//     delimeter = '/'
//   } = options
//   const normalizedData = data.map(d => Math.max(d, 0))
//   let i = 0
//   let length = normalizedData.length
//   let sum = 0
// }

graphers['line'] = (data: number[], options) => {
  const {
    delimiter = ',',
    fill = '#c6d9fd',
    height = 16,
    min = 0,
    max,
    stroke = '#4d89f9',
    strokeWidth = 1,
    width = 32
  } = options
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
    <Polygon
      fill={fill}
      points={coords.join(' ')}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap='square'
    />
  )
}

// peity.register(
//   'bar',
//   {
//     delimiter: ',',
//     fill: ['#4D89F9'],
//     height: 16,
//     min: 0,
//     padding: 0.1,
//     width: 32
//   },
//   function (opts) {
//     let values = this.values()
//       , max = Math.max.apply(Math, opts.max == undefined ? values : values.concat(opts.max))
//       , min = Math.min.apply(Math, opts.min == undefined ? values : values.concat(opts.min))

//     let $svg = this.prepare(opts.width, opts.height)
//       , width = $svg.width()
//       , height = $svg.height()
//       , diff = max - min
//       , padding = opts.padding
//       , fill = this.fill()

//     let xScale = this.x = function (input) {
//       return input * width / values.length
//     }

//     let yScale = this.y = function (input) {
//       return height - (
//         diff
//           ? ((input - min) / diff) * height
//           : 1
//       )
//     }

//     for (let i = 0; i < values.length; i++) {
//       let x = xScale(i + padding)
//         , w = xScale(i + 1 - padding) - x
//         , value = values[i]
//         , valueY = yScale(value)
//         , y1 = valueY
//         , y2 = valueY
//         , h

//       if (!diff) {
//         h = 1
//       } else if (value < 0) {
//         y1 = yScale(Math.min(max, 0))
//       } else {
//         y2 = yScale(Math.max(min, 0))
//       }

//       h = y2 - y1

//       if (h == 0) {
//         h = 1
//         if (max > 0 && diff) y1--
//       }

//       $svg.append(
//         svgElement('rect', {
//           'data-value': value,
//           fill: fill.call(this, value, i, values),
//           x: x,
//           y: y1,
//           width: w,
//           height: h
//         })
//       )
//     }
//   }
// )
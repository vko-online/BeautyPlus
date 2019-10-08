import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export function generateSlots (start: Date, end: Date, delimeter: number) {
  const dayStart = moment(start)
  const dayEnd = moment(end)
  const day = moment.range(dayStart, dayEnd)
  return Array.from(day.by('minutes', { step: delimeter }))
}

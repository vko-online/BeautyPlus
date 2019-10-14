import { parseString } from 'react-native-xml2js'
import moment from 'moment'

const defaults = {
  url: 'http://www.hairsoft.co.il',
  user: 'medet',
  token: '162F6FCF3A35C84E6B288A51CA3E5FE88392E66823A869C659AC01BCBD216DA4',
  format: 'DDMMYYYYhhmm'
}

const splitter = '~'
interface GetCalendarEvents {
  from: Date
}
export function getCalendarEvents ({ from }: GetCalendarEvents) {
  const actionType = 'FROM'
  const actionDateTime = moment(from).format(defaults.format)
  console.log('act', actionDateTime)
  const body = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CalendarGetUserEvents2 xmlns="http://beautyplus.org.il/">
          <token>${defaults.token}</token>
          <userName>${defaults.user}</userName>
          <actionType>${actionType}</actionType>
          <actionDateTime>${actionDateTime}</actionDateTime>
        </CalendarGetUserEvents2>
      </soap:Body>
    </soap:Envelope>
  `
  return fetch(`${defaults.url}/BeautyPlusService.asmx?WSDL`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      'SOAPAction': 'http://beautyplus.org.il/CalendarGetUserEvents2'
    },
    body
  })
  .then(v => v.text())
  .then(v => {
    return new Promise((resolve, reject) => {
      parseString(v, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(transform(result))
      })
    })
  })
}

export interface CalendarEvent {
  id: string
  userId: number
  startDate: Date
  endDate: Date
  clientName: string
  serviceName: string
  serviceDescription: string
  addedByUserId: number
  isLocked: boolean
  createdDate: Date
  color: string
}
const inputFormat = 'DD/MM/YYYY hh:mm:ss'
function extract (str): CalendarEvent {
  const parts = str.split(splitter)
  return {
    id: parts[0],
    userId: Number(parts[1]),
    startDate: moment(parts[2], inputFormat).toDate(),
    endDate: moment(parts[3], inputFormat).toDate(),
    clientName: parts[4],
    serviceName: parts[5],
    serviceDescription: parts[6],
    addedByUserId: Number(parts[7]),
    isLocked: Boolean(parts[8]),
    createdDate: moment(parts[9], inputFormat).toDate(),
    color: intToRGB(hashCode(parts[5]))
  }
}
function hashCode (str) { // java String#hashCode
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB (i) {
  let c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase()

  return '#' + '00000'.substring(0, 6 - c.length) + c
}
export function transform (obj) {
  return obj['soap:Envelope']['soap:Body'][0]['CalendarGetUserEvents2Response'][0]['SyncEvent'][0]['string'].map(extract)
}

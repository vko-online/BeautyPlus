export const defaults = {
  url: 'http://www.hairsoft.co.il',
  user: 'medet',
  token: '162F6FCF3A35C84E6B288A51CA3E5FE88392E66823A869C659AC01BCBD216DA4',
  format: 'DDMMYYYYhhmm'
}

function getUrl (params = {}) {
  const val = {
    ...params,
    token: defaults.token
  }
  const query = Object
    .keys(val)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(val[k]))
    .join('&')

  return `${defaults.url}/api.aspx?${query}`
}

interface User {
  Id: string
  UserName: string
  UserPassword: string
  UserGroupId: string
  CompanyName: string
  Email: string
  FullName: string
  ColorId: string
}
export function getUsers (): Promise<User[]> {
  const url = getUrl({
    action: 'GetUsers'
  })
  return fetch(url).then(res => res.json()).then(res => res.response.items)
}

export function addCalendarEvent (
  userName: string = defaults.user,
  startDateTime: string,
  endDateTime: string,
  clientName: string,
  eventName: string,
  eventDescription: string
  ): Promise<void> {
  console.log(startDateTime, eventName, eventDescription, endDateTime)
  const url = getUrl({
    action: 'CalendarAddEvent',
    userName,
    startDateTime,
    endDateTime,
    clientName,
    eventName,
    eventDescription
  })
  console.log('url', url)
  return fetch(url).then(res => res.json())
}

export function getCalendarEvents (userName: string, actionType = 'ALL', ActionDateTime: number): Promise<CalendarEvent[]> {
  const url = getUrl({
    action: 'CalendarGetUserEvents',
    userName,
    actionType,
    ActionDateTime
  })
  console.log('called', ActionDateTime)
  return fetch(url)
  .then(res => res.json())
  .then(res => {
    console.log('res', res)
    return res.response.items || []
  })
}

export interface CalendarEvent {
  EventId: string
  UserId: string
  StartDateTime: string
  EndDateTime: string
  ClientName: string
  EventName: string
  EventDescription: string
  AddByUserId: string
  IsLocked: string
  CreateDateTime: Date
  IsSMS: string
}

import AsyncStorage from '@react-native-community/async-storage'

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

export interface User {
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

export function login (login: string, password: string) {
  const url = getUrl({
    action: 'Login',
    login,
    password
  })

  return fetch(url).then(res => res.json())
}

export async function addClient (clientName, phone) {
  const url = getUrl({
    action: 'ClientCreate',
    token: defaults.token,
    clientName,
    phone
  })

  return fetch(url).then(res => res.json())
}

export async function addService (serviceName, duration) {
  const url = getUrl({
    action: 'ServiceCreate',
    token: defaults.token,
    serviceName,
    duration
  })

  return fetch(url).then(res => res.json())
}

export async function updateCalendarEvent ({
  eventId,
  startDateTime,
  endDateTime,
  clientName,
  userId,
  eventName,
  eventDescription
}) {
  const url = getUrl({
    action: 'CalendarUpdateEvent',
    eventId,
    userId,
    startDateTime,
    endDateTime,
    clientName,
    eventName,
    eventDescription
  })
  return fetch(url).then(res => res.json())
}

export async function addCalendarEvent (
  userName: string,
  startDateTime: string,
  endDateTime: string,
  clientName: string,
  eventName: string,
  eventDescription: string
  ): Promise<void> {
  let usr = await AsyncStorage.getItem('username')
  if (userName) {
    usr = userName
  }
  const url = getUrl({
    action: 'CalendarAddEvent',
    userName: usr,
    startDateTime,
    endDateTime,
    clientName,
    eventName,
    eventDescription
  })
  console.log('url', url)
  return fetch(url).then(res => res.json())
}

export async function getCalendarEvents (activeUserName, actionType = 'ALL', ActionDateTime: number): Promise<CalendarEvent[]> {
  const url = getUrl({
    action: 'CalendarGetUserEvents',
    userName: activeUserName || await AsyncStorage.getItem('username'),
    actionType,
    ActionDateTime
  })
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

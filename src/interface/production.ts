export interface IAccessoriesPro {
  id: number
  model: string
  name: string
  type: {
    id: number
    name: string
  }
}

export interface IDevelopmentBoard {
  id: number
  model?: string
  name?: string
  note?: string
  accessoryInterfaces?: Array<IAccesoryInterface>
}

interface IPropertyValues {
  propertyId: number
  value: string
}

interface IItem {
  value: string
  note?: string
}

interface IValueType {
  id: number
  name: string
  note?: string
}

interface IProperties {
  id: number
  name: string
  note?: string
  valueType: IValueType
  optionalValues: Array<IItem>
}

interface IAccessoryType {
  id: number
  name: string
  note?: string
  properties: Array<IProperties>
}

export interface IAccesoryInterface {
  id: number
  index?: number
  name?: string
  note?: string
  accessoryType?: IAccessoryType
}

export interface IAccesoriesItem {
  id: number
  index: number
  name: string
  accessoryType: {
    id: number
    name: string
  }
}

interface IAccessory {
  id: number
  model?: string
  name?: string
  note?: string
  type?: {
    id: number
    name: string
    note?: string
    properties: Array<IProperties>
  }
  propertyValues?: Array<IPropertyValues>
}

export interface IAccessories {
  accessoryInterface: IAccesoryInterface
  accessory: IAccessory
}

interface ISubProcessItemInfoObj {
  type: IAccessoryType
  propertyValues: Array<IPropertyValues>
}

interface ISubProcessItemInfo {
  type: IAccessoryType
  propertyValues: Array<IPropertyValues>
  steps: Array<ISubProcessItemInfoObj>
}

interface ISubProcessItem {
  [propName: string]: Array<ISubProcessItemInfo>
}

interface ISubProcesses {
  types?: Array<IAccessoryType>
  stepTypes?: Array<IAccessoryType>
  subProcesses?: ISubProcessItem
}

interface IProcessType {
  index: number
  eventId: number
  subProcessTypeId: number
  subProcessIndex: number
  nextStepOnDone: number
  nextStepOnError: number
}

interface IProcess {
  eventTypes: Array<IAccessoryType>
  processes: Array<IProcessType>
}

interface IProcessEventsItem {
  id: number
  name: string
  note?: string
  accessoryId: number
}

interface IProcessEvents {
  [propName: string]: IProcessEventsItem
}

interface ITriggers {
  [propName: string]: number
}

interface IProcessTriggers {
  events: Array<IProcessEvents>
  triggers: ITriggers
}

export interface IProduction {
  id?: number
  model?: string
  name?: string
  note?: string
  developmentBoard?: IDevelopmentBoard
  accessories?: Array<IAccessories>
  subProcesses?: ISubProcesses
  processes?: IProcess
  processTriggers?: IProcessTriggers
}

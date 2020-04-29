interface Settings {
  title: string
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  fixedHeader: boolean
  sidebarTextTheme: boolean
  errorLog: Array<string>
  devServerPort: number
  mockServerPort: number
}

const settings: Settings = {
  title: 'Seat-System',
  showSettings: true,
  showTagsView: true,
  showSidebarLogo: true,
  fixedHeader: false,
  sidebarTextTheme: true,
  errorLog: ['production'],
  devServerPort: 9527,
  mockServerPort: 9528
}

export default settings

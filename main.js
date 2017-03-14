const {app, BrowserWindow} = require('electron')
const {Menu} = require('electron')
const path = require('path')
const url = require('url')

const winState = require('electron-window-state')

let win
let shouldQuit

// create the application menu and send shortcuts to render process
let menu = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Note',
        accelerator: 'CmdOrCtrl+N',
        click: () => {
          win.webContents.send('shortcut', {command: 'add-note'})
        }
      },
      {
        label: 'Delete Note',
        accelerator: 'CmdOrCtrl+D',
        click: () => {
          win.webContents.send('shortcut', {command: 'delete-note'})
        }
      },
      {
        label: 'Export Notes',
        accelerator: 'CmdOrCtrl+E',
        click: () => {
          win.webContents.send('shortcut', {command: 'export-notes'})
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectall' },
      {
        label: 'Preview (Toggle)',
        accelerator: 'CmdOrCtrl+P',
        click: () => {
          win.webContents.send('shortcut', {command: 'toggle-preview'})
        }
      }
    ]
  },
  {
    label: 'Find',
    submenu: [
      {
        label: 'Search Notes (RegEx)',
        accelerator: 'CmdOrCtrl+F',
        click: () => {
          win.webContents.send('shortcut', {command: 'search-notes'})
        }
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'togglefullscreen' },
      { role: 'minimize' },
      { role: 'close' }
    ]
  }
]

if (process.platform === 'darwin') {
  // app menu for OSX
  menu.unshift({
    label: app.getName(),
    submenu: [
      { role: 'about' },
      { role: 'hide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
  // window menu for OSX
  menu[4].submenu = [
    { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
    { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
    { role: 'zoom' },
    { type: 'separator' },
    { role: 'togglefullscreen' }
  ]
}

app.on('ready', function () {
  manageInstance()
  createWindow()
  createMenu()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function manageInstance () {
  // make sure there is only one instance running at any given time
  shouldQuit = app.makeSingleInstance(function (commandLine, workingDirectory) {
    if (win) {
      if (win.isMinimized()) {
        win.restore()
        win.focus()
      }
    }
  })

  if (shouldQuit) {
    app.quit()
  }
}

function createWindow () {
  // store the window state between sessions
  let defaultWinState = winState({
    defaultWidth: 800,
    defaultHeight: 600
  })

  win = new BrowserWindow({
    x: defaultWinState.x,
    y: defaultWinState.y,
    width: defaultWinState.width,
    height: defaultWinState.height,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'app/assets/icons/png/64x64.png')
  })

  defaultWinState.manage(win)

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'render.html'),
    protocol: 'file:',
    slashes: true
  }))

  // win.toggleDevTools()

  // safety measure to prevent opening windows/tabs in-app
  win.webContents.on('new-window', function (event, urlToOpen) {
    event.preventDefault()
  })

  win.on('closed', () => {
    win = null
  })
}

function createMenu () {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}

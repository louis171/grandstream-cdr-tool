const {
  app,
  BrowserWindow,
  protocol,
  ipcMain,
  Notification,
} = require("electron");
const path = require("path");

const Store = require("electron-store");

//defined the store
let store = new Store();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  //example to display notification
  ipcMain.on("notify", (_, message) => {
    new Notification({
      title: "Grandstream UCM63XX API",
      body: message,
    }).show();
  });

  // Saves user login data
  ipcMain.on("save-details", (_, details) => {
    store.set("userDetails", details);
  });

  // Deletes user login data
  ipcMain.on("delete-details", (_, details) => {
    store.delete("userDetails");
    store.set("userDetails", details);
  });

  // Saves user preferences e.g.
  // {
  //    colorMode: light OR dark
  // }
  ipcMain.on("save-pref", (_, pref) => {
    store.set("userPref", pref);
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    minWidth: 900,
    minHeight: 900,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
   mainWindow.webContents.openDevTools({ mode: "detach" });
};

const loadUserDetails = () => {
  return store.get("userDetails");
};

const loadUserPref = () => {
  return store.get("userPref");
};

protocol.registerSchemesAsPrivileged([
  {
    scheme: "http",
    privileges: {
      standard: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
  {
    scheme: "https",
    privileges: {
      standard: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
  { scheme: "mailto", privileges: { standard: true } },
]);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on("ready", createWindow);
app
  .whenReady()
  .then(() => {
    ipcMain.handle("load-details", loadUserDetails);
    ipcMain.handle("load-pref", loadUserPref);
    createWindow();
  })
  .catch((err) => console.log(err));

app.commandLine.appendSwitch("ignore-certificate-errors");

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

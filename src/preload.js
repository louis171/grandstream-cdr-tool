// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  userDetails: {
    save(details) {
      ipcRenderer.send("save-details", details);
    },
    delete(details) {
      ipcRenderer.send("delete-details", details);
    },
    load: () => ipcRenderer.invoke("load-details"),
  },
  userPreferences: {
    save(pref) {
      ipcRenderer.send("save-pref", pref);
    },
    load: () => ipcRenderer.invoke("load-pref")
  },
});

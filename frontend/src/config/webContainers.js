import { WebContainer } from "@webcontainer/api";

// Helper to get/set globals safely during HMR in development
const getSingleton = (name, factory) => {
  if (import.meta.env.DEV) {
    window.davel = window.davel || {};
    window.davel[name] = window.davel[name] || factory();
    return window.davel[name];
  }
  return factory();
};

// Use the helper to create module-level variables that persist across HMR
let webContainerInstance = getSingleton("webContainerInstance", () => null);
let bootPromise = getSingleton("bootPromise", () => null);

// Setter for HMR-safe variables
const setSingleton = (name, value) => {
  if (import.meta.env.DEV) {
    window.davel[name] = value;
  }
  if (name === "webContainerInstance") webContainerInstance = value;
  if (name === "bootPromise") bootPromise = value;
};

export const getWebContainer = async () => {
  if (webContainerInstance) {
    return webContainerInstance;
  }

  if (bootPromise === null) {
    console.log("Booting WebContainer...");
    const promise = WebContainer.boot()
      .then((instance) => {
        console.log("WebContainer booted successfully!");
        setSingleton("webContainerInstance", instance);
        setSingleton("bootPromise", null);
        return instance;
      })
      .catch((error) => {
        console.error("WebContainer boot failed:", error);
        setSingleton("bootPromise", null);
        throw error;
      });
    setSingleton("bootPromise", promise);
  }

  return bootPromise;
};

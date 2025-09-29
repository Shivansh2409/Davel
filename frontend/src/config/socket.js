import io from "socket.io-client";

let socket;

export const initializeSocket = (projectId) => {
  // Disconnect from any existing socket before creating a new one
  if (socket) {
    socket.disconnect();
  }

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found, socket connection aborted.");
    return;
  }

  socket = io(import.meta.env.VITE_API_URL, {
    auth: { token },
    query: { projectId },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection error:", err.message);
  });
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
    socket = null;
  }
};

export const sendMessage = (eventName, data) => {
  if (socket) {
    socket.emit(eventName, data);
  }
};

export const subscribeToEvent = (eventName, callback) => {
  if (socket) {
    socket.on(eventName, callback);
  }
};

export const unsubscribeFromEvent = (eventName) => {
  if (socket) {
    socket.off(eventName);
  }
};

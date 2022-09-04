import React from "react";
import { App } from "./client/app";

import { hydrateRoot } from "react-dom/client";
const container = document.documentElement;

const root = hydrateRoot(container, <App files={[]} />);

const connection = new WebSocket("ws://localhost:3000/__live/ws");

connection.onmessage = (event) => {
  console.log(event.data);
  root.render(<App files={[event.data]} />);
};

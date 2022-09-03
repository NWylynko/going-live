import React from "react";
import { App } from "./client/app";

import { hydrateRoot } from "react-dom/client";

const container = document.documentElement;

hydrateRoot(container, <App />);

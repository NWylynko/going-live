import React from "react";
import { App } from "../client/app";

import { renderToPipeableStream } from "react-dom/server";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import type { RouteHandlerMethod } from "fastify/types/route";

export const handler: RouteHandlerMethod = (req, res) => {
  let didError = false;

  const options: RenderToPipeableStreamOptions = {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.header("Content-type", "text/html");
      stream.pipe(res.raw);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send('<!doctype html><p>Loading...</p><script src="clientrender.js"></script>');
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  };

  const stream = renderToPipeableStream(<App />, options);
};

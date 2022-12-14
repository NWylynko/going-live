import React from "react";
import { App } from "../client/app";

import { renderToPipeableStream } from "react-dom/server";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import type { RouteHandlerMethod } from "fastify/types/route";
import { getAssets } from "./getMain";

export const handler: RouteHandlerMethod = (req, res) => {
  const files = getAssets();

  let didError = false;

  const options: RenderToPipeableStreamOptions = {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.header("Content-type", "text/html");
      stream.pipe(res.raw);
    },
    onShellError(err) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      didError = true;
      console.error(err);
      res.statusCode = 500;
      res.send("<!doctype html><span>An Error occurring while rendering :(</span>");
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  };

  // where is where we kick off the render from the top component app
  // for a more complete solution we would want to pass props along like url and cookies
  // we could have a context that would hold that stuff
  // then the dev can use some custom hooks to obtain that data to conditionally render stuff
  const stream = renderToPipeableStream(<App files={files} />, options);
};

// this gets imported by both react ssr and csr, it both gets server side rendered and then client rendered a second later
// so this code needs to work both in node and the browser :)

import React, { useState } from "react";
import type { PropsWithChildren } from "react";

interface AppProps {
  files: string[];
}

export const App = ({ files }: AppProps) => {
  return (
    <Document files={files}>
      <Counter />
    </Document>
  );
};

interface DocumentProps {
  files: string[];
}

const Document = ({ children, files }: PropsWithChildren<DocumentProps>) => {
  return (
    <>
      <head>
        {files.map((file) => (
          <script key={file} src={`./assets/${file}`} type="module" />
        ))}
      </head>
      <body>{children}</body>
    </>
  );
};

const useCount = (initialCount: number) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => setCount((n) => n + 5);
  const decrement = () => setCount((n) => n - 1);

  return { count, increment, decrement };
};

const Counter = () => {
  const { count, increment, decrement } = useCount(100);

  return (
    <>
      <div>
        <span>this is the count: {count}</span>
      </div>
      <div>
        <button onClick={increment}>Add</button>
        <button onClick={decrement}>Sub</button>
      </div>
    </>
  );
};

import React, { useState } from "react";
import type { PropsWithChildren } from "react";

export const App = () => {
  return (
    <Document>
      <Counter />
    </Document>
  );
};

const Document = ({ children }: PropsWithChildren) => {
  return (
    <>
      <head>
        <script src="./assets/main.js" type="module" />
      </head>
      <body>{children}</body>
    </>
  );
};

const useCount = (initialCount: number) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => setCount((n) => n + 1);
  const decrement = () => setCount((n) => n - 1);

  return { count, increment, decrement };
};

const Counter = () => {
  const { count, increment, decrement } = useCount(100);

  return (
    <>
      <span>this is the count: {count}</span>
      <button onClick={increment}>Add</button>
      <button onClick={decrement}>Sub</button>
    </>
  );
};

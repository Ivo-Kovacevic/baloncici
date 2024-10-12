import { ReactNode } from "react";

interface Main {
  children: ReactNode;
}

export default function HeaderFooter({ children }: Main) {
  return (
    <>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </>
  );
}

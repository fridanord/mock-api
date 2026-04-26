import React from "react";

export default function IconBox({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${color}`}
    >
      {children}
    </div>
  );
}

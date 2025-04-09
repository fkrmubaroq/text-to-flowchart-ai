import clsx from "clsx";
import React from "react";

export function Shimmer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("flex animate-pulse", className)}>{children}</div>
  );
}

export function Circle({
  className,
  width = "w-10",
  height = "h-10",
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <div
      className={clsx("rounded-full bg-gray-300", width, height, className)}
    ></div>
  );
}

export function Line({
  width = "w-full",
  height = "h-2",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div className={clsx("h-2 rounded bg-gray-300 dark:bg-gray-700", width, height)}></div>
  );
}


import React from "react";
import clsx from "clsx";

type CardProps = React.HTMLAttributes<HTMLDivElement>
type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div
    className={clsx("bg-white rounded-2xl shadow-md overflow-hidden", className)}
    {...props}
  />
);

export const CardContent: React.FC<CardContentProps> = ({ className, ...props }) => (
  <div className={clsx("p-4", className)} {...props} />
);

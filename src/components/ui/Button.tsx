"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils";
import { LoaderIcon, CheckmarkIcon } from "react-hot-toast";

const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "gradient text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border bg-darkBlue border-input text-white hover:bg-accent transition ease-in-out duration-300 hover:text-accent-foreground",
        secondary:
          "bg-green-500 y text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground border ",
        link: "text-primary underline-offset-4 hover:underline",
        save: "bg-green-400 text-white w-full hover:bg-green-500",
        close: "hover:bg-gray-300", // Örnek bir hover efekti
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  status?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      type,
      size,
      children,
      status,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = "button";

    return (
      <button
        type={type}
        disabled={status}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {status && (
          <span className="ml-4 ">
            <LoaderIcon />
          </span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

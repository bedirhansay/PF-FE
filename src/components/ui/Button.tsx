"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@utils";
import loader from "../../../public/icon/loader.svg";
import loader1 from "../../../public/icon/loader1.svg";
import Image from "next/image";
import { LoaderIcon } from "react-hot-toast";
import Link from "next/link";

const buttonVariants = cva(
  "flex items-center justify-center cursor-pointer rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "gradient text-primary-foreground hover:bg-primary/90",
        save: "bg-green-500 hover:bg-green-600 py-3 px-8 rounded-lg text-yellow-100 border-b-4 border-green-700 hover:border-green-700 transition duration-300",
        delete:
          "bg-red-600 text-white hover:bg-red-700 py-3 px-4 rounded-lg  border-b-4 border-red-800 hover:border-red-900 transition duration-300",
        outline:
          "border bg-darkBlue text-white border-2 hover:shadow-xl hover:bg-darkBlue/90 border-darkBlue transition ease-in-out duration-300 hover:text-accent-foreground",
        secondary:
          "bg-[#6D92A1] text-[#374955] font-semibold border-b-4 hover:border-b-4 border-[#374955]  hover:bg-opacity-75",
        ghost: "hover:bg-accent hover:text-accent-foreground border ",
        close: "hover:bg-gray-300",
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
  asLink?: boolean;
  status?: boolean;
  href?: string;
  isLoading?: boolean;
  leftIcon?: () => React.ReactNode;
  rightIcon?: () => React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      type,
      size,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      status,
      asLink,
      href,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = "button";
    const LIcon = leftIcon;
    const RIcon = rightIcon;

    return (
      <button
        type={type}
        disabled={status}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {asLink && href && <Link href={href}></Link>}
        {isLoading ? (
          <Image
            className="text-white"
            alt="loader"
            width={30}
            height={30}
            src={loader1}
          ></Image>
        ) : (
          <>
            {LIcon && <LIcon />}
            {children}
            {RIcon && <RIcon />}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

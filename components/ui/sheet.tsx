"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Sheet 组件用于侧边栏抽屉
interface SheetProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Sheet = ({ open, onOpenChange, children }: SheetProps) => {
  return (
    <>
      {/* 遮罩层 */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80"
          onClick={() => onOpenChange?.(false)}
        />
      )}
      {children}
    </>
  )
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "left" | "right"
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ side = "right", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
SheetContent.displayName = "SheetContent"

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = "SheetTitle"

export { Sheet, SheetContent, SheetHeader, SheetTitle }


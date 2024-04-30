import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'transition-all inline-flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer outline-none disabled:pointer-events-none disabled:opacity-50 ',
  {
    variants: {
      variant: {
        default:
          'hover:scale-[102%] active:scale-[98%] transition-all bg-primary text-primary-foreground shadow hover:bg-primary/90',
        robot:
          'hover:scale-[102%] active:scale-[98%] transition-all bg-[#3A3D5E] text-primary-foreground shadow hover:bg-[#3A3D5E]/90',
        destructive:
          'hover:scale-[102%] active:scale-[98%] bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'hover:scale-[102%] active:scale-[98%] transition-all border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'hover:scale-[102%] active:scale-[98%] transition-all bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:scale-[102%] active:scale-[98%] hover:bg-accent hover:text-accent-foreground',
        link: 'hover:scale-[102%] active:scale-[98%] text-primary underline-offset-4 hover:underline',
        none: 'hover:scale-[102%] active:scale-[98%] transition-all text-primary hover:opacity-80',
        generate: 'border dark:border-transparent',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }

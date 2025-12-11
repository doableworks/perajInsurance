import React from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface CustomButtonProps {
  text: string
  href?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

function CustomButton({ 
  text, 
  href = '#', 
  variant = 'primary', 
  className 
}: CustomButtonProps) {
  const baseStyles = "inline-flex items-center justify-between p-2 rounded-sm font-medium transition-all duration-200 hover:scale-105 group"
  
  const variantStyles = {
    primary: {
      button: "bg-primary text-secondary",
      iconBg: "bg-secondary rounded-xs",
      iconColor: "text-primary"
    },
    secondary: {
      button: "bg-white text-text-primary",
      iconBg: "bg-primary rounded-xs", 
      iconColor: "text-secondary"
    }
  }

  const currentVariant = variantStyles[variant]

  return (
    <Link 
      href={href}
      className={cn(
        baseStyles,
        currentVariant.button,
        className
      )}
    >
      <span className="mr-3 ml-4">{text}</span>
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-200 group-hover:translate-x-1",
        currentVariant.iconBg
      )}>
        <ArrowRight 
          size={20} 
          className={currentVariant.iconColor}
        />
      </div>
    </Link>
  )
}

export default CustomButton
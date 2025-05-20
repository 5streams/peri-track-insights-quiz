
import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

// Create a simple wrapper that renders children directly without collapsing
const Collapsible: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <div>{children}</div>
}

// Transform the trigger into a simple header
const CollapsibleTrigger: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <h3 className="font-medium py-2">{children}</h3>
}

// Transform the content to always be visible
const CollapsibleContent: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return <div>{children}</div>
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

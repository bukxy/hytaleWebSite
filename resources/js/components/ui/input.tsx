import * as React from "react"

import { cn } from "@/lib/utils"
import { X } from 'lucide-react';
import { useRef } from 'react';

function Input({ className, type, ...props }: React.ComponentProps<"input">) {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClearFile = () => {
        if (inputRef.current)
            inputRef.current.value = "";
    }

  return (
      <div className="relative w-full">
        <input
            type={type}
            data-slot="input"
            className={cn(
                "border-input  placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "file:mr-4 file:rounded-sm file:px-4 file:py-1 file:text-sm file:font-semibold file:bg-sidebar-accent/80 hover:file:bg-sidebar-accent file:text-foreground file:inline-flex file:h-7",
                className
            )}
            {...props}
            ref={inputRef}
        />

          {type === "file" && (
              <button
                  type="button"
                  onClick={handleClearFile}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
              >
                  <X size={16} />
              </button>
          )}
      </div>
  )
}

export { Input }

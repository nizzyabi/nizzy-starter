'use client'
import { useState, useEffect, useRef } from 'react'
import { HslColorPicker, HslColor } from 'react-colorful'
import { CodeBlock } from 'react-code-block'
import { useCopyToClipboard } from 'react-use'

interface HslColorType {
  h: number
  s: number
  l: number
}

interface ColorPickerProps {
  variable: string
}

export function ColorPicker({ variable }: ColorPickerProps) {
  const [color, setColor] = useState<HslColorType>({ h: 0, s: 100, l: 50 })
  const mainDivRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement)
    const primaryColor = rootStyles.getPropertyValue(variable).trim()

    const [h, s, l] = primaryColor.split(' ').map((value) => {
      if (value.endsWith('%')) {
        return parseFloat(value)
      }
      return parseFloat(value)
    })

    setColor({ h, s, l })
  }, [variable])

  const handleColorChange = (newColor: HslColor) => {
    const fixedColor = `${newColor.h} ${newColor.s}% ${newColor.l}%`
    setColor(newColor)
    document.documentElement.style.setProperty(variable, fixedColor)
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (
      mainDivRef.current &&
      mainDivRef.current.contains(event.target as Node)
    ) {
      setIsDragging(true)
      document.documentElement.classList.add('disable-transitions')
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      document.documentElement.classList.remove('disable-transitions')
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const [state, copyToClipboard] = useCopyToClipboard()

  const copyCode = () => {
    copyToClipboard(`${variable}: ${color.h} ${color.s}% ${color.l}%;`)
    setTimeout(() => {
      copyToClipboard('')
    }, 2500)
  }

  return (
    <div
      ref={mainDivRef}
      className="flex flex-col items-center sm:items-start w-min space-y-4"
    >
      <HslColorPicker color={color} onChange={handleColorChange} />
      <CodeBlock
        code={`${variable}: ${color.h} ${color.s}% ${color.l}%;`}
        language="css"
      >
        <div className="relative">
          <CodeBlock.Code className="bg-foreground/[0.025] p-4 rounded-lg shadow-lg break-words whitespace-pre-wrap">
            <span className="flex items-center text-sm text-foreground/70 h-6 mb-1">
              globals.css
            </span>
            <CodeBlock.LineContent className="text-base">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </CodeBlock.Code>
          <button
            className="bg-accent rounded px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
            onClick={copyCode}
          >
            {state.value ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </CodeBlock>
    </div>
  )
}

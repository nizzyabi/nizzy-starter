'use client'
import { useState, useEffect } from 'react'
import { HslColorPicker, HslColor } from 'react-colorful'

interface HslColorType {
  h: number
  s: number
  l: number
}

export default function ColorPicker() {
  const [color, setColor] = useState<HslColorType>({ h: 0, s: 0, l: 100 })

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement)
    const primaryColor = rootStyles.getPropertyValue('--primary').trim()

    const [h, s, l] = primaryColor.split(' ').map((value) => {
      if (value.endsWith('%')) {
        return parseFloat(value)
      }
      return parseFloat(value)
    })

    setColor({ h, s, l })
  }, [])

  const handleColorChange = (newColor: HslColor) => {
    setColor(newColor)
    document.documentElement.style.setProperty(
      '--primary',
      `${newColor.h} ${newColor.s}% ${newColor.l}%`
    )
  }

  const handlePickerDrag = () => {
    document.documentElement.classList.add('disable-transitions')
  }

  const handlePickerDragEnd = () => {
    document.documentElement.classList.remove('disable-transitions')
  }

  return (
    <div className="w-fit">
      <HslColorPicker
        color={color}
        onChange={handleColorChange}
        onMouseEnter={handlePickerDrag}
        onMouseLeave={handlePickerDragEnd}
      />
    </div>
  )
}

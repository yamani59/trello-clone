import { useEffect, useRef } from "react"

const Options = ({x, y, children }: OptionsProps) => {
  const optionElement = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (x === undefined && y === undefined) {
      console.log(optionElement.current)
    }
  }, [])

  return (
    <div ref={optionElement} className="fixed">
      {children}
    </div>
  )
}

export default Options
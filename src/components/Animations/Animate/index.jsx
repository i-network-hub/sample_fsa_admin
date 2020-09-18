import React, { useEffect, useState } from 'react'

const Animate = ({ children, show, animation }) => {
  const [shouldRender, setShouldRender] = useState(show)

  useEffect(() => {
    if (show) setShouldRender(true)
  }, [show])

  const onAnimationEnd = () => {
    if (!show) setShouldRender(false)
  }

  return (
    shouldRender &&
    React.cloneElement(children, {
      style: { animation: animation },
      onAnimationEnd: onAnimationEnd
    })
  )
}

export default Animate
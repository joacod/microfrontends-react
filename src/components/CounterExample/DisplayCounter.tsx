import { useEffect, useState } from 'react'
import { count$ } from '@joacod/microfrontends-utility'

// Example, displaying a simple counter observable
export const DisplayCounter = () => {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    const subscription = count$.subscribe((newCount) => {
      setCount(newCount) // Update the state whenever count$ emits a new value
    })

    return () => subscription.unsubscribe() // Clean up the subscription on unmount
  }, [])

  return <div>Counter Value: {count}</div>
}

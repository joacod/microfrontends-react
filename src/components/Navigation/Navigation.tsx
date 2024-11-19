import './Navigation.css'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { FiShoppingBag } from 'react-icons/fi'
import { FcShop } from 'react-icons/fc'
import {
  checkoutModule,
  techToggleModule,
} from '@joacod/microfrontends-utility'
import { useEffect, useState } from 'react'
import { Subscription } from 'rxjs'
import reactLogo from '@images/react.png'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import packageJSON from '../../../package.json'

export default function Navigation() {
  const [count, setCount] = useState(checkoutModule.getItems().length)
  const [showTech, setShowTech] = useState(techToggleModule.getTechOn())
  let subscription = new Subscription()
  let toggleSubscription = new Subscription()

  useEffect(() => {
    subscription = checkoutModule.items$.subscribe((items) => {
      setCount(items.length)
    })

    toggleSubscription = techToggleModule.techOn$.subscribe((isOn) => {
      setShowTech(isOn)
    })

    return () => {
      subscription.unsubscribe()
      toggleSubscription.unsubscribe()
    }
  }, [])

  const handleNavigation = (route) => {
    window.history.pushState(null, '', route)
  }

  const handleToggle = (isOn) => {
    setShowTech(isOn)
    techToggleModule.setTechOn(isOn)
  }

  return (
    <div className={showTech ? 'nav tech-border' : 'nav'}>
      <div className="nav-title">
        <span>
          <FcShop size={50} />
        </span>
        <h1>{showTech && 'Microfrontends '}Store</h1>
        {showTech && (
          <div className="tech">
            <img width={40} src={reactLogo} alt="React Logo" />
            <p>
              React version:{' '}
              <strong>{packageJSON.dependencies.react.replace('^', '')}</strong>
            </p>
          </div>
        )}
      </div>

      <ul>
        <li>
          <ToggleButton callback={handleToggle} />
        </li>
        <li>
          <button onClick={() => handleNavigation('/')}>
            <span>
              <FiShoppingBag size={20} />
            </span>
            Products
          </button>
        </li>
        <li>
          <button
            className="checkout"
            onClick={() => handleNavigation('/checkout')}
          >
            <span>
              <BsFillCartCheckFill size={20} />
            </span>
            Checkout <p>{count}</p>
          </button>
        </li>
      </ul>
    </div>
  )
}

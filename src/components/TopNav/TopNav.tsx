import { useState } from 'react'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { Button } from '../ui/button'

export const TopNav = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const Icon = menuOpen ? IoMdClose : IoMdMenu

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  return (
    <nav className="w-full h-12 bg-slate-200 flex justify-between">
      <div className="h-full align-middle">Chess</div>
      <Button onClick={toggleMenu} className="w-12 h-12" variant="ghost">
        <Icon />
      </Button>
    </nav>
  )
}

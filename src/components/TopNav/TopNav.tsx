import { GiHamburgerMenu } from 'react-icons/gi'

export const TopNav = () => {
  return (
    <div className="navbar bg-blue-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-slate-800">Chess</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <GiHamburgerMenu className="fill-slate-800" />
        </button>
      </div>
    </div>
  )
}

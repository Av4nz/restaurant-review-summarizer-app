import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full bg-slate-700 text-slate-50 z-50'>
      <div className='container mx-auto flex items-center justify-between p-4'>
        <div className='text-xl font-bold'>
          <a href="/">My Website</a></div>
        <ul className='flex space-x-4'>
          <li><a href="/" className='text-slate-50'>Home</a></li>
          <li><a href="#" className='text-slate-50'>Guide</a></li>
          <li><a href="#" className='text-slate-50'>Contact</a></li>
        </ul>
      </div>

    </nav>
  )
}

export default Navbar

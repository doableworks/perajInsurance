import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const navLinks:{ name: string; href: string}[] = [
    { name: 'Who We Are', href: '/who-we-are' },
    { name: 'Product', href: '/products' },
    {name:'Sectors', href:'/sectors' },
    {name:'Solutions', href:'/solutions' },
    {name: 'Life at Peraj', href: '/life-at-peraj' },
    {name:'Careers', href:'/careers' },
]
function Navbar() {
  return (
    <nav className='bg-white flex py-3 w-full items-center justify-between px-24 z-[100] sticky top-0'>
        <Image src = "/logo.png" alt = "Peraj Logo" width={80} height={50} />
        <div className='flex lg:gap-10'>
            {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className='text-text-primary font-medium transition-colors duration-300'
                >
                    {link.name}
                </Link>
            ))}
        </div>
        <div className='flex items-center'>
            <Image src = "/icons/searchIcon.svg" alt = "Peraj Logo" width={20} height={20} />
            <button className='px-6 py-2 bg-primary-foreground text-text-primary text-sm font-medium rounded-sm ml-4 transition-colors duration-300 flex items-center'>
                <span className='w-2 h-2 bg-primary rounded-full mr-2'></span>
                Contact
            </button>
        </div>
    </nav>
  )
}

export default Navbar
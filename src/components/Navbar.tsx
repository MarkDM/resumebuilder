import { useEffect } from 'react'
import MenuLinks from './MenuLinks';




function Navbar(
    {
        menuOpen = true,
        setMenuOpen = (_: boolean) => { }
    }: {
        menuOpen?: boolean;
        setMenuOpen?: (open: boolean) => void;
    }
) {

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    }, [menuOpen]);

    return (
        <nav className="bg-[rgba(10,10,10,0.8)] backdrop:blur-lg border-b border-white/10 shadow-lg text-white p-4 fixed w-full top-0 left-0 z-50">
            <div className='max-w-5xl mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    <a href='#home' className='font-mono text-xl font-bold text-white hover:text-amber-500 transition-colors duration-300'>
                        marcos
                        <span className='text-blue-500'>.douglas</span>
                    </a>

                    {
                        !menuOpen && (
                            <div onClick={() => setMenuOpen(!menuOpen)} className='w-7 h-5 relative cursor-pointer z-40 md:hidden text-white hover:text-amber-500 transition-colors duration-300'>
                                &#9776;
                            </div>
                        )

                    }

                    <div className='hidden flex-row itens-center md:flex space-x-6 text-sm font-medium'>
                        <MenuLinks />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

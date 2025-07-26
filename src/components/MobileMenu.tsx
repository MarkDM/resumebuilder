import MenuLinks from './MenuLinks';

function MobileMenu({
    menuOpen = true,
    setMenuOpen = (_: boolean) => { }
}: {
    menuOpen?: boolean;
    setMenuOpen?: (open: boolean) => void;
}) {
    return (
        <div className={`${menuOpen ? 'h-screen opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'} 
        transition-all 
        duration-300 
        ease-in-out 
        fixed 
        top-0 
        left-0 
        w-full
        bg-[rgba(10,10,10,0.8)]
        backdrop-blur-sm 
        z-50 
        flex 
        flex-col
        space-y-6
        py-8
        items-center 
        justify-center`}>

            <button onClick={() => setMenuOpen(false)} className='absolute 
                top-4 
                right-4
                text-3xl
                flex items-center 
                justify-center
                text-white
                hover:text-amber-500
                transition-colors
                duration-300'
                aria-label="Close menu"
            >
                &times;
            </button>

            <MenuLinks onclick={(_) => setMenuOpen(false)} menuOpen />


        </div>
    )
}

export default MobileMenu

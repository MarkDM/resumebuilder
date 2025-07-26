import React, { useEffect } from 'react'

function MenuLinks({
    menuOpen = true,
    onclick = (_: React.MouseEvent<HTMLAnchorElement>) => { }
}) {

    var cls = 'hover:font-extrabold hover:text-secondary transition-colors duration-300 font-semibold'

    useEffect(() => {
        cls = `${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${cls}`
    }, [menuOpen])

    console.log('MenuLinks', 'build')

    return (
        <>
            <a onClick={onclick} href='#home' className={cls}>Home</a>
            <a onClick={onclick} href='#about' className={cls}>About</a>
            <a onClick={onclick} href='#projects' className={cls}>Projects</a>
            <a onClick={onclick} href='#contact' className={cls}>Contact</a>
        </>
    )
}

export default MenuLinks

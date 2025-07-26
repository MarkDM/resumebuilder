import React, { useEffect, useRef } from 'react'

function RevealOnScroll({ children }: { children: React.ReactNode }) {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entry) => {
            if (entry.filter((e) => e.isIntersecting).length > 0) {
                ref.current?.classList.add("visible")
            } else {
                ref.current?.classList.remove("visible")
            }
        }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" })


        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [])

    return (
        <div ref={ref} className='reveal'>
            {children}
        </div>
    )
}

export default RevealOnScroll

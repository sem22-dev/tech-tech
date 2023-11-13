

"use client"

import dynamic from 'next/dynamic'

const Home = dynamic(
    () => import('./homepage'),
    {ssr: false})

const IndexPages = () => {
    return (
        <>
            <Home />
        </>
    )
}

export default IndexPages 
import Link from 'next/link'
import {useRouter} from "next/router"
import {useState} from "react";

import style from './Sidebar.module.css'

const linkToNameMap = {
    '/': 'Home',
    '/scavenger': 'Scavenger'
}

const ActiveLink = ({href}) => {
    const router = useRouter()
    let className = ''
    if (router.pathname === href) {
        className = style.active
    }

    return <Link href={href}><a className={className}>{linkToNameMap[href]}</a></Link>
}

const Sidebar = ({children}) => {

    const router = useRouter()
    const currentPath = router.pathname

    const [showMe, setShowMe] = useState(true)
    const toggleLinkVisibility = () => {
        setShowMe(!showMe)
    }

    return (
        <div>
            <div className={style.sidebar}>
                <div className={style.toggle} onClick={toggleLinkVisibility} onChange={console.log}>
                    {linkToNameMap[currentPath]}
                </div>
                <div style={{display: showMe ? 'block' : 'none'}}>
                    <ActiveLink href="/"/>
                    <ActiveLink href="/scavenger"/>
                </div>
            </div>
            <div className={style.mainContent}>
                {children}
            </div>
        </div>
    )
}

export default Sidebar
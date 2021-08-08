import Link from 'next/link'
import {useRouter} from "next/router"
import {useState} from "react";

import style from './Sidebar.module.css'

const linkToNameMap = {
    '/': 'Home',
    '/scavenger': 'Scavenger',
    '/carolyn': 'Carolyn',
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

    const [linkVisibilityState, setLinkVisibilityState] = useState(style.linkVisibility)
    const toggleLinkVisibility = () => {
        if (linkVisibilityState === "")
            setLinkVisibilityState(style.linkVisibility)
        else
            setLinkVisibilityState("")
    }

    return (
        <div>
            <div className={style.sidebar}>
                <div className={style.toggle} onClick={toggleLinkVisibility}>
                    {linkToNameMap[currentPath]}
                </div>
                <div className={linkVisibilityState}>
                    <ActiveLink href="/"/>
                    <ActiveLink href="/scavenger"/>
                    <ActiveLink href="/carolyn"/>
                </div>
            </div>
            <div className={style.mainContent}>
                {children}
            </div>
        </div>
    )
}

export default Sidebar
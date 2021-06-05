import Link from 'next/link'
import {useRouter} from "next/router"

import style from './Sidebar.module.css'

const ActiveLink = ({href, children}) => {
    const router = useRouter()
    return <Link href={href}><a className={router.pathname == href ? style.active : ''}>{children}</a></Link>
}

const Sidebar = ({children}) => {
    return (
        <div>
            <div className={style.sidebar}>
                <div>
                    <ActiveLink href="/">Home</ActiveLink>
                    <ActiveLink href="/project">News</ActiveLink>
                </div>
            </div>
            <div className={style.mainContent}>
                {children}
            </div>
        </div>
    )
}

export default Sidebar
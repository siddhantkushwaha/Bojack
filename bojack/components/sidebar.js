import style from './Sidebar.module.css'

const Sidebar = ({children}) => {
    return (
        <div className="row">
            <div className="col-md-2">

            </div>
            <div className="col">
                <div className={style.mainContent}>
                    {children}
                </div>
            </div>
            <div className="col-md-3">

            </div>
        </div>
    )
}

export default Sidebar
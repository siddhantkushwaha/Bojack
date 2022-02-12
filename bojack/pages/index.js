import style from './Index.module.css'

export default function Index() {
    return (
        <div className="container">

            {/* ----------------- About -------------- */}
            <div className="row align-items-center">
                <div className="col-md-3 pt-4 pt-md-0">
                    <img
                        src="/img/me.jpg"
                        className={style.profilePicture}/>
                </div>
                <div className="col-md-9 pt-4 pt-md-0">
                    <h1>Siddhant Kushwaha</h1>
                    <h6 className={style.bioHeadline}>Software Developer</h6>
                    <h5><a className={style.link}><i className="bi bi-envelope-fill"/> k16.siddhant@gmail.com</a></h5>
                    <h5><a className={style.link} href={"https://github.com/siddhantkushwaha"} target={"_blank"}><i
                        className="bi bi-github"/> siddhantkushwaha</a></h5>
                    <h5><a className={style.link} href={"https://www.linkedin.com/in/siddhantkushwaha/"}
                           target={"_blank"}><i
                        className="bi bi-linkedin"/> siddhantkushwaha</a></h5>
                    <h5><a className={style.link} href={"https://www.instagram.com/__sidsidsid__/"} target={"_blank"}><i
                        className="bi bi-instagram"/> __sidsidsid__</a></h5>
                </div>
            </div>

            <hr/>

            {/* TODO add more here */}


        </div>
    )
}

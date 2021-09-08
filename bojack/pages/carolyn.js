import style from './Carolyn.module.css'
import Head from 'next/head'

export default function Carolyn() {
    return (
        <div className="container">
            <Head>
                <title>Carolyn</title>
            </Head>
            <div className="row" style={{height: "100vh"}}>
                <div className="col-md-8 p-md-5">
                    <div>
                        <h5 className={`${style.question}`}>What is this?</h5>
                        <p className={`${style.answer}`}>Carolyn is an Android app that helps you declutter your sms
                            messages.</p>
                    </div>

                    <div className={`mt-4`}>
                        <h5 className={`${style.question}`}>Why is this?</h5>
                        <p className={`${style.answer}`}>More than 80% of messages that we get in India are spam, with
                            Carolyn's on device intelligence we are able to identify if a message is trash or otherwise
                            to take appropriate measures.</p>
                    </div>

                    <div className={`mt-4`}>
                        <h5 className={`${style.question}`}>Where is this?</h5>
                        <p className={`${style.answer} m-0`}>On the <a style={{textDecoration: "none"}}
                                                                       href="https://play.google.com/store/apps/details?id=com.siddhantkushwaha.carolyn"
                                                                       target="_blank">Google Play Store.</a> Duh.</p>
                    </div>

                    <div className={`mt-4`}>
                        <h5 className={`${style.question}`}>How is this?</h5>
                        <p className={`${style.answer} m-0`}>Code. Coffee.</p>
                    </div>

                    <div className={`mt-4 mb-3`}>
                        <h5 className={`${style.question}`}>Who is this?</h5>
                        <a href="https://www.linkedin.com/in/siddhantkushwaha/" className={`${style.answer}`}><i
                            className="bi bi-linkedin"/> Siddhant Kushwaha</a><br/>
                        <a href="https://www.linkedin.com/in/ayushi-agarwal-816b4716b/" className={`${style.answer}`}><i
                            className="bi bi-linkedin"/> Ayushi Agarwal</a>
                    </div>

                    <div className={`mt-4 mb-3`}>
                        <h5 className={`${style.question}`}>Privacy Policy</h5>
                        <ul>
                            <li className={`${style.answer}`}>The messages are read by the app and classified by an on
                                device model. They never leave
                                your phone, under no circumstances.
                            </li>
                            <li className={`${style.answer}`}>We do not share or keep any user message or contact
                                information. This information is
                                only used for the purpose of showing it to the user.
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="col-md-4 align-self-center px-md-5">
                    <div id="screenshots" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="/img/carolyn/otp.jpg" className={`d-block w-100 ${style.screenshot}`}/>
                            </div>
                            <div className="carousel-item">
                                <img src="/img/carolyn/spam.jpg" className={`d-block w-100 ${style.screenshot}`}/>
                            </div>
                            <div className="carousel-item">
                                <img src="/img/carolyn/message.jpg" className={`d-block w-100 ${style.screenshot}`}/>
                            </div>
                            <div className="carousel-item">
                                <img src="/img/carolyn/login.jpg" className={`d-block w-100 ${style.screenshot}`}/>
                            </div>
                            <div className="carousel-item">
                                <img src="/img/carolyn/dashboard.jpg" className={`d-block w-100 ${style.screenshot}`}/>
                            </div>
                            <div className="carousel-item">
                                <img src="/img/carolyn/profile.jpg" className={`d-block w-100 ${style.screenshot}`}/>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#screenshots"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#screenshots"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

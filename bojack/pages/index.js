import style from './Index.module.css'

const Work = ({title, subtitle, link, about}) => {
    return <div className="col p-1">
        <div className={`card h-100 ${style.cardWork}`}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                <a href={link} className={`card-link ${style.link}`} target="_blank">
                    <i className="bi bi-lightbulb-fill"/> Learn More
                </a>
                <p className="card-text">{about}</p>
            </div>
        </div>
    </div>
}

const Project = ({title, subtitle, about, link}) => {
    return <div className="col p-1">
        <div className={`card h-100 ${style.cardProject}`}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                <a href={link} className={`card-link ${style.link}`} target="_blank">
                    <i className="bi bi-github"/> View Source
                </a>
                <p className="card-text pt-2">{about}</p>
            </div>
        </div>
    </div>
}

const Education = ({title, subtitle, about, link, grade}) => {
    return <div className="col p-1">
        <div className={`card h-100 ${style.cardEducation}`}>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                <a href={link} className={`card-link ${style.link}`} target="_blank">
                    <i className="bi bi-book-half"/> Know More
                </a>
                <p className="card-text pt-1">{about}</p>
                <h3 className="text-muted">{grade}</h3>
            </div>
        </div>
    </div>
}

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
                    <h6 className={style.bioHeadline}>SDE at Commvault | IIIT SriCity</h6>
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

            {/* ----------------- Work Experience -------------- */}
            <div>
                <h5>Work Experience</h5>
                <p className={style.sectionTitle}>I interned at a couple places before graduating in 2020 and joining
                    Commvault.</p>

                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 p-1">

                    <Work
                        title={"Commvault"}
                        subtitle={"Enterprise data backup and recovery."}
                        about={"Working as a software developer with one of the core teams, I solve problems that come with trying to browse and restore terabytes of data and millions of files from countless sources."}
                        link={"https://www.commvault.com/"}
                    />

                    <Work
                        title={"Egregore Labs"}
                        subtitle={"Unique insights from unstructured data."}
                        about={"Wrote modules to collect and process data from web, wrote algorithms to help extract data from documents, forms."}
                        link={"https://www.egregorelabs.com/"}
                    />

                    <Work
                        title={"Cheruvu"}
                        subtitle={"Helping farmers with data science."}
                        about={"Interned at Cheruvu as an Android app developer, working on app to facilitate data collection from farmers."}
                        link={"https://in.linkedin.com/company/cheruvu/"}
                    />

                </div>
            </div>
            <hr/>

            {/* ----------------- Recent projects -------------- */}
            <div>
                <h5>Recent Projects</h5>
                <p className={style.sectionTitle}>Head over to my GitHub to look at my other upcoming and ongoing
                    projects
                    if interested.</p>

                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 p-1">
                    <Project
                        title={"Carolyn"}
                        subtitle={"SMS superpowers."}
                        about={"On device intelligence for classification of sms messages into different categories plus notification management."}
                        link={"https://github.com/siddhantkushwaha/Carolyn-Android"}
                    />

                    <Project
                        title={"Todd"}
                        subtitle={"Google Drive CLI."}
                        about={"Built with Java and Kotlin, " +
                        "Todd can act as a standalone executable and a library to help manage content on Google Drive."}
                        link={"https://github.com/siddhantkushwaha/Todd"}
                    />

                    <Project
                        title={"CoWinBot"}
                        subtitle={"A Telegram bot to detect vaccination slot availability."}
                        about={"To tackle the problem of scaling for data collection, a distributed approach was attempted."}
                        link={"https://github.com/siddhantkushwaha/CoWinBot"}
                    />

                    <Project
                        title={"Palladium"}
                        subtitle={"Selenium wrapper for python."}
                        about={"Automatically downloads and sets up binaries, custom classes with some extra functionality."}
                        link={"https://github.com/siddhantkushwaha/Palladium.git"}
                    />

                </div>
            </div>
            <hr/>

            {/* ----------------- Education -------------- */}
            <div>
                <h5>Education</h5>
                <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 p-1">
                    <Education
                        title={"Indian Institute of Information Technology"}
                        subtitle={"SriCity, Andhra Pradesh."}
                        about={"Computer Science."}
                        link={"http://www.iiits.ac.in/"}
                        grade={8.22}
                    />

                    <Education
                        title={"Aryaman Vikram Birla Institute of Learning"}
                        subtitle={"Haldwani, Nainital."}
                        about={"Schooling."}
                        link={"https://www.avbil.net/"}
                        grade={"92.8"}
                    />

                </div>
            </div>

            {/* TODO add more here */}

            <div className={style.bottomPad}/>
        </div>
    )
}

import style from './Scavenger.module.css'
import {useState} from "react";

const beautifyName = (name) => {
    return name.replace(/\//g, " / ").trim()
}

const ResultItem = ({name, description, link, content}) => {
    return <div className="col-lg-12 mb-2">
        <div className={`card h-100 ${style.resultItem}`}>
            <div className="card-body">
                <h5 className={`card-title ${style.resultItemTitle}`}>{beautifyName(name)}</h5>
                <h6 className={`card-subtitle mb-2 text-muted ${style.resultItemDescription}`}>{description}</h6>
                <p className={`card-text mt-3 p-2 ${style.resultItemContent}`}>{content}</p>
                <a href={link} className={`card-link ${style.link} ${style.resultItemLink}`} target="_blank"><i
                    className="bi bi-eye-fill"/> View Document</a>
            </div>
        </div>
    </div>
}

export default function Scavenger() {

    const [preferencesVisibilityState, setPreferencesVisibilityState] = useState(style.preferencesVisibility)
    const togglePreferencesVisibility = () => {
        if (preferencesVisibilityState === "")
            setPreferencesVisibilityState(style.preferencesVisibility)
        else
            setPreferencesVisibilityState("")
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-9">

                    {/* Inputs related to search go here */}
                    <form method="GET">
                        <div>
                            <input type="text"
                                   className={`form-control border-0 bg-dark text-white shadow-none ${style.searchInput}`}
                                   placeholder="Type to search."
                                   name="query"/>
                        </div>
                        <div className={`list-group list mt-2 ${style.preferences}`}>
                            <button type="button" className={`list-group-item ${style.preferenceItem} border-bottom-0`}
                                    onClick={togglePreferencesVisibility}>
                                <i className={`bi bi-gear-fill`}/>
                            </button>
                            <div className={preferencesVisibilityState}>
                                <label className={`list-group-item ${style.preferenceItem}`}>
                                    <input className={`form-check-input me-2 ${style.preferenceInput}`} type="checkbox"
                                           name="useRegex"/>
                                    Use regular expressions
                                </label>
                                <label className={`list-group-item ${style.preferenceItem} border-bottom-0`}>
                                    <input className={`form-check-input me-2 ${style.preferenceInput}`} type="radio"
                                           name="termOperator" value="or" checked/>
                                    Qualify if at least one query term is present
                                </label>
                                <label className={`list-group-item ${style.preferenceItem}`}>
                                    <input className={`form-check-input me-2 ${style.preferenceInput}`} type="radio"
                                           name="termOperator" value="and"/>
                                    Qualify only if all query terms are present
                                </label>
                            </div>
                        </div>
                    </form>

                    {/* This will be the content section */}
                    <div className="my-3">

                        {/* In future only one of the two divs is supposed to ve visible at a time */}

                        {/* This will be the project info */}
                        <div className={`p-3 mb-3 ${style.info}`}>
                            <div className="text-center pb-2">
                                <img
                                    src="/img/scavenger.png"
                                    width="100px"
                                    height="100px"/>
                            </div>
                            <p>Scavenger is built to organise all the work that I do on a daily basis on different
                                platforms.</p>
                            <p>The goal here is to make almost everything I do searchable and get some insights into how
                                search
                                engines work and answer following important questions.</p>
                            <ul className={`px-5 py-3 ${style.infoBox}`}>
                                <li>How to collect and organize data from different sources?</li>
                                <li>How to make querying easier?</li>
                                <li>How to rank documents based on relevance?</li>
                                <li>How to derive useful insights from different kinds of documents?</li>
                            </ul>
                        </div>

                        {/* This will be the SEARCH content section */}
                        <div className="row">

                            <ResultItem
                                name={"/siddhantkushwaha/Carolyn-Android/build.gradle"}
                                description={"This is some description"}
                                link={"#"}
                                content={
                                    <>This is some <b>content to demonstrate UI for Scavenger.</b></>
                                }
                            />

                            <ResultItem
                                name={"/siddhantkushwaha/Carolyn-Android/build.gradle"}
                                description={"This is some description"}
                                link={"#"}
                                content={
                                    <>This is some <b>content to demonstrate UI for Scavenger.</b></>
                                }
                            />

                            <ResultItem
                                name={"/siddhantkushwaha/Carolyn-Android/build.gradle"}
                                description={"This is some description"}
                                link={"#"}
                                content={
                                    <>This is some <b>content to demonstrate UI for Scavenger.</b></>
                                }
                            />

                        </div>

                    </div>

                </div>

                {/* For now this is empty, in future, we could use it for other things :) */}
                <div className="col-lg-3">

                </div>

            </div>
        </div>
    )
}

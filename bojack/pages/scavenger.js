import style from './Scavenger.module.css'
import {useState} from "react";

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
                                           name="termOperator" checked/>
                                    Qualify if at least one query term is present
                                </label>
                                <label className={`list-group-item ${style.preferenceItem}`}>
                                    <input className={`form-check-input me-2 ${style.preferenceInput}`} type="radio"
                                           name="termOperator"/>
                                    Qualify only if all query terms are present
                                </label>
                            </div>
                        </div>
                    </form>

                    {/* This will be the content section */}
                    <div className="mt-3">

                        {/* only one of the two divs is supposed to ve visible at a time */}

                        {/* This will be the project info */}
                        <div className={`p-3 ${style.info}`}>
                            <div className="text-center pb-2">
                                <img
                                    src="/img/scavenger.png"
                                    style={{
                                        width: "100px",
                                        height: "100px"
                                    }}/>
                            </div>
                            <p>Scavenger is built to organise all the work that I do on a daily basis on different
                                platforms.</p>
                            <p>The goal here is to make everything searchable and get some insights into how search
                                engines work and answers to some important questions.</p>
                            <ul className={`px-5 py-3 ${style.infoList}`}>
                                <li>How to collect and organize data from different sources?</li>
                                <li>How to make querying easier?</li>
                                <li>How to rank documents based on relevance?</li>
                                <li>How to derive useful insights from different kinds of documents?</li>
                            </ul>
                        </div>

                        {/* This will be the SEARCH content section */}
                        <div>

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

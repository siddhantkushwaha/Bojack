import style from './Scavenger.module.css'
import {useRef, useState} from "react"

import axios from "axios"
import {throttle} from "lodash"
import dateFormat from "dateformat"


const ResultItem = ({docId, name, description, highlightContent, lastModifiedEpoch}) => {

    const [isFullContentShown, setIsFullContentShown] = useState(false)
    const toggleFullContent = () => {
        setIsFullContentShown(!isFullContentShown)
        if (document === null) {
            throttledReq()
        }
    }

    const [document, setDocument] = useState(null)
    const getDocument = () => {
        axios.get("/api/get", {params: {docId: docId}})
            .then((res) => {
                console.log(res.data)
                setDocument(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }
    const throttledReq = useRef(throttle(() => {
        getDocument()
    }, 1000)).current

    const beautifyName = (name) => {
        return name.replace(/\//g, " / ").trim()
    }

    const shouldShowContentDiv = () => {
        const isHighlightContentValid = highlightContent !== null && highlightContent !== undefined && highlightContent.length > 0
        if (isFullContentShown)
            return document !== null || isHighlightContentValid
        else
            return isHighlightContentValid
    }

    return <div className="col-lg-12 mb-2">
        <div className={`card h-100 ${style.resultItem}`}>
            <div className="card-body">
                <h5 className={`card-title ${style.resultItemTitle}`}>{beautifyName(name)}</h5>
                <h6 className={`card-subtitle mb-2 text-muted ${style.resultItemDescription}`}>{description}</h6>
                <div className={`card-text mt-3 p-2 ${style.resultItemContent}`}
                     style={shouldShowContentDiv() ? {} : {display: 'none'}}>
                    <code className={`${style.resultItemContentCode} js`}>
                        {isFullContentShown ? (document === null ? highlightContent : document.data) : highlightContent}
                    </code>
                </div>
                <div className="mt-3 d-flex align-items-center">
                    <a className={`card-link ${style.link} ${style.resultItemLink}`} onClick={toggleFullContent}>
                        <i className={`bi ${isFullContentShown ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}/>
                    </a>
                    <span className={`ms-auto d-flex align-items-center ${style.lastModifiedTime}`}>
                        <i className="bi bi-clock-history"/>
                        <span className="ps-1">
                            {dateFormat(new Date(lastModifiedEpoch * 1000), "mmmm d, yyyy h:MM TT")}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
}

const FieldInput = ({name, value, checkedFields, onChangeFunc}) => {
    return <label className={`list-group-item flex-fill ${style.preferenceItem}`}
                  style={{borderTopRightRadius: "0", borderBottomLeftRadius: "0"}}>
        <input className={`form-check-input me-2 ${style.preferenceInput}`}
               type="checkbox"
               name="field"
               value={value}
               checked={checkedFields.indexOf(value) > -1}
               onChange={(e) => {
                   onChangeFunc(e)
               }}
        />
        {name}
    </label>
}

export default function Scavenger() {

    const [searchReq, setSearchReq] = useState({
        query: "",
        useRegex: true,
        limit: 10,
        field: ["path", "name", "description", "data"]
    })
    const [result, setResults] = useState(null)

    const doSearch = (e) => {
        let targetValue = e.target.value

        if (e.target.name === "field") {
            const i = searchReq.field.indexOf(targetValue)
            if (e.target.checked && i < 0) {
                searchReq.field.push(targetValue)
            } else if (!e.target.checked && i >= 0) {
                searchReq.field.splice(i, 1)
            }
            targetValue = searchReq.field
        }

        // if field if a checkbox, replace value with check boolean
        else if (e.target.type === "checkbox") {
            targetValue = e.target.checked
        }

        // do not remote this, we need to be sure req object was updated
        searchReq[e.target.name] = targetValue
        throttledReq(searchReq)

        // also update doc state
        setSearchReq({
            ...searchReq,
            [e.target.name]: targetValue
        })
    }

    const makeRequestUpdateResult = (req) => {

        const params = new URLSearchParams()
        for (const key of Object.keys(req)) {
            if (typeof req[key] === 'object')
                for (const i of req[key]) {
                    params.append(key, i)
                }
            else
                params.append(key, req[key])
        }

        if (req.query.length > 0) {
            axios.get("/api/search", {params: params})
                .then((res) => {
                    console.log(res.data)
                    setResults(res.data)
                })
                .catch((err) => {
                    console.error(err)
                    setResults(null)
                })
        } else {
            setResults(null)
        }
    }
    const throttledReq = useRef(throttle((req) => {
        makeRequestUpdateResult(req)
    }, 1000)).current

    const [preferencesVisibilityState, setPreferencesVisibilityState] = useState(style.preferencesVisibility)
    const togglePreferencesVisibility = () => {
        if (preferencesVisibilityState === "")
            setPreferencesVisibilityState(style.preferencesVisibility)
        else
            setPreferencesVisibilityState("")
    }

    const getResultItems = (documents) => {
        if (documents === undefined)
            return

        const resultItems = documents.map((doc) => {
                let highlights = doc["highlights"]
                if (highlights === null || highlights === undefined)
                    highlights = [""]
                highlights = highlights[0]

                return <ResultItem
                    docId={doc.id}
                    key={doc.key}
                    name={doc.name.length > 0 ? doc.name : doc.key}
                    description={doc.description}
                    highlightContent={highlights}
                    lastModifiedEpoch={doc['modifiedEpochTime']}
                />
            }
        )
        return <>{resultItems}</>
    }

    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-9">

                    {/* Inputs related to search go here */}
                    <form method="GET">
                        <div className="input-group">
                            <input type="text"
                                   className={`form-control border-0 bg-dark text-white shadow-none ${style.searchInput}`}
                                   placeholder="Type to search."
                                   name="query"
                                   value={searchReq.query}
                                   onChange={(e) => {
                                       doSearch(e)
                                   }}
                            />
                            <button type="button"
                                    className={`list-group-item ${style.preferenceButton} border-0`}
                                    onClick={togglePreferencesVisibility}
                            ><i className={`bi bi-gear-fill`}/>
                            </button>
                        </div>

                        <div className={`mt-2 ${preferencesVisibilityState}`}>

                            <div className={`list-group ${style.preferences}`}>
                                <label className={`list-group-item ${style.preferenceItem} border-bottom-0`}>
                                    <input className={`form-check-input me-2 ${style.preferenceInput}`}
                                           type="checkbox"
                                           name="useRegex"
                                           checked={searchReq.useRegex}
                                           onChange={(e) => {
                                               doSearch(e)
                                           }}
                                    />
                                    Use regular expressions
                                </label>
                            </div>

                            <div className={`list-group-item border-bottom-0 ${style.preferenceItem}`}>
                                Apply query on following fields
                            </div>
                            <div className={`list-group list-group-horizontal-md ${style.preferences}`}>
                                <FieldInput
                                    name={"Path"}
                                    value={"path"}
                                    checkedFields={searchReq.field}
                                    onChangeFunc={doSearch}/>
                                <FieldInput
                                    name={"Name"}
                                    value={"name"}
                                    checkedFields={searchReq.field}
                                    onChangeFunc={doSearch}/>
                                <FieldInput
                                    name={"Description"}
                                    value={"description"}
                                    checkedFields={searchReq.field}
                                    onChangeFunc={doSearch}/>
                                <FieldInput
                                    name={"Data"}
                                    value={"data"}
                                    checkedFields={searchReq.field}
                                    onChangeFunc={doSearch}/>
                                <FieldInput
                                    name={"Extension"}
                                    value={"fileExtension"}
                                    checkedFields={searchReq.field}
                                    onChangeFunc={doSearch}/>
                                <FieldInput
                                    name={"Source"}
                                    value={"dataSource"}
                                    checkedFields={searchReq.field}
                                    onChangeFunc={doSearch}/>
                            </div>

                        </div>

                    </form>

                    {/* This will be the content section */}
                    <div className="my-3">

                        {/* In future only one of the two divs is supposed to ve visible at a time */}

                        {/* This will be the project info */}
                        <div className={`p-3 mb-3 ${style.info}`}
                             style={result === null || result["totalHits"] === 0 ? {} : {display: 'none'}}>

                            <div className="text-center pb-2">
                                <img
                                    alt="Scavenger Logo"
                                    src="/img/scavenger.png"
                                    width="100px"
                                    height="100px"
                                />
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

                            <p>This project is under development and may not always work.</p>
                        </div>

                        {/* This will be the SEARCH content section */}
                        <div className="row"
                             style={result === null || result["totalHits"] === 0 ? {display: 'none'} : {}}>

                            {result !== null ? getResultItems(result["documents"]) : ""}

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

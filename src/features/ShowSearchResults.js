import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, Link, useHistory } from 'react-router-dom'

import { fetchSearchResults } from './newsSlice'

import { Form, FormControl, Button, Alert } from 'react-bootstrap'
import style from '../style/ShowSearchResults.module.css'


export const AlertBox = (props) => {
    const [showAlert, setShowAlert] = useState(true)
    const handleClose = () => {
        setShowAlert(false)
    }

    if (!showAlert) return null
    return (
        <Alert variant="danger" className={style.alert} onClose={handleClose} dismissible>
            {props.error}
        </Alert>
    )
}

export const CostumSelect = () => {
    const dispatch = useDispatch()
    const query = useSelector(state => state.news.searchResults.queryForResults)
    const sortedBy = useSelector(state => state.news.searchResults.sortedBy)

    const Select = {
        open: false, value: "",
        options: [
            {
                name: "Relevance",
                selected: false,
                sortBy: "relevancy"
            },
            {
                name: "Popularity",
                selected: false,
                sortBy: "popularity"
            },
            {
                name: "Date",
                selected: false,
                sortBy: "publishedAt"
            },
        ]
    }

    const currentIndex = Select.options.findIndex(option => option.sortBy === sortedBy)
    Select.options[currentIndex].selected = true
    Select.value = Select.options[currentIndex].name

    const [select, handleSelect] = useState(Select)

    const handleClickOptions = (optionName, sortBy, index) => {
        const selectCopy = Object.assign({}, select)
        selectCopy.value = optionName
        selectCopy.open = false
        selectCopy.options = selectCopy.options.map(item => { return { name: item.name, selected: false, sortBy: item.sortBy } })
        selectCopy.options[index].selected = true
        handleSelect(selectCopy)

        dispatch(fetchSearchResults({ query: query, sortBy: sortBy }))
    }

    const handleClick = (e) => {
        const selectCopy = Object.assign({}, select)
        selectCopy.open = !selectCopy.open
        handleSelect(selectCopy)
    }

    const optionsRend = select.options.map((option, index) =>
        <span key={index} className={option.selected ? style.selected : ""} onClick={() => handleClickOptions(option.name, option.sortBy, index)}>{option.name}</span>
    )

    return (
        <div className={style.costumSelect}>
            <FormControl type="text" onClick={handleClick} value={`Sorted by ${select.value}`} readOnly></FormControl>
            <div className={`${style.options} ${select.open ? "" : style.hide}`}>
                {optionsRend}
            </div>
        </div>
    )
}

const Search = () => {
    const history = useHistory()
    const queryForResults = useSelector(state => state.news.searchResults.queryForResults)
    const sortedBy = useSelector(state => state.news.searchResults.sortedBy)

    const [search, setSearch] = useState(queryForResults)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search?q=${search}`)
    }

    useEffect(() => {
        setSearch(queryForResults)
    }, [queryForResults])

    return (
        <Form onSubmit={handleSubmit} className={style.search}>
            <Form.Control type="text" placeholder="Search" value={search} onChange={handleChange} onSubmit={handleSubmit} />
        </Form>
    )
}

const NavbarWithSearch = () => {
    return (
        <div className={style.searchNavbar}>
            <Search />
            <CostumSelect />
        </div>
    )
}

const NewsArticle = (props) => {
    return (
        <div className={style.card}>
            <div className={style.image}>
                <img src={props.newsArticle.urlToImage} alt="" />
            </div>
            <div className={style.cardBody}>
                <div className={style.cardTitle}>
                    <h5>{props.newsArticle.title}</h5>
                </div>
                <div className={style.cardText}>
                    <p>{props.newsArticle.description}</p>
                </div>
                <div className={style.cardNavigation}>
                    <Link to={{
                        pathname: `/news/${props.newsArticle.title}`,
                        state: {
                            articleIndex: props.articleIndex,
                            articleCategory: "searchResults"
                        }
                    }}><Button variant="primary">Read full article</Button></Link>
                </div>
            </div>
        </div>
    )
}

export const ShowSearchResults = () => {
    const dispatch = useDispatch()
    const newsArticles = useSelector(state => state.news.searchResults.newsArticles)
    const newsStatus = useSelector(state => state.news.searchResults.status)
    const error = useSelector(state => state.news.searchResults.error)
    const sortedBy = useSelector(state => state.news.searchResults.sortedBy)

    const query = new URLSearchParams(useLocation().search).get("q")

    const newsArticlesRend = newsArticles.map((newsArticle, index) =>
        <NewsArticle
            key={index}
            newsArticle={newsArticle}
            articleIndex={index} />
    )

    useEffect(() => {
        if (query)
            dispatch(fetchSearchResults({ query: query, sortBy: sortedBy }))
    }, [query, dispatch])

    return (
        (newsStatus !== "failed") ?
            <div className={style.ShowSearchResults}>
                <NavbarWithSearch />
                <div className={style.showNews}>
                    {newsArticlesRend}
                </div>
            </div> : <AlertBox error={error.message} />
    )
}
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { fetchTopHeadlines } from './newsSlice'

import { Button, Alert } from 'react-bootstrap'
import style from '../style/ShowTopHeadlines.module.css'


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
            </div>
            <div className={style.cardNavigation}>
                <Link to={{
                    pathname: `/breaking-news/${props.newsArticle.title}`,
                    state: {
                        articleIndex: props.articleIndex,
                        articleCategory: "topHeadlines"
                    }
                }}><Button variant="primary">Read full article</Button></Link>
            </div>
        </div>
    )
}

export const ShowTopHeadlines = () => {
    const dispatch = useDispatch()
    let newsArticles = useSelector(state => state.news.topHeadlines.newsArticles)
    const newsStatus = useSelector(state => state.news.topHeadlines.status)
    const error = useSelector(state => state.news.topHeadlines.error)

    const [showAllArticles, setAllArticles] = useState(false)

    const handleLoadMore = () => {
        setAllArticles(!showAllArticles)
    }

    const baseNumOfArticles = 20
    const numOfNewsArticles = newsArticles.length
    if (numOfNewsArticles > baseNumOfArticles && !showAllArticles) {
        newsArticles = newsArticles.slice(0, baseNumOfArticles);
    }

    const newsArticlesRend = newsArticles.map((newsArticle, index) =>
        <NewsArticle
            key={index}
            newsArticle={newsArticle}
            articleIndex={index} />
    )

    useEffect(() => {
        dispatch(fetchTopHeadlines())
    }, [dispatch])

    return (
        (newsStatus !== "failed") ?
            <div className={style.showNews}>
                {newsArticlesRend}
                <div className={style.loadMore}>
                    {(numOfNewsArticles > 0) ?
                        <Button variant="success" onClick={handleLoadMore}>{showAllArticles ?
                            (numOfNewsArticles > baseNumOfArticles) ? "Show less" : "There is no more" : "Show more"}</Button> : null}

                </div>
            </div> : <AlertBox error={error.message} />

    )

}
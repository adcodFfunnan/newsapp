import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import style from '../style/ShowArticle.module.css'


export const ShowArticle = (props) => {
    const history = useHistory()
    const { articleIndex, articleCategory } = props.location.state
    const newsArticles = useSelector(state => state.news[articleCategory].newsArticles)
    const newsArticle = newsArticles[articleIndex]

    if (!newsArticle) {
        history.push('/breaking-news')
        return null
    }

    return (
        <div className={style.article}>
            <div className={style.header}>
                <a href={newsArticle.url} target="_blank" rel="noreferrer">
                    <p>{newsArticle.source.name}</p></a>

                <h3>{newsArticle.title}</h3>
                <h5>{newsArticle.description}</h5>
            </div>

            <div className={style.articleBody}>
                <img src={newsArticle.urlToImage} alt="" />

                <div className={style.info}>
                    <p>By <span>{newsArticle.author}</span></p>
                    <p>{newsArticle.publishedAt}</p>
                </div>

                <div className={style.content}>
                    <p>{newsArticle.content}</p>
                </div>
            </div>

            <footer></footer>
        </div>
    )
}
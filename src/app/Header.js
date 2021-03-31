import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'

import { Form } from 'react-bootstrap'
import { FaSearch, FaBars, FaWindowClose } from 'react-icons/fa'
import logo from '../logo/logo.jpg'
import style from '../style/Header.module.css'


export const Search = (props) => {
    const history = useHistory()
    const queryForResults = useSelector(state => state.news.searchResults.queryForResults)
    const [search, setSearch] = useState(queryForResults)

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSearchIcon()
        history.push(`/search?q=${search}`)
    }

    useEffect(() => {
        setSearch(queryForResults)
    }, [queryForResults])

    return (
        <div className={style.search}>
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" placeholder="Search" value={search} onChange={handleChange} onSubmit={handleSubmit} />
            </Form>
            {props.showSearch ? <FaWindowClose onClick={props.handleSearchIcon} /> : <FaSearch onClick={props.handleSearchIcon} />}
        </div>
    )
}

const Navbar = () => {
    const [mobileMenu, showMobileMenu] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const handleBarsIcon = () => {
        showMobileMenu(!mobileMenu)
    }

    const hideBodyScrollBar = () => {
        if (mobileMenu) {
            if (!document.body.classList.contains("hidden"))
                document.body.classList.add("hidden")
        } else {
            if (document.body.classList.contains("hidden"))
                document.body.classList.remove("hidden")
        }
    }
    hideBodyScrollBar()

    const handleSearchIcon = () => {
        setShowSearch(!showSearch)
    }

    return (
        <div className={`${style.navbar} ${showSearch ? style.showSearch : ""}`}>
            <img src={logo} alt="" />
            <div className={`${style.menu} ${mobileMenu ? style.mobileMenu : ""}`}>
                <NavLink to="/breaking-news" activeClassName={style.selected} onClick={handleBarsIcon}><span>Breaking News</span></NavLink>
                <NavLink to="/news" activeClassName={style.selected} onClick={handleBarsIcon}><span>News</span></NavLink>
                <NavLink to="/travel" activeClassName={style.selected} onClick={handleBarsIcon}><span>Travel</span></NavLink>
                <NavLink to="/future" activeClassName={style.selected} onClick={handleBarsIcon}><span>Future</span></NavLink>
                <NavLink to="/culture" activeClassName={style.selected} onClick={handleBarsIcon}><span>Culture</span></NavLink>
            </div>
            <Search
                handleSearchIcon={handleSearchIcon}
                showSearch={showSearch} />
            <FaBars onClick={handleBarsIcon} />
        </div>
    )
}

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = { navVisible: true }
        this.windowYOffset = 0
    }

    handleScroll = () => {
        const scrollY = window.scrollY
        if (scrollY > this.windowYOffset && this.state.navVisible === true)
            this.setState({ navVisible: false })
        else if (scrollY < this.windowYOffset && this.state.navVisible === false)
            this.setState({ navVisible: true })

        this.windowYOffset = scrollY
    }

    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll)
    }

    render() {
        return (
            <div className={`${style.header} ${this.state.navVisible ? style.show : style.hide}`}>
                <Navbar />
            </div>
        )

    }
}
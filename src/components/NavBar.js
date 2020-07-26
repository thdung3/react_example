import React, { useState } from 'react'
import './NavBar.css';

export default function NavBar(props) {
    let [keyWord, setKeyWord] = useState('')

    const getKeyWord = (e) => {
        setKeyWord(e.target.value)
    }
    const callSearch = (e) => {
        if (e.key === "Enter") {
            props.searchByKeyWord(keyWord)
            setKeyWord('')
            e.target.value = ''
        }
    }

    const changeColor = (e) => {
        var top = window.scrollY;
        if (top > 10) {
            document.getElementById('nav-bar').classList.add('scrolled')
        } else {
            document.getElementById('nav-bar').classList.remove('scrolled')
        }
    }
    return (
        <nav id="nav-bar" className="navbar navbar-expand-lg fixed-top" onScroll={(e) => changeColor(e)}>
            <a className="navbar-brand" href="#" onClick={() => props.backHome()}>LAVIE MOVIE</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick={() => props.backHome()}>Home <span className="sr-only">(current)</span></a>
                    </li>
                </ul>
                <div id="btn-search">
                    <i id="icon-seach" className="fas fa-search"></i>
                    <input id="txt-search" type="text" placeholder="Search" onKeyPress={(e) => callSearch(e)} onChange={(e) => getKeyWord(e)} />
                </div>
            </div>
        </nav>
    )
}

import React, { useEffect, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import { bibleService } from '../services/bibleService.js'

export default function BibleApp() {

    const [chapter, setChapter] = useState({ num: '', txt: '' })
    const [filter, setFilter] = useState({ book: 'בראשית', chapter: 'א' })

    useEffect(() => {
        loadChapter(filter)
    }, [filter])

    const loadChapter = async (filter) => {
        const chapter = await bibleService.getChapterForDisplay(filter)
        setChapter(chapter)
    }

    const onChangeChapter = (direction) => {
        const chapterNum = bibleService.getChapterNum(filter.chapter, direction)
        setFilter({...filter , chapter: chapterNum})
    }

    const onSetFilter = ({ target }) => {
        setFilter({book: target.value , chapter: 'א'})
    }

    return (
        <section className="bible-app main-container">
            <section className="main-wrapper flex column align-center">
                <BibleFilter onSetFilter={onSetFilter} />
                <div className="view-wrapper flex column">
                    <h1 className="title">ספר {filter.book} פרק {chapter.num}</h1>
                    <div className="pager flex space-around flex-1">
                        <button onClick={() => onChangeChapter(1)}>next</button>
                        <h3>{chapter.txt}</h3>
                        <button onClick={() => onChangeChapter(-1)}>prev</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

// ON-WORK Directions

// const [book, setBook] = useState('בראשית')

// const onSetFilter = ({ target }) => {
//     setFilter({ chapter: 'א', book: target.value })
// }

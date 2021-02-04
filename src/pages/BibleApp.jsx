import React, { useEffect, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import { bibleService } from '../services/bibleService.js'

export default function BibleApp() {

    const [chapter, setChapter] = useState({ num: '', txt: '' })
    const [filter, setFilter] = useState({ book: 'בראשית', chapter: 'א' })
    const [chapterNums, setChapterNums] = useState([])

    useEffect(() => {
        loadChapter(filter)
    }, [filter])

    useEffect(() => {
        getChapterNums(filter.book)
    }, [filter.book])


    const loadChapter = async (filter) => {
        const chapter = await bibleService.getChapterForDisplay(filter)
        setChapter(chapter)
    }

    const onChangeChapter = async (direction) => {
        const chapterNum = await bibleService.getChapterNum(filter, direction)
        setFilter({ ...filter, chapter: chapterNum })
    }

    const onSetFilter = ({ target }) => {
        const { name, value } = target
        setFilter({ ...filter, [name]: value })
    }

    const getChapterNums = async (book) => {
        const chapterNums = await bibleService.getChaptersNumByBook(book)
        setChapterNums(chapterNums)
    }

    return (
        <section className="bible-app main-container">
            <section className="main-wrapper flex column align-center">
                <BibleFilter chapterNums={chapterNums} currFilter={filter} onSetFilter={onSetFilter} />
                <div className="view-wrapper flex column">
                    <h1 className="title">ספר {filter.book} פרק {chapter.num}</h1>
                    <div className="main-content flex space-around flex-1">
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

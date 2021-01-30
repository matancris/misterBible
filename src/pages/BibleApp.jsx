import React, { useEffect, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import { bibleService } from '../services/bibleService.js'

export default function BibleApp() {

    const [chapter, setChapter] = useState({ num: '', txt: '' })
    const [book, setBook] = useState('בראשית')

    useEffect(() => {
        onChangeChapter()
    }, [])

    useEffect(() => {
        bibleService.setCurrBook(book)
        onChangeChapter()
    }, [book])


    const onChangeChapter = async (direction) => {
        const chapter = await bibleService.getChapter(direction)
        setChapter(chapter)
    }

    const onSetFilter = ({ target }) => {
        setBook(target.value)
    }

    return (
        <section className="bible-app main-container">
            <section className="main-wrapper flex column align-center">
                <BibleFilter onSetFilter={onSetFilter} />
                <div className="view-wrapper flex column">
                    <h1 className="title">ספר {book} פרק {chapter?.num}</h1>
                    <div className="pager flex space-around flex-1">
                        <button onClick={() => onChangeChapter(1)}>next</button>
                        <h3>{chapter?.txt}</h3>
                        <button onClick={() => onChangeChapter(-1)}>prev</button>
                    </div>
                </div>
            </section>
        </section>
    )
}

// ON-WORK Directions

// const [filter, setFilter] = useState({ book: '', chapter: '' })

// const loadChapter = async (filter) => {
//     const chapter = await bibleService.query(filter)
//     setChapter(chapter)
// }

// const onSetFilter = ({ target }) => {
//     setFilter({ chapter: 'א', book: target.value })
// }

import React, { useEffect, useRef, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import VerseList from '../cmps/VerseList.jsx'
import { bibleService } from '../services/bibleService.js'

export default function BibleApp() {

    const [chapter, setChapter] = useState({ num: '', verses: [] })
    const [book, setBook] = useState('בראשית')
    const [chapterNums, setChapterNums] = useState([])

    useEffect(() => {
        getChapterNums(book)
        loadChapter()
    }, [book])


    const loadChapter = () => {
        const chapter = bibleService.query()
        const currBook = bibleService.getCurrBook()
        setBook(currBook)
        setChapter(chapter)
    }

    const onChangeChapter = async (direction) => {
        bibleService.setCurrChapter(chapter.num, direction)
        loadChapter()
    }

    const onSetFilter = (filterBy) => {
        bibleService.setCurrDisplay(filterBy)
        loadChapter()
    }

    const getChapterNums = () => {
        const chapterNums = bibleService.getChaptersNum(book)
        setChapterNums(chapterNums)
    }

    return (
        <section className="bible-app main-container">
            <section className="main-wrapper flex column align-center">
                <BibleFilter
                    chapterNums={chapterNums}
                    currChapterNum={chapter.num}
                    onSetFilter={onSetFilter}
                />
                <div className="view-wrapper flex column">
                    <h1 className="title">ספר {book} פרק {chapter.num}</h1>
                    <div className="main-content flex space-around flex-1">
                        <button onClick={() => onChangeChapter(1)}>next</button>
                        <VerseList verses={chapter.verses}/>
                        <button onClick={() => onChangeChapter(-1)}>prev</button>
                    </div>
                </div>
            </section>
        </section>
    )
}


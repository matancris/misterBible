import React, { useEffect, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import VerseList from '../cmps/VerseList.jsx'
import { bibleService } from '../services/bibleService.js'
import { speechService } from '../services/speechService.js'

export default function BibleApp() {

    // STATE
    const [chapter, setChapter] = useState({ num: '', verses: [] })
    const [book, setBook] = useState('בראשית')
    const [chapterNums, setChapterNums] = useState([])
    const [isGimaOn, setIsGimaOn] = useState(false)


    useEffect(() => {
        speechService.start()
        speechService.voice()
        getChapterNums(book)
        loadChapter()
    }, [book])



    const loadChapter = () => {
        const chapter = bibleService.query()
        const currBook = bibleService.getCurrBook()
        setBook(currBook)
        setChapter(chapter)
    }

    const onChangeChapter = (direction) => {
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

    const onToggleGima = ({ target }) => {
        setIsGimaOn(target.checked)
    }

    return (
        <section className="bible-app main-container">
            <div className="main-wrapper flex column align-center">
                <BibleFilter chapterNums={chapterNums} currChapterNum={chapter.num} onSetFilter={onSetFilter} />
                <label htmlFor="gimaBtn">גימטריה</label>
                <input id="gimaBtn" type="checkbox" onChange={onToggleGima} value={isGimaOn} />
                <div className="view-wrapper flex column">
                    <h1 className="title">ספר {book} פרק {chapter.num}</h1>
                    <div className="main-content flex space-around flex-1">
                        <button onClick={() => onChangeChapter(1)}>next</button>
                        <VerseList verses={chapter.verses} isGimaOn={isGimaOn} />
                        <button onClick={() => onChangeChapter(-1)}>prev</button>
                    </div>
                </div>
            </div>
        </section>
    )
}


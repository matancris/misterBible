import React, { useEffect, useRef, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import NumeroModal from '../cmps/NumeroModal.jsx'
import VerseList from '../cmps/VerseList.jsx'
import { bibleService } from '../services/bibleService.js'
import { utilService } from '../services/utilService.js'

export default function BibleApp() {

    const [chapter, setChapter] = useState({ num: '', verses: [] })
    const [book, setBook] = useState('בראשית')
    const [chapterNums, setChapterNums] = useState([])
    const [numeroMap, setNumeroMap] = useState({})
    const [numero, setNumero] = useState({ num: null, posotion: {} })


    useEffect(() => {
        getChapterNums(book)
        loadChapter()
    }, [book])


    const loadChapter = () => {
        const chapter = bibleService.query()
        console.log("🚀 ~ file: BibleApp.jsx ~ line 26 ~ loadChapter ~ chapter", chapter)
        setChapter(chapter)
        // const numeroMap = bibleService.getNumeroWordsMap(chapter.txt)
        // setNumeroMap(numeroMap)
        // clearNumeroModal()
    }

    const onChangeChapter = async (direction) => {
        // const chapterNum = await bibleService.getChapterNum(filter, direction)
        // setFilter({ ...filter, chapter: chapterNum })
        bibleService.setCurrChapter(chapter.num, direction)
        loadChapter()
    }

    const onSetFilter = (filterBy) => {
        console.log("🚀 ~ file: BibleApp.jsx ~ line 41 ~ onSetFilter ~ filterBy", filterBy)
        bibleService.setCurrDisplay(filterBy)
        setBook(filterBy.book)
        loadChapter()
    }

    const getChapterNums = () => {
        const chapterNums = bibleService.getChaptersNum(book)
        setChapterNums(chapterNums)
    }

    const onWordClick = (ev) => {
        const word = utilService.getPartOfTxt()
        setNumero({ num: numeroMap[word], position: { x: ev.pageX - 5, y: ev.pageY - 50 } })
    }

    // const clearNumeroModal = () => {
    //     setNumero({ num: null, posotion: {} })
    // }

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
                        {numero.num &&
                            <NumeroModal position={numero.position} numero={numero.num} />}
                        <button onClick={() => onChangeChapter(-1)}>prev</button>
                    </div>
                </div>
            </section>
        </section>
    )
}


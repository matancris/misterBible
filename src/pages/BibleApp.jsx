import React, { useEffect, useRef, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import NumeroModal from '../cmps/NumeroModal.jsx'
import { bibleService } from '../services/bibleService.js'
import { utilService } from '../services/utilService.js'

export default function BibleApp() {
    const txtRef = useRef(null)

    const [chapter, setChapter] = useState({ num: '', txt: '' })
    const [filter, setFilter] = useState({ book: 'בראשית', chapter: 'א' })
    const [chapterNums, setChapterNums] = useState([])
    const [numeroMap, setNumeroMap] = useState({})
    const [numero, setNumero] = useState({ num: '', posotion: {} })

    useEffect(() => {
        loadChapter(filter)
    }, [filter])

    useEffect(() => {
        getChapterNums(filter.book)
    }, [filter.book])


    const loadChapter = async (filter) => {
        const chapter = await bibleService.getChapterForDisplay(filter)
        setChapter(chapter)
        const numeroMap = bibleService.getNumeroWordsMap(chapter.txt)
        setNumeroMap(numeroMap)
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

    const onWordClick = (ev) => {
        const word = utilService.getPartOfTxt()
        setNumero({ num: numeroMap[word], position: { x: ev.pageX - 5, y: ev.pageY - 50 } })
    }

    return (
        <section className="bible-app main-container">
            <section className="main-wrapper flex column align-center">
                <BibleFilter chapterNums={chapterNums} currFilter={filter} onSetFilter={onSetFilter} />
                <div className="view-wrapper flex column">
                    <h1 className="title">ספר {filter.book} פרק {chapter.num}</h1>
                    <div className="main-content flex space-around flex-1">
                        <button onClick={() => onChangeChapter(1)}>next</button>
                        <h3 ref={txtRef} onClick={onWordClick}>{chapter.txt}</h3>
                        {numero && <NumeroModal position={numero.position} numero={numero.num} />}
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

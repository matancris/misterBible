import { Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import BibleFilter from '../cmps/BibleFilter.jsx'
import VerseList from '../cmps/VerseList.jsx'
import { bibleService } from '../services/bibleService.js'


export default function BibleApp() {

    // STATE
    const [chapter, setChapter] = useState({ num: 'א', verses: [] })
    const [book, setBook] = useState('בראשית')
    const [chapterNums, setChapterNums] = useState([])
    const [isGimaOn, setIsGimaOn] = useState(false)

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
                <div className="gima-toggle align-self-end">
                    <label htmlFor="gimaBtn">גימטריה</label>
                    <Switch checked={isGimaOn} onChange={onToggleGima} color="primary" name="gimaBtn" id="gimaBtn" />
                </div>
                <div className="view-wrapper flex column">
                    <h1 className="title">ספר {book}
                        {/* this span is for chapter numerology purposes */}
                        <span
                            style={{ marginInlineStart: 5 + 'px' }}
                            title={isGimaOn ?
                                bibleService.getGima(bibleService.getChapterTXT(chapter))
                                : ''}
                        >
                            פרק {chapter.num}
                        </span>
                    </h1>
                    <div className="main-content flex space-around flex-1">
                        <button onClick={() => onChangeChapter(1)}><svg width="24" height="24"><path transform="rotate(180, 12, 12)" d="M 9.07,17.44 L 14.4,12.1 14.4,12.1 C 14.6,11.91 14.6,11.59 14.4,11.4 L 9.09,6.08 9.09,6.08 C 8.7,5.7 8.7,5.08 9.09,4.69 L 9.09,4.69 9.09,4.69 C 9.47,4.31 10.09,4.31 10.47,4.69 L 16.85,11.07 16.85,11.07 C 17.24,11.46 17.24,12.09 16.85,12.49 L 10.49,18.85 10.49,18.85 C 10.09,19.24 9.46,19.24 9.07,18.85 L 9.07,18.85 9.07,18.85 C 8.68,18.46 8.68,17.83 9.07,17.44 Z M 9.07,17.44"></path></svg></button>
                        <VerseList verses={chapter.verses} isGimaOn={isGimaOn} />
                        <button onClick={() => onChangeChapter(-1)}><svg width="24" height="24"><path transform="rotate(0, 12, 12)" d="M 9.07,17.44 L 14.4,12.1 14.4,12.1 C 14.6,11.91 14.6,11.59 14.4,11.4 L 9.09,6.08 9.09,6.08 C 8.7,5.7 8.7,5.08 9.09,4.69 L 9.09,4.69 9.09,4.69 C 9.47,4.31 10.09,4.31 10.47,4.69 L 16.85,11.07 16.85,11.07 C 17.24,11.46 17.24,12.09 16.85,12.49 L 10.49,18.85 10.49,18.85 C 10.09,19.24 9.46,19.24 9.07,18.85 L 9.07,18.85 9.07,18.85 C 8.68,18.46 8.68,17.83 9.07,17.44 Z M 9.07,17.44"></path></svg></button>
                    </div>
                </div>
            </div>
        </section>
    )
}


// ****ON-WORK**** // 

// import { speechService } from '../services/speechService.js'

// const [spoken, setSpoken] = useState('')

// const onStartSpeech = async () => {
//     try {
//         speechService.start()
//         const res = await speechService.onGetRes()
//         console.log("onStartSpeech ~ res", res)
//         setSpoken(res);
//     } catch (err) {
//         console.log(err);
//     }
// }

{/* <button className="speech-btn" onClick={onStartSpeech}>start talking</button> */ }

{/* <VerseList verses={chapter.verses} isGimaOn={isGimaOn} spoken={spoken} /> */ }
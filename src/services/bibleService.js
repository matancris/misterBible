import axios from "axios"
const BASE_URL = 'http://localhost:3000/bible'

let gCurrChapterIdx = 0
let gCurrBook = 'בראשית'


export const bibleService = {
    // query,
    getChapter,
    setCurrBook
}

async function getChapter(direction = 0) {
    try {
        const res = await axios.get(`${BASE_URL}`)
        gCurrChapterIdx += direction
        if (gCurrChapterIdx < 0) gCurrChapterIdx = 0;
        const chapter = res.data[gCurrBook].chapters[gCurrChapterIdx]
        const chapterForDisplay = {
            num: chapter.num,
            txt: _getChapterTXT(chapter)
        }
        return chapterForDisplay

    } catch {
        console.log('Error while trying to get a chpter');
    }
}

function setCurrBook(book) {
    gCurrBook = book
    gCurrChapterIdx = 0
}


// LOCAL FUNCTIONS

function _getChapterTXT(chapter) {
    const chapterTxts = chapter.verses.map(verse => verse.txt)
    return chapterTxts.join(' ')
}

function _getChapter(chapters, currChapter) {
    return chapters.find(chapter => chapter.num === currChapter)
}



//**** ON-WORK FUNCTIONS ****//


// query with default filter - not for json-server

// async function query(filter = {book: 'בראשית', chapter: 0}) {
//     const {book, chapter} = filter
//     const params = new URLSearchParams()
//     params.set('book', book)
//     params.set('chapter', chapter)

//     try {
//         const res = await axios.get(`${BASE_URL}?${params}`)
//         const chapter = res.data
//         const chapterForDisplay = {
//             num: chapter.num,
//             txt: _getChapterTXT(chapter)
//         }
//         return chapterForDisplay
//     } catch {
//         console.log('Error while trying to get a chpter');
//     }
// }



// query - gets the whole DB at once

// async function query(filter = { book: 'בראשית', chapter: 'א' }) {
//     const { book, chapter } = filter
//     try {
//         const res = await axios.get(`${BASE_URL}`)
//         const bible = res.data
//         const currChapter = _getChapter(bible[book].chapters, chapter)
//         const chapterForDisplay = {
//             num: currChapter.num,
//             txt: _getChapterTXT(currChapter)
//         }
//         return chapterForDisplay
//     } catch {
//         console.log('Error while trying to get a chapter');
//     }
// }
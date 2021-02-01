import axios from "axios"
const BASE_URL = 'http://localhost:3000/bible'

export const bibleService = {
    query,
    getChapterForDisplay,
    getChapterNum,
    getChaptersNumByBook
}

async function getChapterForDisplay(filter = { book: 'בראשית', chapter: 'א' }) {
    const { book, chapter } = filter
    const currBook = await query(book)
    const currChapter = _getChapter(currBook.chapters, chapter)
    return _getChapterForDisplay(currChapter)
}

async function query(book) {
    try {
        const res = await axios.get(`${BASE_URL}`)
        const bible = res.data
        return bible[book]
    } catch (err) {
        console.log('Error while trying to get a bible', err);
    }
}

async function getChapterNum(currFilter, direction) {
    const { book, chapter } = currFilter
    // const chapterNums = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י", "יא", "יב", "יג", "יד", "טו", "טז", "יז", "יח", "יט", "כ", "כא", "כב", "כג", "כד", "כה", "כו", "כז", "כח", "כט", "ל", "לא", "לב", "לג", "לד", "לה", "לו", "לז", "לח", "לט", "מ", "מא", "מב", "מג", "מד", "מה", "מו", "מז", "מח", "מט", "נ", "נא", "נב"];
    const chapterNums = await getChaptersNumByBook(book)
    console.log("🚀 ~ file: bibleService.js ~ line 32 ~ getChapterNum ~ chapterNums", chapterNums)
    const currIdx = chapterNums.findIndex(chapterNum => chapterNum === chapter)
    if (currIdx + direction === -1) return 'א'
    return chapterNums[currIdx + direction]
}

async function getChaptersNumByBook(book) {
    const currBook = await query(book)
    return currBook.chapters.reduce((chapterNums, chapter) => {
        chapterNums.push(chapter.num)
        return chapterNums
    }, [])
}



// LOCAL FUNCTIONS

function _getChapterTXT(chapter) {
    const chapterTxts = chapter.verses.map(verse => verse.txt)
    return chapterTxts.join(' ')
}

function _getChapter(chapters, currChapter) {
    return chapters.find(chapter => chapter.num === currChapter)
}

function _getChapterIdx(chapters, currChapter) {
    return chapters.findIndex(chapter => chapter.num === currChapter)
}

function _getChapterForDisplay(chapter) {
    const chapterForDisplay = {
        num: chapter.num,
        txt: _getChapterTXT(chapter)
    }
    return chapterForDisplay
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


// DEPRECATED


// let gCurrChapterIdx = 0
// let gCurrBook = 'בראשית'

// async function changeChapter(direction, filter) {
//     const { book, chapter } = filter
//     const currBook = await query(book)
//     const chapterIdx = _getChapterIdx(currBook.chapters, chapter)
//     const currChapter = currBook.chapters[chapterIdx + direction]
//     return _getChapterForDisplay(currChapter)
// }


// async function getChapter(direction = 0) {
//     try {
//         const res = await axios.get(`${BASE_URL}`)
//         gCurrChapterIdx += direction
//         if (gCurrChapterIdx < 0) gCurrChapterIdx = 0;
//         const chapter = res.data[gCurrBook].chapters[gCurrChapterIdx]
//         const chapterForDisplay = {
//             num: chapter.num,
//             txt: _getChapterTXT(chapter)
//         }
//         return chapterForDisplay

//     } catch {
//         console.log('Error while trying to get a chpter');
//     }
// }

// function setCurrBook(book) {
//     gCurrBook = book
//     gCurrChapterIdx = 0
// }

import axios from "axios"
import { tora } from '../data/torahTeamimDB'
console.log("🚀 ~ file: bibleService.js ~ line 3 ~ tora", tora)
const BASE_URL = 'http://localhost:3000/bible'

let gCurrChapterIdx = 0
let gCurrBook = 'בראשית'
const numeroMap = {
    "א": 1,
    "ב": 2,
    "ג": 3,
    "ד": 4,
    "ה": 5,
    "ו": 6,
    "ז": 7,
    "ח": 8,
    "ט": 9,
    "י": 10,
    "כ": 20,
    "ל": 30,
    "מ": 40,
    "נ": 50,
    "ס": 60,
    "ע": 70,
    "פ": 80,
    "צ": 90,
    "ק": 100,
    "ר": 200,
    "ש": 300,
    "ת": 400,
    "ם": 40,
    "ך": 20,
    "ן": 50,
    "ף": 80,
    "ץ": 90,
}


export const bibleService = {
    query,
    getCurrBook,
    setCurrChapter,
    setCurrDisplay,
    getChaptersNum,
    getGima

    // getNumeroWordsMap
}


function query() {
    return tora[gCurrBook].chapters[gCurrChapterIdx]
}

function getCurrBook() {
    return gCurrBook
}

function setCurrChapter(currChapter, direction = 0) {
    const chapterIdx = _getChapterIdx(tora[gCurrBook].chapters, currChapter)
    gCurrChapterIdx = chapterIdx + direction;
    if (gCurrChapterIdx < 0) gCurrChapterIdx = 0;
}

function setCurrDisplay({ book, chapter }) {
    gCurrChapterIdx = tora[gCurrBook].chapters.findIndex(currChapter => currChapter.num === chapter)
    gCurrBook = book
}

function getChaptersNum() {
   return tora[gCurrBook].chapters.reduce((chapterNums, chapter) => {
        chapterNums.push(chapter.num)
        return chapterNums
    }, [])
}

function getGima(txt) {
    const numeroTxt = txt.split('').reduce((sumAcc, char) => {
        sumAcc += numeroMap[char] || 0
        return sumAcc
    }, 0)
    return numeroTxt
}


// function getNumeroWordsMap(txt) {
//     console.log("🚀 ~ file: bibleService.js ~ line 49 ~ getNumeroWordsMap ~ txt", txt)
//     const numeroMap = txt.split(' ').reduce((numeroMapAcc, word) => {
//         numeroMapAcc[word] = _getNumerology(word)
//         return numeroMapAcc
//     }, {})
//     return numeroMap;
// }


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


// ********* DEPRECATED ********//

// function getChapterForDisplay(filterBy = { book: 'בראשית', chapter: 'א' }) {
//     const { book, chapter } = filterBy
//     const currBook = query(book)
//     const currChapter = _getChapter(currBook.chapters, chapter)
//     return _getChapterForDisplay(currChapter)
// }


// async function getChapterNum(currFilter, direction) {
//     const { book, chapter } = currFilter
//     try {
//         const chapterNums = await getChaptersNumByBook(book)
//         console.log("🚀 ~ file: bibleService.js ~ line 32 ~ getChapterNum ~ chapterNums", chapterNums)
//         const currIdx = chapterNums.findIndex(chapterNum => chapterNum === chapter)
//         if (currIdx + direction === -1) return 'א'
//         return chapterNums[currIdx + direction]
//     } catch (err) {
//         console.log('error while getting chapter num', err);
//     }
// }
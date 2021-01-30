import axios from "axios"
const BASE_URL = 'http://localhost:3000/bible'

let currChapter = 0
let gCurrBook = 'בראשית'

export const bibleService = {
    getChapter,
    setCurrBook
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})


async function getChapter(direction = 0) {
    try {
        const res = await axios.get(`${BASE_URL}`)
        console.log(res.data);
        currChapter += direction
        if (currChapter < 0) currChapter = 0;
        const chapter = res.data[gCurrBook].chapters[currChapter]
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
    currChapter = 0
}


function _getChapterTXT(chapter) {
    const chapterTxts = chapter.verses.map(verse => verse.txt)
    return chapterTxts.join(' ')
}
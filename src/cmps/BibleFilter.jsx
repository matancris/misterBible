import React from 'react'

export default function BibleFilter({ onSetFilter, chapterNums, currFilter }) {
    return (
        <form className="bible-filter flex justify-center">
            <select name="chapter" onChange={ev => onSetFilter(ev)} value={currFilter.chapter}>
                {
                    chapterNums.map(chapterNum => <option key={chapterNum}>{chapterNum}</option>)
                }
            </select>
            <select name="book" onChange={ev => onSetFilter(ev)} value={currFilter.book}>
                <option>בראשית</option>
                <option>שמות</option>
                <option>ויקרא</option>
                <option>במדבר</option>
                <option>דברים</option>
            </select>
        </form>
    )
}

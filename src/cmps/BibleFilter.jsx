import React, { useEffect, useState } from 'react'

export default function BibleFilter({ chapterNums , onSetFilter, currChapterNum}) {
    const [currFilter, setCurrFilter] = useState({ book: 'בראשית', chapter: 'א' })

    useEffect(() => {
        onSetFilter(currFilter)
    }, [currFilter])

    const onSetCurrFilter = ({ target }) => {
        const { name, value } = target
        setCurrFilter({ ...currFilter, [name]: value })
    }

    return (
        <form className="bible-filter flex justify-center">
            <select name="chapter" onChange={ev => onSetCurrFilter(ev)} value={currChapterNum}>
                {
                    chapterNums.map(chapterNum => <option key={chapterNum}>{chapterNum}</option>)
                }
            </select>
            <select name="book" onChange={ev => onSetCurrFilter(ev)} value={currFilter.book}>
                <option>בראשית</option>
                <option>שמות</option>
                <option>ויקרא</option>
                <option>במדבר</option>
                <option>דברים</option>
            </select>
        </form>
    )
}
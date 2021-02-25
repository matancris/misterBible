import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function BibleFilter({ chapterNums, onSetFilter, currChapterNum }) {

    const [currFilter, setCurrFilter] = useState({ book: 'בראשית', chapter: 'א', term: '' })

    const history = useHistory()

    useEffect(() => {
        const params = new URLSearchParams()
        params.set('book', currFilter.book)
        params.set('chapter', currFilter.chapter)
        history.push({ search: params.toString() })
        onSetFilter(currFilter)
    }, [currFilter])

    // Keep the state updated when chapter changed from outside the component
    useEffect(() => {
        onSetCurrFilter({ target: { name: 'chapter', value: currChapterNum } })
    }, [currChapterNum])


    const onSetCurrFilter = ({ target }) => {
        const { name, value } = target
        setCurrFilter({ ...currFilter, [name]: value })
    }

    return (
        <form className="bible-filter flex justify-center">
            <select name="book" onChange={ev => onSetCurrFilter(ev)} value={currFilter.book}>
                <option>בראשית</option>
                <option>שמות</option>
                <option>ויקרא</option>
                <option>במדבר</option>
                <option>דברים</option>
            </select>
            <select name="chapter" onChange={onSetCurrFilter} value={currFilter.chapter}>
                {
                    chapterNums.map(chapterNum => <option key={chapterNum}>{chapterNum}</option>)
                }
            </select>
            <input type="text" name="term"
                placeholder="חפש בפרק"
                value={currFilter.term}
                onChange={ev => onSetCurrFilter(ev)} />
        </form>
    )
}

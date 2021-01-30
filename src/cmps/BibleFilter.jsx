import React from 'react'

export default function BibleFilter({onSetFilter}) {
    return (
        <form className="bible-filter flex justify-center">
            <select name="book-name" onChange={ev => onSetFilter(ev)}>
                <option>בראשית</option>
                <option>שמות</option>
                <option>ויקרא</option>
                <option>במדבר</option>
                <option>דברים</option>
            </select>
            {/* <details>
                <summary>Details</summary>
                <ul className="clean-list">
                    <li>בראשית</li>
                    <li>שמות</li>
                    <li>ויקרא</li>
                    <li>במדבר</li>
                    <li>דברים</li>
                </ul>
            </details> */}

        </form>
    )
}

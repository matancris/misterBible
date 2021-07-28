import React from 'react'
import { bibleService } from '../services/bibleService'

export default function VerseList({ verses, isGimaOn }) {

    return (
        <section className="txt">
            {
                verses?.map((verse) => {
                    return (
                        <div key={verse.num} className="words-list flex flex-wrap">
                            {<p style={{ marginLeft: 5 + 'px' }}
                                title={isGimaOn ? bibleService.getGima(verse.txt) : ''}>
                                {verse.num}
                            </p>}
                            {React.Children.toArray(
                                verse.txt.split(' ').map(word => <span
                                    title={isGimaOn ? bibleService.getGima(word) : ''}
                                    style={{
                                        paddingLeft: 5 + 'px'
                                    }}
                                >
                                    {word}
                                </span>)
                            )}
                        </div>
                    )
                })
            }
        </section>
    )
}


// ****ON-WORK**** //

// export default function VerseList({ verses, isGimaOn, spoken }) {


// verse.txt.split(' ').map(word => <span
//     title={isGimaOn ? bibleService.getGima(word) : ''}
//     style={{
//         paddingLeft: 5 + 'px',
//         color: bibleService.getClearTxt(word) === spoken ? 'red' : ''
//     }}
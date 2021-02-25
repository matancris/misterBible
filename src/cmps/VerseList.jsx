import React from 'react'
import { bibleService } from '../services/bibleService'

export default function VerseList({ verses, isGimaOn, spoken }) {
    
    return (
        <section className="txt">
            {
                verses?.map((verse) => {
                    return (
                        <div key={verse.num} className="words-list flex flex-wrap">
                            {<p style={{ marginLeft: 5 + 'px' }}>{verse.num}</p>}
                            {React.Children.toArray(
                                verse.txt.split(' ').map(word => <span
                                    title={isGimaOn ? bibleService.getGima(word) : ''}
                                    style={{
                                        paddingLeft: 5 + 'px',
                                        color: bibleService.getClearTxt(word) === spoken ? 'red' : ''
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

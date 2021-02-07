import React from 'react'

export default function NumeroModal({numero, position}) {
    console.log("🚀 ~ file: NumeroModal.jsx ~ line 4 ~ NumeroModal ~ position", position)
    return (
        <section style={{left: position?.x + 'px', top: position?.y}} className="numero-modal">
            <h3>{numero}</h3>
        </section>
    )
}

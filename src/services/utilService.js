export const utilService = {
    getPartOfTxt
}


function getPartOfTxt() {
    const s = window.getSelection();
    const range = s.getRangeAt(0);
    const node = s.anchorNode;
    while (range.toString().indexOf(' ') !== 0) {
        range.setStart(node, (range.startOffset - 1));
    }
    range.setStart(node, range.startOffset + 1);
    do {
        range.setEnd(node, range.endOffset + 1);

    } while (range.toString().indexOf(' ') === -1 && range.toString().trim() !== '' && range.endOffset < node.length);
    return range.toString().trim();
}
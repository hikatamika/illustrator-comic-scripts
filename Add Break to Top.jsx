// ----------- Add Break to Top (Illustrator) ----------- // 
// Original InDesign Version by Sara Linsley: https://github.com/saraoswald/Manga-Scripts/
/* 
    Places a space between the first two words in a text frame. 
    Before: 
        _________________
        |               |
        |   I'm sorry   |
        |   about the   |
        |     wait.     |
        |_______________|
    After:
        _________________
        |      I'm      |
        |     sorry     |
        |   about the   |
        |     wait.     |
        |_______________|
*/

function main() {
    if (app.documents.length === 0) {
        alert("No document open.");
        return;
    }

    var selections = app.selection;

    if (!selections || selections.length === 0) {
        alert("Please select some text frames and try again.");
        return;
    }

    for (var i = 0; i < selections.length; i++) {
        var item = selections[i];

        if (item.typename !== "TextFrame") {
            alert("Please select only text frames.");
            return;
        }

        item.contents = addBreakTop(item.contents);
    }
}

// replaces the first space with a line break
function addBreakTop(str) {
    str = trim(str);

    if (!str) return str;

    var firstSpace = str.indexOf(" ");

    if (firstSpace !== -1) {
        return str.substring(0, firstSpace) +
                // Don't ask why Illustrator uses the End-of-text symbol \u0003 as a new-line linefeed. I couldn't tell ya.
                // but both \r and \n get interpreted by it as Paragraph breaks
               "\u0003" +
               str.substring(firstSpace + 1);
    }

    return str;
}

// Trim helper
function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

main();
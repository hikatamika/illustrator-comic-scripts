// ----------- Add Break to Second to Top (Illustrator) ----------- //
// Original InDesign Version by Sara Linsley: https://github.com/saraoswald/Manga-Scripts/

/* 
    Places a break after the second word in a text frame. 
    Before: 
         _________________
        |                 |
        | I'm sorry about |
        |    the wait.    |
        |                 |
        |_________________|
    After:
        _________________
        |               |
        |   I'm sorry   |
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

        item.contents = addBreakSecondToTop(item.contents);
    }
}

// keep first two words together, break after them
function addBreakSecondToTop(str) {
    str = trim(str);

    if (!str) return str;

    var words = str.split(" ");

    if (words.length > 2) {
        return words.slice(0, 2).join(" ") +
                // Don't ask why Illustrator uses the End-of-text symbol \u0003 as a new-line linefeed. I couldn't tell ya.
                // but both \r and \n get interpreted by it as Paragraph breaks
               "\u0003" +
               words.slice(2).join(" ");
    }

    return str;
}

// Trim helper
function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

main();
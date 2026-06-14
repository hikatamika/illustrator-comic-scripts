// ----------- Add Break to Second to Bottom (Illustrator) ----------- //
// Original InDesign Version by Sara Linsley: https://github.com/saraoswald/Manga-Scripts/

// ----------- Add Break to Second to Bottom ----------- // 
/* 
    Places a break before the second-to-last word in a frame.
    Before: 
        _________________
        |               |
        |   I'm sorry   |
        |about the wait.|
        |               |
        |_______________|
    After:
        _________________
        |               |
        |   I'm sorry   |
        |     about     |
        |   the wait.   |
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

        item.contents = addBreakSecondToBottom(item.contents);
    }
}

// split text so second-to-last word becomes its own line
function addBreakSecondToBottom(str) {
    str = trim(str);

    if (!str) return str;

    var words = str.split(" ");

    // Need at least 3 words to isolate second-to-last word
    if (words.length > 2) {
        return words.slice(0, words.length - 2).join(" ") +
                // Don't ask why Illustrator uses the End-of-text symbol \u0003 as a new-line linefeed. I couldn't tell ya.
                // but both \r and \n get interpreted by it as Paragraph breaks
               "\u0003" +
               words[words.length - 2] +
               " " +
               words[words.length - 1];
    }

    return str;
}

// Trim helper
function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

main();
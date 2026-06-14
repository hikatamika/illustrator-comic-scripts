// ----------- Add Break to Bottom (Illustrator) ----------- //
// Original InDesign Version by Sara Linsley: https://github.com/saraoswald/Manga-Scripts/

// ----------- Add Break to Bottom ----------- // 
/* 
    Places a space between the last two words in a text frame. 
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
        |   about the   |
        |     wait.     |
        |_______________|



    Breaks on a hyphen if there are no spaces in the text frame
    Before: 
        _________________
        |               |
        |   Asako-san!  |
        |               |
        |_______________|

    After: 
        _________________
        |               |
        |     Asako-    |
        |      san!     |
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

        item.contents = addBreakEnd(item.contents);
    }
}

// split last word onto a new line
function addBreakEnd(str) {
    str = trim(str);

    if (!str) return str;

    var words = str.split(" ");

    // If there is more than one word → break at last space
    if (words.length > 1) {
        return words.slice(0, words.length - 1).join(" ") +
                // Don't ask why Illustrator uses the End-of-text symbol \u0003 as a new-line linefeed. I couldn't tell ya.
                // but both \r and \n get interpreted by it as Paragraph breaks
               "\u0003" +
               words[words.length - 1];
    }

    // If no spaces, try hyphen fallback
    if (str.indexOf("-") !== -1) {
        var parts = str.split("-");
        if (parts.length === 2) {
            return parts[0] + "-" + "\u0003" + parts[1];
        }
    }

    return str;
}

// Trim helper
function trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

main();
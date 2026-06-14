// ----------- Remove Soft Line Breaks ----------- //

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

        item.contents = removeLineBreaks(item.contents);
    }
}

// Replace all Illustrator line breaks with spaces
function removeLineBreaks(str) {
    if (!str) return str;

    return str
        .replace(/\u0003/g, " ")
        .replace(/ {2,}/g, " ");
}

main();
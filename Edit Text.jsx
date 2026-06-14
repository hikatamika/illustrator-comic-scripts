// ----------- Edit Text Without Clicking ----------- //
// Single newline in editor  -> Illustrator soft return (\u0003)
// Double newline in editor  -> Illustrator paragraph return (\r)
// Ctrl/Cmd + Enter          -> OK

function editTextBox() {

    if (
        app.documents.length === 0 ||
        app.activeDocument.selection.length !== 1 ||
        app.activeDocument.selection[0].typename !== "TextFrame"
    ) {
        alert("Please select a single text frame.");
        return;
    }

    var tf = app.activeDocument.selection[0];

    // Convert Illustrator text to editor text:
    // \u0003 (soft return) -> single newline
    // \r (paragraph return) -> double newline
    var displayText = tf.contents
        .replace(/\r/g, "\n\n")
        .replace(/\u0003/g, "\n");

    var dlg = new Window("dialog", "Edit Text");
    dlg.orientation = "column";
    dlg.alignChildren = ["fill", "fill"];

    var txt = dlg.add(
        "edittext",
        undefined,
        displayText,
        {
            multiline: true,
            scrolling: true
        }
    );

    txt.preferredSize = [300, 200];
    txt.active = true;

    // Ctrl/Cmd + Enter = OK
    function submitIfShortcut(k) {

        var isEnter =
            k.keyName === "Enter" ||
            k.keyName === "Return";

        if (isEnter && (k.ctrlKey || k.metaKey)) {
            dlg.close(1);
        }
    }

    txt.addEventListener("keydown", submitIfShortcut);
    dlg.addEventListener("keydown", submitIfShortcut);

    var btns = dlg.add("group");
    btns.alignment = "right";

    btns.add("button", undefined, "OK");
    btns.add("button", undefined, "Cancel");

    if (dlg.show() === 1) {

        var result = txt.text;

        // Normalize line endings
        result = result
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n");

        // Double newlines -> paragraph returns
        // Passes doubles to a holder-dummy first.
        // Single newlines -> soft returns
        result = result
            .replace(/\n\n/g, "\uFFFF")
            .replace(/\n/g, "\u0003")
            .replace(/\uFFFF/g, "\r");

        tf.contents = result;
    }
}

editTextBox();
// ----------- Edge to Edge Distribute Horizontal ----------- //
// Distribute selected items edge-to-edge horizontally.

/* Great for using with DivideTextFrame because it stacks the resulting frames 
Making the text hard to see. */
// https://github.com/johnwun/js4ai/blob/master/divideTextFrame.js

if (app.documents.length > 0) {
    var doc = app.activeDocument;

    if (doc.selection.length < 2) {
        alert("Select at least two objects.");
    } else {

        var items = [];

        // Copy selection
        for (var i = 0; i < doc.selection.length; i++) {
            items.push(doc.selection[i]);
        }

        // Sort left → right (by left edge)
        items.sort(function (a, b) {
            return a.geometricBounds[0] - b.geometricBounds[0];
        });

        // Start from first object's left position
        var currentLeft = items[0].geometricBounds[0];

        for (var j = 0; j < items.length; j++) {

            var item = items[j];
            var bounds = item.geometricBounds;

            var width = bounds[2] - bounds[0]; // right - left

            // Move item so its left aligns to currentLeft
            var deltaX = currentLeft - bounds[0];

            item.translate(deltaX, 0);

            // Update currentLeft to right edge of moved item
            bounds = item.geometricBounds;
            currentLeft = bounds[2];
        }

    }
} else {
    alert("No document open.");
}
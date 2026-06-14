// ----------- Edge to Edge Distribute Vertical ----------- //
// Distribute selected items edge-to-edge vertically.

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

        // Sort by vertical position (top to bottom)
        items.sort(function (a, b) {
            return b.geometricBounds[1] - a.geometricBounds[1];
        });

        // Start from first object
        var currentTop = items[0].geometricBounds[1];

        for (var j = 0; j < items.length; j++) {

            var item = items[j];
            var bounds = item.geometricBounds;

            var height = bounds[1] - bounds[3]; // top - bottom

            // Move item so its top aligns with currentTop
            var deltaY = currentTop - bounds[1];

            item.translate(0, deltaY);

            // Update currentTop to bottom of moved item
            bounds = item.geometricBounds;
            currentTop = bounds[3];
        }

    }
} else {
    alert("No document open.");
}
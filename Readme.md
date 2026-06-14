# Readme
ExtendScript utilities for easier comic typesetting in Adobe Illustrator.

## Descriptions

### Text Editing
#### Edit Text

A basic script that, when called while a text object is selected, brings up a dialog box that allows you to edit the text of the selected text object.

The sole reason this exists, is because I do not want to double-click a text object to edit its contents.

You can press Control/Cmd+Enter when you're done to submit the text and dismiss the dialog box.

- [Edit Text](/Edit%20Text.jsx)

### Text Splitting
#### Edge to Edge

These scripts are made to distribute the output of [divideTextFrame](https://github.com/johnwun/js4ai/blob/master/divideTextFrame.js).

divideTextFrame is handy in that it will split a block of text in a type object into multiple type objects per paragraph break. But, I find it stacks the resulting items closely overlapping each other, making it difficult to tell which text object is which.

These scripts allow you to select the output from divideTextFrame, and distribute the items within, edge-to-edge.

- [Edge to Edge Horizontal](/Edge%20to%20Edge%20Horizontal.jsx)
- [Edge to Edge Vertical](/Edge%20to%20Edge%20Vertical.jsx)

### Text Balancing
#### Add Break to

These four text balancing scripts are all Illustrator ports of [Sara Linsley's "Add Break to" _InDesign_ text balancing scripts](https://github.com/saraoswald/Manga-Scripts#add-break-to).

They make it easy to make diamond-shaped comic dialogue for word balloons, and, control line widows/orphans.

- [Add Break to Top](/Add%20Break%20to%20Top.jsx)
- [Add Break to Second to Top](/Add%20Break%20to%20Second%20to%20Top.jsx)
- [Add Break to Second to Bottom](/Add%20Break%20to%20Second%20to%20Bottom.jsx)
- [Add Break to Bottom](/Add%20Break%20to%20Bottom.jsx)
```markdown
# auto-jsx README

Welcome to "auto-jsx", a Visual Studio Code extension that simplifies the process of working with JSX by automatically converting HTML attributes to their JSX counterparts. This extension is particularly useful for developers who frequently switch between HTML and JSX or are transitioning projects to React.

## Features

`auto-jsx` offers a seamless experience for developers by providing the following features:

- **Automatic Conversion**: Automatically converts HTML attributes to JSX attributes upon pasting HTML code into a JSX file.
- **Comprehensive Attribute Mapping**: Includes a wide range of HTML attributes, event handlers, and SVG-specific attributes, ensuring that your code is JSX-compliant.
- **Case-Insensitive Conversion**: Handles HTML attributes correctly regardless of their case, providing a hassle-free conversion process.
- **SVG Support**: Provides extensive support for SVG-specific attributes, making it easier to work with complex SVG elements in JSX.

To see `auto-jsx` in action, imagine pasting the following HTML snippet into your JSX file:

```html
<div class="container" tabindex="1">
  <label for="name">Name:</label>
  <input type="text" id="name" class="input-field" autofocus>
</div>
```

After pasting, `auto-jsx` automatically converts it to:

```jsx
<div className="container" tabIndex="1">
  <label htmlFor="name">Name:</label>
  <input type="text" id="name" className="input-field" autoFocus />
</div>
```

> Tip: Use short, focused animations to demonstrate how `auto-jsx` transforms HTML to JSX in real-time, including the conversion of SVG attributes.

## Requirements

There are no specific requirements for `auto-jsx` other than having Visual Studio Code installed. The extension handles the conversion internally without the need for external dependencies.

## Extension Settings

`auto-jsx` works out of the box and does not require any additional settings. However, future versions may include configurable options to tailor the extension to your workflow.

## Known Issues

Currently, there are no known issues. If you encounter any problems or have suggestions for improvements, please open an issue on the GitHub repository for this extension.

## Release Notes

### 0.0.1

Initial release of `auto-jsx`:
- Basic HTML to JSX attribute conversion.
- Expanded attribute map to cover more HTML attributes and event handlers.
- Added comprehensive support for SVG-specific attributes.

---

**Enjoy coding with `auto-jsx`!**
```
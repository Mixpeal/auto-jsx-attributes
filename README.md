# auto-jsx-attributes

Welcome to "auto-jsx-attributes", a Visual Studio Code extension that simplifies the process of working with JSX by automatically converting HTML attributes to their JSX counterparts. This extension is particularly useful for developers who frequently switch between HTML and JSX or are transitioning projects to React.

## Preview
![](/images/recording.gif)


## Features

`auto-jsx-attributes` offers a seamless experience for developers by providing the following features:

- **Automatic Conversion**: Automatically converts HTML attributes to JSX attributes upon pasting HTML code into a JSX file.
- **Comprehensive Attribute Mapping**: Includes a wide range of HTML attributes, event handlers, and SVG-specific attributes, ensuring that your code is JSX-compliant.
- **Case-Insensitive Conversion**: Handles HTML attributes correctly regardless of their case, providing a hassle-free conversion process.
- **SVG Support**: Provides extensive support for SVG-specific attributes, making it easier to work with complex SVG elements in JSX.

To see `auto-jsx-attributes` in action, imagine pasting the following HTML snippet into your JSX file:


```html
<div class="container" tabindex="1">
  <label for="name">Name:</label>
  <input type="text" id="name" class="input-field" autofocus>
</div>
```

After pasting, `auto-jsx-attributes` automatically converts it to:

```jsx
<div className="container" tabIndex="1">
  <label htmlFor="name">Name:</label>
  <input type="text" id="name" className="input-field" autoFocus />
</div>
```

> Tip: Use short, focused animations to demonstrate how `auto-jsx-attributes` transforms HTML to JSX in real-time, including the conversion of SVG attributes.

## Requirements

There are no specific requirements for `auto-jsx-attributes` other than having Visual Studio Code installed. The extension handles the conversion internally without the need for external dependencies.

## Extension Settings

`auto-jsx-attributes` works out of the box and does not require any additional settings to start converting HTML to JSX automatically. However, the extension includes configurable options to tailor the experience to your workflow:

- **Auto Fix on Paste**: By default, the extension will automatically convert HTML to JSX when you paste code into a JSX file. This behavior can be toggled in the settings.
- **Convert Scope**: You can specify whether the conversion should apply to all files or only `.jsx` and `.tsx` files.

To adjust these settings, navigate to the Visual Studio Code settings and look for "HTML to JSX Converter".

Additionally, you can manually convert HTML to JSX by selecting the HTML code, right-clicking to open the context menu, and choosing "Convert attributes to JSX". This command is also available through the Command Palette.

## Known Issues

In some cases, you may need to initiate the conversion process manually using the context menu option "Convert attributes to JSX" before the automatic fix-on-paste feature becomes operational.


## Release Notes

### 0.0.1

Initial release of `auto-jsx-attributes`:
- Basic HTML to JSX attribute conversion.
- Expanded attribute map to cover more HTML attributes and event handlers.
- Added comprehensive support for SVG-specific attributes.

---

**Enjoy coding with `auto-jsx-attributes`!**
```
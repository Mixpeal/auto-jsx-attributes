import * as vscode from "vscode";

let isConverting = false;

const attributeMap: { [key: string]: string } = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  cellspacing: "cellSpacing",
  rowspan: "rowSpan",
  colspan: "colSpan",
  usemap: "useMap",
  frameborder: "frameBorder",
  contenteditable: "contentEditable",
  accesskey: "accessKey",
  autocomplete: "autoComplete",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  enctype: "encType",
  formaction: "formAction",
  formenctype: "formEncType",
  formmethod: "formMethod",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  hreflang: "hrefLang",
  novalidate: "noValidate",
  radiogroup: "radioGroup",
  spellcheck: "spellCheck",
  srcdoc: "srcDoc",
  srclang: "srcLang",
  srcset: "srcSet",
  viewbox: "viewBox",

  // SVG-specific attributes
  "clip-path": "clipPath",
  "clip-rule": "clipRule",
  "fill-opacity": "fillOpacity",
  "fill-rule": "fillRule",
  "stroke-dasharray": "strokeDasharray",
  "stroke-dashoffset": "strokeDashoffset",
  "stroke-opacity": "strokeOpacity",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-miterlimit": "strokeMiterlimit",
  "color-interpolation": "colorInterpolation",
  "color-interpolation-filters": "colorInterpolationFilters",
  "color-profile": "colorProfile",
  "color-rendering": "colorRendering",
  "flood-color": "floodColor",
  "flood-opacity": "floodOpacity",
  "font-family": "fontFamily",
  "font-size": "fontSize",
  "font-size-adjust": "fontSizeAdjust",
  "font-stretch": "fontStretch",
  "font-style": "fontStyle",
  "font-variant": "fontVariant",
  "font-weight": "fontWeight",
  "image-rendering": "imageRendering",
  "letter-spacing": "letterSpacing",
  "lighting-color": "lightingColor",
  "marker-end": "markerEnd",
  "marker-mid": "markerMid",
  "marker-start": "markerStart",
  "pointer-events": "pointerEvents",
  "shape-rendering": "shapeRendering",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
  "text-anchor": "textAnchor",
  "text-decoration": "textDecoration",
  "text-rendering": "textRendering",
  "unicode-bidi": "unicodeBidi",
  "word-spacing": "wordSpacing",
  "writing-mode": "writingMode",
  patternTransform: "patternTransform",
  gradientTransform: "gradientTransform",
  "xlink:href": "xlinkHref",
  "xlink:title": "xlinkTitle",
  "xlink:role": "xlinkRole",
  "xlink:arcrole": "xlinkArcrole",
  "xlink:type": "xlinkType",
  "xlink:show": "xlinkShow",
  "xlink:actuate": "xlinkActuate",
  // Event handlers
  onclick: "onClick",
  onsubmit: "onSubmit",
  onkeydown: "onKeyDown",
  onkeypress: "onKeyPress",
  onkeyup: "onKeyUp",
  onchange: "onChange",
  onmouseover: "onMouseOver",
  onmouseout: "onMouseOut",
  onmousedown: "onMouseDown",
  onmouseup: "onMouseUp",
  onmousemove: "onMouseMove",
  onfocus: "onFocus",
  onblur: "onBlur",
  oninput: "onInput",
  onload: "onLoad",
  onerror: "onError",
  onresize: "onResize",
  onscroll: "onScroll",
  onselect: "onSelect",
  ondrag: "onDrag",
  ondrop: "onDrop",
  ondragover: "onDragOver",
  ondragenter: "onDragEnter",
  ondragleave: "onDragLeave",
  ondragstart: "onDragStart",
  ondragend: "onDragEnd",

  // Accessibility attributes
  "aria-hidden": "ariaHidden",
  "aria-label": "ariaLabel",
  "aria-labelledby": "ariaLabelledBy",
  "aria-describedby": "ariaDescribedBy",
  "aria-controls": "ariaControls",
  "aria-expanded": "ariaExpanded",
  "aria-haspopup": "ariaHasPopup",
  "aria-live": "ariaLive",
  "aria-relevant": "ariaRelevant",
  "aria-atomic": "ariaAtomic",
  "aria-busy": "ariaBusy",
  "aria-current": "ariaCurrent",
  "aria-disabled": "ariaDisabled",
  "aria-dropeffect": "ariaDropEffect",
  "aria-flowto": "ariaFlowTo",
  "aria-grabbed": "ariaGrabbed",
  "aria-invalid": "ariaInvalid",
  "aria-owns": "ariaOwns",
  "aria-posinset": "ariaPosInSet",
  "aria-pressed": "ariaPressed",
  "aria-roledescription": "ariaRoleDescription",
  "aria-setsize": "ariaSetSize",

  crossorigin: "crossOrigin",
  keytype: "keyType",
};

export function activate(context: vscode.ExtensionContext) {
  let disposablePaste = vscode.commands.registerCommand(
    "editor.action.clipboardPasteAction",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || isConverting) {
        return; 
      }

      const config = vscode.workspace.getConfiguration();
      const autoFixOnPaste = config.get<boolean>(
        "htmlToJsxConverter.autoFixOnPaste",
        true
      );
      const convertScope = config.get<string>(
        "htmlToJsxConverter.convertScope",
        "jsxAndTsx"
      );

      const isJsxOrTsxFile =
        editor.document.fileName.endsWith(".jsx") ||
        editor.document.fileName.endsWith(".tsx");
      const shouldConvert =
        convertScope === "allFiles" ||
        (convertScope === "jsxAndTsx" && isJsxOrTsxFile);

      const clipboardContent = await vscode.env.clipboard.readText();

      if (
        autoFixOnPaste &&
        shouldConvert &&
        shouldConvertToJsx(clipboardContent)
      ) {
        isConverting = true;
        const convertedContent = convertHtmlToJsx(clipboardContent);
        editor
          .edit((editBuilder) => {
            editBuilder.replace(editor.selection, convertedContent);
          })
          .then(() => {
            isConverting = false; 
          });
      } else {
        disposablePaste.dispose();

        await vscode.commands.executeCommand(
          "editor.action.clipboardPasteAction"
        );

        disposablePaste = vscode.commands.registerCommand(
          "editor.action.clipboardPasteAction",
          async () => {
          }
        );
        context.subscriptions.push(disposablePaste);
      }
    }
  );

  context.subscriptions.push(disposablePaste);

  let disposableConvert = vscode.commands.registerCommand(
    "extension.convertToJsx",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || isConverting) {
        vscode.window.showInformationMessage(
          "No editor is active or conversion is in progress"
        );
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);

      if (shouldConvertToJsx(selectedText)) {
        isConverting = true;
        const convertedContent = convertHtmlToJsx(selectedText);
        editor
          .edit(
            (editBuilder) => {
              editBuilder.replace(selection, convertedContent);
            },
            { undoStopBefore: true, undoStopAfter: true }
          )
          .then(() => {
            isConverting = false; 
          });
      } else {
        vscode.window.showInformationMessage(
          "The selected text does not appear to be HTML"
        );
      }
    }
  );

  context.subscriptions.push(disposableConvert);
}

export function deactivate() {}

function shouldConvertToJsx(text: string): boolean {
  return Object.keys(attributeMap).some((attr) => text.includes(attr));
}

function convertHtmlToJsx(htmlContent: string): string {
  let jsxContent = htmlContent;
  for (const [htmlAttr, jsxAttr] of Object.entries(attributeMap)) {
    const regex = new RegExp(`\\b${htmlAttr}\\b`, "gi");
    jsxContent = jsxContent.replace(regex, jsxAttr);
  }

  return jsxContent;
}

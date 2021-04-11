# Video Playback Speed Changer

This is a simple firefox extension that I did. This extension changes the video playback speed, it speeds up or speeds down the current video playing. It works on all html5 players. The main javascript command that it injects and executes is the following:

```javascript
    document.querySelector('video').playbackRate = Number(msg.newSpeed)
```

The main motivations behind this project was:

- 1o. Learn how to develop an Firefox browser extension
- 2o. Create this extension in the most basic way possible. There are already some other extensions out there with the same purpose, but their code is really big and I could not understand before developing this myself.

## File structure

- [manifest.json](./manifest.json): This file tells the extension metadata to the browser. It contains the requested browser permissions, the extension name, icons, description and so on.
- [icons](./icons): Folder with the extension icons files
- [popup](./popup): Folder containing the popup document files.
  - [index.html](./popup/index.html): The popup acts like a normal webpage, so here is the html with the content.
  - [index.css](./popup/index.css): Popup stylesheet.
  - [index.js](./popup/index.js): Popup javascript, here we inject the content_script into the currently tab open in the browser and set a communication with it.
- [content_scripts](./content_scripts): Folder containing the injected scripts
  - [playbackspeed.js](./content_scripts/playbackspeed.js): This is the actual script that runs on the browser page containing the video whose speed we will change. This script receives messages from the popup with the new desired playback speed.

![Frank UI](https://raw.githubusercontent.com/jjcosgrove/frank/master/app/assets/images/frank_ui.jpg)

# Shortcuts

Everything in Frank is driven by shortcuts. That really is all you need to know*

Global shortcut | Action
:------- | :-----
*Cmd+N* | Add note
*Cmd+D* | Delete note
*Cmd+F* | Search notes (RegEx-based)
*Cmd+E* | Export notes (JSON)
*Cmd-P* | Toggle preview (see editor shortcut)

<br>

Editor shortcut | Action
:------- | :-----
*Cmd-'* | toggleBlockquote
*Cmd-B* | toggleBold
*Cmd-H* | toggleHeadingSmaller
*Cmd-I* | toggleItalic
*Cmd-K* | drawLink
*Cmd-L* | toggleUnorderedList
*Cmd-P* | togglePreview
*Cmd-Alt-C* | toggleCodeBlock
*Cmd-Alt-I* | drawImage
*Cmd-Alt-L* | toggleOrderedList
*Shift-Cmd-H* | toggleHeadingBigger

<br>

\*I did say it was frank...

# Build requirements

* [Node/NPM](https://nodejs.org/en/download/current/)
* [Electron](https://electron.atom.io/)

# Installing build tools

## Node/NPM

You can install the binaries from the link above. This will install Node/NPM (the package manager for Node) and is available for most common platforms and CPU architectures.

## Electron

```
npm install -g electron
```

I.e. install Electron globally, for easier usage. If you want more information and/or control over which variation of Electron gets installed, see: [https://www.npmjs.com/package/electron](https://www.npmjs.com/package/electron)

# Build instructions (from source)

Assuming you have created a local folder called 'frank' and have entered into it from a shell/command line:

## 1. Clone

```
git clone https://github.com/jjcosgrove/frank.git .
```

## 2. Install

```
npm install
```

## 3. Run

```
npm start
```

# Build instructions (binary)

Should you wish to build your own binary, check out the package.json for the 'package' script as a starting point:

```
electron-packager . --icon=app/assets/icons/mac/icon.icns --electron-version=1.6.1 --platform=darwin --arch=x64 --out=builds --overwrite
```

This can either be executed directly in the 'frank' folder where the project resides, or it can be initiated using:
```
npm run package
```

**NOTE**: The default 'package' script is set to build against Darwin (OSX) and 64 bit CPU architecture. Customise as per your own requirements.

# Contribute

Bugs or feature requests/contributions can be done via:
[https://github.com/jjcosgrove/frank/issues](https://github.com/jjcosgrove/frank/issues)

# Authors

* Just me for now

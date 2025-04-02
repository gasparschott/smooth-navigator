# smooth-navigator

![GitHub manifest version](https://img.shields.io/github/manifest-json/v/gasparschott/smooth-navigator)
  ![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/gasparschott/smooth-navigator/total)  

This is a simple plugin that provides a suite of commands for cycling through open tabs/leaves/files and tab groups/splits. Its aim is to reduce friction by providing the means to bind keyboard shortcuts to common navigation actions.  

Note that this plugin is about navigating through already open leaves; it is *not* about searching for and opening files. It assumes that all the files you want to work with are already open in your workspace.

Why not use the Quick Switcher or similar solutions to accomplish this? Searching is too slow. Dropdown lists are too slow. Both methods require mental effort to scan through a modal list to find the file one is looking for or to remember the name of the file and type it in. In my opinion, if a file is already open in the workspace, it’s much easier and quicker to repeat the same keystroke to cycle forward or backward through the open tabs or splits to find and focus it.

The plugin repeats some command functions already available in Obsidian, but they are included not only for completeness’ sake, but because in some cases the plugin adds convenience features not available in the native commands. For example, the “previous” and “next” commands cycle from the last item to the first and vice versa, so you don't have to switch shortcuts, and can jump from one “end” of the tab group to the other.

AVAILABLE COMMANDS

- Go to next tab group (workspace root only)
- Go to previous tab group (workspace root only)
- Go to next tab group (workspace root + sidebars)
- Go to previous tab group (workspace root + sidebars)
- Go to next leaf in active tab group
- Go to previous leaf in active tab group
- Go to first leaf in workspace root
- Go to last leaf in workspace root
- Go to first leaf in active tab group
- Go to last leaf in active tab group
- Go to most recent leaf
- Go to file explorer

### Troubleshooting
• Not compatible with Outliner.MD plugin in its current form (0.1.5) as it seems to highjack tab focus when an outliner file is open. This prevents changing the focus of tabs or tab splits via the keyboard commands.

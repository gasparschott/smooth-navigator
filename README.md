# obsidian-smooth-navigator

This is a simple plugin that provides a suite of commands for cycling through open tabs/leaves/files and tab groups/splits. Its aim is to reduce friction by providing the means to bind keyboard shortcuts to common navigation actions.  

Note that this plugin is about navigating through already open leaves; it is *not* about searching for and opening files. It assumes that all the files you want to work with are already open in your workspace.

Why not use the Quick Switcher or similar solutions to accomplish this? Searching is too slow. Dropdown lists are too slow. Both methods require mental effort to scan through a modal list to find the file one is looking for or to remember the name of the file and type it in. In my opinion, if a file is already open in the workspace, it’s much easier and quicker to repeat the same keystroke to cycle forward or backward through the open tabs or splits to find and focus it.

The plugin repeats some command functions already available in Obsidian, but they are included not only for completeness’ sake, but because in some cases the plugin adds convenience features not available in the native commands. For example, the “previous” and “next” commands cycle from the last item to the first and vice versa, so you don't have to switch shortcuts, and can jump from one “end” of the tab group to the other.

AVAILABLE COMMANDS

- Navigate forward through root tab groups only  
- Navigate backward through root tab groups only  
- Navigate forward through root tab groups and sidebars  
- Navigate backward through root tab groups and sidebars  
- Navigate forward through files in active tab group  
- Navigate backward through files in active tab group  
- Go to first file in workspace root   
- Go to last file in workspace root   
- Go to first file in active tab group  
- Go to last file in active tab group  
- Go to most recent leaf
- Focus file explorer  

### Troubleshooting
• Not compatible with Outliner.MD plugin in its current form (0.1.5) as it seems to highjack tab focus when an outliner file is open. This prevents changing the focus of tabs or tab splits via the keyboard commands.

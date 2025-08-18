'use strict';

let obsidian = require('obsidian');

class SmoothNavigator extends obsidian.Plugin {
    async onload() {
		// console.log('Loading the Smooth Navigator plugin.');
		// await this.loadSettings();
		const workspace = this.app.workspace;
		const getAllTabGroups = (action) => {
			let tab_groups = [];
			this.app.workspace.iterateAllLeaves(
				leaf => {
					switch(true) {
						case leaf.parent.type !== 'tabs':																		return;
						case !/root/i.test(action):																						// get all tab groups
						case (/root/i.test(action)) && leaf.getRoot() === workspace.rootSplit:											// get root tab groups only
							tab_groups.push(leaf.parent);																		break;
					} 
				}
			)
			tab_groups = !/backward/i.test(action) ? tab_groups.reverse() : tab_groups;
			return [...new Set(tab_groups)];
		}
		const getAllLeaves = (tab_groups) => {
			let all_tabs = [];
			tab_groups.forEach(tab_group => { all_tabs.push(...tab_group.children); });
			return all_tabs;
		}
		const getActiveTabGroup = () =>			{ return workspace.activeTabGroup; }
		const getActiveLeaf = (tab_group) =>	{ return tab_group.children?.find( child => child.tabHeaderEl.className.includes('active')) ?? getActiveTabGroup().children?.[0]; }
		const getNextTabGroup = (action) => {
			let all_tab_groups = getAllTabGroups(action);
			let active_tab_group = workspace.activeTabGroup, active_tab_group_index = all_tab_groups?.indexOf(active_tab_group), next_tab_group;
			next_tab_group = all_tab_groups[active_tab_group_index + 1] || all_tab_groups[0];
			return next_tab_group;
		}
		const getNextLeaf = (tab_group,direction) => {
			let all_tab_group_leaves = ( direction === 'backward' ? tab_group.children.toReversed() : tab_group.children );
			let active_leaf = getActiveLeaf(tab_group), active_leaf_index = all_tab_group_leaves.indexOf(active_leaf), next_leaf;
			next_leaf = all_tab_group_leaves[active_leaf_index + 1] || all_tab_group_leaves[0];
			return next_leaf;
		}
		// FOCUS TABS
		const goTo = (action) => {
			let tab_groups = getAllTabGroups(action), active_tab_group = getActiveTabGroup(), target_leaf;
			switch(true) {
				case action === 'cycleSplitsBackward' || action === 'cycleSplitsForward':			target_leaf = getActiveLeaf(getNextTabGroup(action));							break;
				case action === 'cycleSplitsBackwardPlus' || action === 'cycleSplitsForwardPlus':	target_leaf = getActiveLeaf(getNextTabGroup(action));							break;
				case action === 'goToPreviousLeaf':													target_leaf = getNextLeaf(active_tab_group,'backward');							break;
				case action === 'goToNextLeaf':														target_leaf = getNextLeaf(active_tab_group,'forward');							break;
				case action === 'goToFirstTabGroupLeaf':											target_leaf = active_tab_group.children[0];										break;
				case action === 'goToLastTabGroupLeaf':												target_leaf = active_tab_group.children[active_tab_group.children.length - 1];	break;
				case action === 'goToFirstRootLeaf':												target_leaf = getAllLeaves(tab_groups)[0];										break;
				case action === 'goToLastRootLeaf':													target_leaf = getAllLeaves(tab_groups)[getAllLeaves(tab_groups).length - 1];	break;
				case action === 'goToMostRecentLeaf':												target_leaf = workspace.getMostRecentLeaf();									break;
				// case action === 'goToFileExplorer':													this.app.commands.executeCommandById('file-explorer:reveal-active-file');		return;
			}
			workspace.setActiveLeaf(target_leaf,{focus:true});
			if ( workspace.app.plugins.enabledPlugins.values().find( (value) => value === 'continuous-mode') ) {
				target_leaf.tabHeaderEl?.click();														// triggers "scrollintoview" behavior if Continuous-Mode plugin is installed and enabled.
			}
		};
		//// COMMANDS
		this.addCommand({
			id: 'smooth-nav-go-to-next-workspace-tab-group',
			name: 'Go to next tab group (workspace root only)',
			callback: () => { goTo('cycleSplitsForward') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-previous-workspace-tab-group',
			name: 'Go to previous tab group (workspace root only)',
			callback: () => { goTo('cycleSplitsBackward') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-next-tab-group-plus',
			name: 'Go to next tab group (workspace root + sidebars)',
			callback: () => { goTo('cycleSplitsForwardPlus') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-previous-tab-group-plus',
			name: 'Go to previous tab group (workspace root + sidebars)',
			callback: () => { goTo('cycleSplitsBackwardPlus') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-next-leaf',
			name: 'Go to next leaf in active tab group',
			callback: () => { goTo('goToNextLeaf') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-previous-leaf',
			name: 'Go to previous leaf in active tab group',
			callback: () => { goTo('goToPreviousLeaf') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-first-root-leaf',
			name: 'Go to first leaf in workspace root',
			callback: () => { goTo('goToFirstRootLeaf') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-last-root-leaf',
			name: 'Go to last leaf in workspace root',
			callback: () => { goTo('goToLastRootLeaf') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-first-tab-group-leaf',
			name: 'Go to first leaf in active tab group',
			callback: () => { goTo('goToFirstTabGroupLeaf') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-last-tab-group-leaf',
			name: 'Go to last leaf in active tab group',
			callback: () => { goTo('goToLastTabGroupLeaf') }
		});
		this.addCommand({
			id: 'smooth-nav-go-to-most-recent-leaf',
			name: 'Go to most recent leaf',
			callback: () => { goTo('goToMostRecentLeaf') }
		});
	} 
    // end onload
    // on plugin unload
	// onunload() {
		// console.log('Unloading the File Explorer Navigation plugin.');
    // }
	// load settings
    // async loadSettings() {
		// this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    // }
    // save settings
    // async saveSettings() {
		// await this.saveData(this.settings);
    // }
}
module.exports = SmoothNavigator;

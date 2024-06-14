# URL Checker 
The URL CHecker checks if a clicked URL is in the blacklist, whitelist, or stores it in the gray list based on predefined rules.

## Features
* Blacklist Check: Detects if a URL is in the blacklist and displays a warning popup.
* Whitelist Check: Allows URLs listed in the whitelist without interruption.
* Gray List: Stores URLs not in either list for later review.

## Installation
### Firefox Extension
1. Download or clone this repository to your local machine.

bash
    git clone https://github.com/your-username/url-checker-extension.git

2. Open Firefox and type about:debugging in the address bar.

3. Click on This Firefox in the left menu.

4. Click on Load Temporary Add-on....

5. Navigate to the directory where you cloned the repository, and select the manifest.json file.

6. The extension should now be loaded and visible in your Firefox toolbar as an icon.

## Usage
1. Browse the web as usual. When clicking on a link:

* If the URL is in the blacklist, a warning popup will appear.
* If the URL is in the whitelist, the link will open normally.
* If the URL is not in either list, it will be added to the Gray List for future reference.

2. Click on the extension icon in the Firefox toolbar to open the popup.

3. The popup displays a button to show the Gray List, which contains URLs that were accessed but not found in either the blacklist or whitelist.

## Configuration
### Lists
* Blacklist: Modify lists/blacklist.json to add or remove URLs/domains that should be blocked.
* Whitelist: Modify lists/whitelist.json to add or remove URLs/domains that should be allowed without interruption.

### Notifications
* Notifications for blacklist warnings are shown using Firefox's built-in notifications.

## Contributing
Contributions are welcome! If you have suggestions, feature requests, or bug reports, please open an issue on GitHub.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
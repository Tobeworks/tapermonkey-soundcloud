# SoundCloud Rights Holder Auto-Select

Automatically fill all rights holder fields on SoundCloud with one click.

## Features

- ⚡ **One-Click Auto-Fill**: Sets all rights holder fields automatically
- 💾 **Remembers Your Choice**: Saves your preferred rights holder for future use
- ⌨️ **Keyboard Shortcut**: Press `Ctrl+L` to run
- 🖱️ **Visual Button**: Click the button in the bottom-right corner
- 🌍 **Works for Everyone**: Dynamically adapts to your available rights holders

## Installation

### Prerequisites
- Firefox, Chrome, or any browser that supports Tampermonkey
- [Tampermonkey Extension](https://www.tampermonkey.net/)

### Steps
1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser
2. Click on the Tampermonkey icon → "Create a new script"
3. Delete the default content
4. Copy and paste the script from `soundcloud-rightsholder-autofill.user.js`
5. Save (Ctrl+S or click the save icon)
6. Done! 🎉

## Usage

### First Time
1. Go to a SoundCloud track monetization page
2. Click the **"⚡ Auto-Fill Rights Holder"** button (bottom-right) or press `Ctrl+L`
3. Enter the exact name of your rights holder when prompted (e.g., "Logic Moon")
4. The script will automatically fill all fields and remember your choice

### Subsequent Uses
1. Just click the button or press `Ctrl+L`
2. All fields will be filled automatically with your saved rights holder

## Managing Saved Rights Holder

### View Current Setting
Open the browser console (F12) and type:
```javascript
localStorage.getItem('sc_preferred_rightsholder');
```

### Change Rights Holder
Open the browser console (F12) and type:
```javascript
localStorage.removeItem('sc_preferred_rightsholder');
```
The next time you run the script, it will ask for a new rights holder.

### Set Manually
Open the browser console (F12) and type:
```javascript
localStorage.setItem('sc_preferred_rightsholder', 'Your Rights Holder Name');
```

## Troubleshooting

### Script doesn't load
- Check if Tampermonkey is enabled
- Check if the script is enabled (green dot in Tampermonkey dashboard)
- Reload the SoundCloud page (F5)

### Button doesn't appear
- Make sure you're on a page with rights holder fields
- Check the browser console (F12) for error messages

### Fields aren't filled
- Verify that your rights holder name is spelled exactly as it appears in the dropdown
- Try removing the saved value and entering it again

## Technical Details

- **Version**: 1.2
- **Permissions**: None required
- **Storage**: Uses localStorage to save preferences
- **Compatible with**: SoundCloud monetization pages

## License

Free to use and modify.

## Support

If you encounter issues, check the browser console (F12) for error messages.

---

Made with ❤️ for SoundCloud creators

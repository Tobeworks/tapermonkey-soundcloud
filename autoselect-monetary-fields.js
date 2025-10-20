// ==UserScript==
// @name         SoundCloud Rights Holder Auto-Select
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Automatically sets all rights holder fields to a selected value
// @match        *://soundcloud.com/*
// @match        *://*.soundcloud.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    window.setAllRightsholders = async function(rightsholderName = null) {
        if (!rightsholderName) {
            const buttons = document.querySelectorAll('.monetizationTerritory__rightsholderSelect button.sc-button-dropdown');
            if (buttons.length === 0) {
                alert('No rights holder fields found. Are you on the correct page?');
                return;
            }
            
            buttons[0].click();
            await new Promise(r => setTimeout(r, 500));
            
            const dd = document.querySelector('[id^="dropdown-button-"]');
            if (dd) {
                const options = Array.from(dd.querySelectorAll('li.linkMenu__item')).map(li => li.textContent.trim());
                dd.remove();
                
                rightsholderName = prompt('Which rights holder would you like to set?\n\nAvailable options:\n' + options.join('\n'), options[options.length - 1]);
                
                if (!rightsholderName) {
                    console.log('Cancelled');
                    return;
                }
            } else {
                alert('Could not open dropdown');
                return;
            }
        }
        
        console.log(`Starting... Setting all fields to: ${rightsholderName}`);
        let count = 0;
        
        while (true) {
            const buttons = document.querySelectorAll('.monetizationTerritory__rightsholderSelect button.sc-button-dropdown');
            
            const unsetButton = Array.from(buttons).find(btn => 
                btn.textContent.includes('Rechteinhaber auswählen') || btn.textContent.includes('Select rights holder')
            );
            
            if (!unsetButton) {
                console.log('No more unset fields found');
                break;
            }
            
            console.log(`Processing field ${count + 1}`);
            
            unsetButton.click();
            await new Promise(r => setTimeout(r, 400));
            
            const dd = document.querySelector('[id^="dropdown-button-"]');
            
            if (dd && window.getComputedStyle(dd).display !== 'none') {
                const targetLi = Array.from(dd.querySelectorAll('li.linkMenu__item')).find(el => 
                    el.textContent.trim() === rightsholderName
                );
                
                if (targetLi) {
                    const link = targetLi.querySelector('a');
                    if (link) {
                        link.click();
                        count++;
                        console.log(`${count} set ✓`);
                    }
                } else {
                    console.log(`"${rightsholderName}" not found ✗`);
                    alert(`Rights holder "${rightsholderName}" was not found!`);
                    break;
                }
            } else {
                console.log('Dropdown not found ✗');
                break;
            }
            
            await new Promise(r => setTimeout(r, 500));
            
            if (count > 50) {
                console.log('Safety limit reached');
                break;
            }
        }
        
        console.log(`Done! ${count} fields set to "${rightsholderName}"`);
        alert(`✓ Success! ${count} fields were set to "${rightsholderName}".`);
    };
    
    const button = document.createElement('button');
    button.textContent = '⚡ Auto-Fill Rights Holder';
    button.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;padding:12px 20px;background:#f50;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 12px rgba(0,0,0,0.3);font-size:14px;';
    button.onmouseover = () => button.style.background = '#ff6a3c';
    button.onmouseout = () => button.style.background = '#f50';
    button.onclick = () => setAllRightsholders();
    
    const observer = new MutationObserver(() => {
        if (document.querySelector('.monetizationTerritory__rightsholderSelect') && !document.getElementById('rightsholder-autofill-btn')) {
            button.id = 'rightsholder-autofill-btn';
            document.body.appendChild(button);
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            setAllRightsholders();
        }
    });
    
    console.log('✓ SoundCloud Rights Holder Auto-Select loaded!');
    console.log('  - Press Ctrl+L to execute');
    console.log('  - Or click the button in the bottom right');
})();

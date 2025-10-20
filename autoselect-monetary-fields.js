// ==UserScript==
// @name         Soundcloud Logic Moon Selector
// @namespace    http://tampermonkey.net/
// @version      2025-10-20
// @description  try to take over the world!
// @author       You
// @match        https://soundcloud.com/logic-moon/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=soundcloud.com
// @grant        none
// ==/UserScript==

// ==UserScript==
// @name         SoundCloud Logic Moon
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Setzt alle Rechteinhaber-Felder auf Logic Moon
// @match        https://soundcloud.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    window.setAllToLogicMoon = async function() {
        console.log('Starte...');
        let count = 0;

        while (true) {
            const buttons = document.querySelectorAll('.monetizationTerritory__rightsholderSelect button.sc-button-dropdown');

            const unsetButton = Array.from(buttons).find(btn =>
                btn.textContent.includes('Rechteinhaber auswählen')
            );

            if (!unsetButton) {
                console.log('Keine ungesetzten Felder mehr gefunden');
                break;
            }

            console.log(`\n=== Verarbeite Feld ${count + 1} ===`);

            unsetButton.click();
            await new Promise(r => setTimeout(r, 400));

            const dd = document.querySelector('[id^="dropdown-button-"]');

            if (dd && window.getComputedStyle(dd).display !== 'none') {
                const logicMoonLi = Array.from(dd.querySelectorAll('li.linkMenu__item')).find(el => el.textContent.trim() === 'Logic Moon');

                if (logicMoonLi) {
                    const link = logicMoonLi.querySelector('a');
                    if (link) {
                        link.click();
                        count++;
                        console.log(`${count} gesetzt ✓`);
                    }
                } else {
                    console.log('Logic Moon nicht gefunden ✗');
                    break;
                }
            } else {
                console.log('Dropdown nicht gefunden ✗');
                break;
            }

            await new Promise(r => setTimeout(r, 500));

            if (count > 50) {
                console.log('Sicherheits-Limit erreicht');
                break;
            }
        }

        console.log(`\n=== Fertig! ${count} Felder auf Logic Moon gesetzt ===`);
    };

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            console.log('Keyboard-Shortcut erkannt!');
            setAllToLogicMoon();
        }
    });

    console.log('Logic Moon Script geladen! Drücke Strg+L zum Ausführen');
})();

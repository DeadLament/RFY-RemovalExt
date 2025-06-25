/* 
Made by DeadLament
RFY is "Recommended For You"
Blocks all stuff appearing in Roblox webpage that i don't like 
(RFY, Sponsored section, new 'Based on what you joined' that trashes the homepage)
*/


function removeDiv(hreflink) { // hreflink here is a link to category.
    document.querySelectorAll(`a[href^="${hreflink}"]`).forEach(elementToRemove => {
        let container = elementToRemove;
        for (let i = 0; i < 3; i++) {
            container = container.parentElement;
            if (container.classList.contains('game-sort-carousel-wrapper')) { // 'game-sort-carousel-wrapper' is everywhere.
                container.remove();
                break;
            }
        }
    });
}


function removeRecommendations() {

    /* 
    1. All RFY. All RFY has the same tag "home-page-game-grid"
    All other stuff like sponsored games and new 'Based on what you joined' section has 'game-sort-carousel-wrapper'.
    */

    const mainContainer = document.querySelector('div[data-testid="home-page-game-grid"]');
    if (mainContainer) mainContainer.remove();

    // 1.1 'Sponsored'
    removeDiv('https://www.roblox.com/discover#/sortName/v2/Sponsored')

    // 1.2 'Based on what you joined'
    removeDiv('https://www.roblox.com/discover#/sortName/v2/Based%20On%20What%20You%20Joined')

    /*
    If you want to add here something in case you want to remove favorites or Roblox adds something again and i will forget to update extension
    Press Inspect (Ctrl+Shift+C) and click on <a> tag of that category
    There should be href located in it
    Paste it in removeDiv func
    :3
    */
}

// SPA stuff, when we go back to the homepage from other sections it removes all the stuff again.
const observer = new MutationObserver(mutations => {
    let needsUpdate = false;
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            needsUpdate = true;
            break;
        }
    }
    if (needsUpdate) removeRecommendations();
});

// initialize extension
function init() {
    removeRecommendations();
    observer.observe(document.body, { // SPA for page updates
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });
    // failcheck timer, if you got a bad wifi.
    setTimeout(removeRecommendations, 3000);
}

// init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
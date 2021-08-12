const delElements = [
    'ytd-rich-grid-renderer',
    '#secondary',
    '.ytd-comments',
    ' [aria-label="Explorar"]',
    '[title="Explorar"]',
    '.html5-endscreen',
    '.ytp-next-button',
];
const mutationObserver = new MutationObserver(onMutation);
onMutation([{ addedNodes: [document.documentElement] }]);
observe();

function onMutation(mutations) {
    const toRemove = [];
    for (const { addedNodes } of mutations) {
        for (const n of addedNodes) {
            if (n.tagName) {
                if (n.matches(delElements)) {
                    toRemove.push(n);
                } else if (
                    n.firstElementChild &&
                    n.querySelector(delElements)
                ) {
                    toRemove.push(...n.querySelectorAll(delElements));
                }
            }
        }
    }
    for (const element of toRemove) element.remove();
    observe();
}

function observe() {
    mutationObserver.observe(document, {
        subtree: true,
        childList: true,
    });
}

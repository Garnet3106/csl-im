$(function() {
    switchSubscribeStatus();
    initMutationObserver();
});

function initMutationObserver() {
    let subscribeButton = document.getElementById('SubscribeItemBtn');
    let observer = new MutationObserver(switchSubscribeStatus);
    const config = {
        attributes: true,
        attributeOldValue: false,
        characterData: false,
        characterDataOldValue: false,
        childList: false,
        subtree: false,
    };
    observer.observe(subscribeButton, config);
}

function switchSubscribeStatus() {
    let subscribeButton = $('#SubscribeItemBtn');
    let subscribeStatus = subscribeButton.attr('class').split(' ').pop() === "toggled";
    console.log(subscribeStatus);
}

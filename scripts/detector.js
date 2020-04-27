class ItemManager {
    constructor() {
        this.itemList = [];
    }

    updateItem() {
        let item = this.getItem();
        console.log(item);
        this.itemList[item.id] = item;
    }

    getItem() {
        let item = new Item();

        let paramPairs = document.location.search.substring(1).split('&');
        let paramAssoc = [];
        paramPairs.forEach(function(val) {
            let pair = val.split('=');
            paramAssoc[pair[0]] = pair[1];
        });
        item.id = paramAssoc['id'];

        item.title = $('.workshopItemTitle').text();
        item.description = $('#highlightContent').html();
        item.type = $('.col_right').eq(0).children('div.rightDetailsBlock').eq(0).text();

        let tags = [];
        $('.workshopTags').children('a').each(function(i, elem) {
            tags.push(elem.innerText);
        });
        item.tags = tags;

        item.rating = $('.fileRatingDetails').children('img').eq(0).attr('src').match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];

        let creatorIDs = [];
        $('.creatorsBlock').children('div').each(function(i, elem) {
            creatorIDs.push(elem.getElementsByClassName('friendBlockLinkOverlay')[0].getAttribute('href').split('/').pop());
        });
        item.owner = creatorIDs[0];
        item.creators = creatorIDs;

        let detailContainer = $('.detailsStatsContainerRight').eq(0).children('.detailsStatRight');
        item.fileSize = detailContainer.eq(0).text().replace(' ', '');
        item.postedAt = detailContainer.eq(1).text();
        item.updatedAt = detailContainer.length >= 3 ? detailContainer.eq(2).text() : '';

        item.updateCount = $('.detailsStatNumChangeNotes').text().split(' ')[0];
        item.isSubscribing = $('#SubscribeItemBtn').attr('class').split(' ').pop() === "toggled";

        return item;
    }
}



class Item {
    constructor() {
        this.creators = [];
        this.description = '';
        this.fileSize = '';
        this.id = '';
        this.isSubscribing = false;
        this.owner = '';
        this.postedAt = '';
        this.rating = '';
        this.tags = [];
        this.title = '';
        this.type = '';
        this.updatedAt = '';
        this.updateCount = '';
    }
}



var itemManager = new ItemManager();

$(function() {
    updateWorkshopItem();
    initMutationObserver();
});

function updateWorkshopItem() {
    itemManager.updateItem();
}

function initMutationObserver() {
    let subscribeButton = document.getElementById('SubscribeItemBtn');
    let observer = new MutationObserver(updateWorkshopItem);
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
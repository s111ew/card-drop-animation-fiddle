function positionCards() {
    let cards = document.querySelectorAll(".card");
    let width = window.innerWidth;
    let height = window.innerHeight;
    cards.forEach(card => {
        let cardWidth = card.offsetWidth;
        let cardHeight = card.offsetHeight;
        card.style.left = (width / 2 - cardWidth / 2) + 'px';
        card.style.top = (height / 2 - cardHeight / 2) + 'px';
    });
}
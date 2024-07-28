var PADDING = 10;

const cards = document.querySelectorAll(".card");

var rect;
var viewport = {
  bottom: 0,
  left: 0,
  right: 0,
  top: 0
}

function positionCards() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    cards.forEach(card => {
        let cardWidth = card.offsetWidth;
        let cardHeight = card.offsetHeight;
        card.style.left = (width / 2 - cardWidth / 2) + 'px';
        card.style.top = (height / 2 - cardHeight / 2) + 'px';
    });
    addDragEventListeners();
}

function cardToTop() {
    function bringToTop(event) {
        let highestZIndex = 0;
        cards.forEach(card => {
            const zIndex = parseInt(window.getComputedStyle(card).zIndex);
            if (zIndex > highestZIndex) {
                highestZIndex = zIndex;
            }
        });
        event.target.style.zIndex = highestZIndex + 1;
    }

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousedown', bringToTop);
    });
};

function dragElement(elmnt) {

  elmnt.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e = e || window.event;

    pos3 = e.clientX;
    pos4 = e.clientY;
    
    rect = elmnt.getBoundingClientRect();
    viewport.bottom = window.innerHeight - PADDING;
    viewport.left = PADDING;
    viewport.right = window.innerWidth - PADDING;
    viewport.top = PADDING;
    
    document.onmouseup = closeDragElement;
 
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    var newLeft = elmnt.offsetLeft - pos1;
    var newTop = elmnt.offsetTop - pos2;

    if (newLeft < viewport.left
        || newTop < viewport.top
        || newLeft + rect.width > viewport.right
        || newTop + rect.height > viewport.bottom
    ) {
    
    } else {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
  cardToTop();
}

function addDragEventListeners () {
    cards.forEach(card => {
        card.addEventListener("click", () => {
            cards.forEach(card => {
                card.classList.add(`${card.id}-animation`);
                dragElement(card);
            });
        });
    });
};

function cardsToGrid () {
    cards.forEach((card) => {
        card.classList.remove(`${card.id}-animation`);
        card.style.position = "static";
        card.style.transform = '';
    })
}

function addGridEventListener () {
    let checkbox = document.querySelector("#resetCheckbox");
    checkbox.addEventListener("change", cardsToGrid)
}

window.onload = positionCards(), addGridEventListener();


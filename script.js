let arrOfOpenedElements = [];
let openedElementsData = [];
let openedCardsCount = 0;
let newImage = [];
let clickingAbilityToCard = true;
const images = [
    'assets/america.jpg',
    'assets/armenia.png',
    'assets/canada.jpg',
    'assets/china.gif',
    'assets/corea.jpg',
    'assets/denmark.png',
    'assets/egypt.jpg',
    'assets/france.jpg',
    'assets/germany.jpg',
    'assets/iran.jpg',
    'assets/italy.jpg',
    'assets/japan.gif',
    'assets/russia.png',
    'assets/spain.png',
    'assets/uk.jpg',
];
let numberOfCards = document.getElementById('dificulty-level').value;

window.onload = () => {
    document.getElementById('start-game').addEventListener('click', createCards);
};

const  createCards = () => {
    // clear board
    document.getElementById('game-board').innerHTML = '';
    numberOfCards = document.getElementById('dificulty-level').value;
    // create card
    const card = document.createElement('div');
    // add level and images of game
    chooseLevel(card, numberOfCards);
    // shuffle cards array
    arrayShuffle();
        // draw front picture
        for (let i = 0; i < numberOfCards; i++) {
            const eachcard = document.createElement('div');
            const img = document.createElement('img');
            const imgBackFace = document.createElement('img');
            img.classList.add('front-face');
            imgBackFace.classList.add('back-face');
            if (+numberOfCards === 12) {
                img.classList.add('easy');
                eachcard.classList.add('easy');
                imgBackFace.classList.add('easy');
            } else if (+numberOfCards === 20) {
                img.classList.add('medium');
                imgBackFace.classList.add('medium');
                eachcard.classList.add('medium');
            } else {
                img.classList.add('difficult');
                imgBackFace.classList.add('difficult');
                eachcard.classList.add('difficult');
            }
            // create card back face
            img.src=newImage[i];
            // create card front face
            imgBackFace.src = 'assets/backside.jpg';
            // put inside div card faces
            eachcard.appendChild(imgBackFace);
            eachcard.appendChild(img);
            eachcard.setAttribute('id', Math.random());
            // click to run cards turning function
            eachcard.addEventListener('click',  rotateCard);
            document.getElementById('game-board').appendChild(eachcard);
        }
}

const chooseLevel = (card, numberOfCards) => {
    let imagesCopy = [];
    imagesCopy = [...images]
    if (+numberOfCards === 12) {
        card.classList.add('easy');
        newImage = imagesCopy.splice(0, +numberOfCards / 2);
    } else if (+numberOfCards === 20) {
        card.classList.add('medium');
        newImage = imagesCopy.splice(0, +numberOfCards / 2);
    } else {
        card.classList.add('difficult');
        newImage = imagesCopy.splice(0, +numberOfCards / 2);
    }
    newImage = [ ...newImage, ...newImage];
    return newImage;
}

const arrayShuffle = () => {
    for (let i = newImage.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = newImage[i];
        newImage[i] = newImage[j];
        newImage[j] = temp;
    }
}

const rotateCard = (event) => {
    // if two clicks have been done turn cards
    if (clickingAbilityToCard) {
        // console.log('event.currentTarget.childNodes[1]', event.currentTarget.childNodes);
        let elementSrc = event.currentTarget.childNodes[1].src;
        let elementId = event.currentTarget.getAttribute('id');

        if ((arrOfOpenedElements.length === 1 && elementId === arrOfOpenedElements[0].elementId)) {
            return
        }

        arrOfOpenedElements.push({ elementSrc, elementId });
        // make only 2 clicks before turning cards back
        if (arrOfOpenedElements.length === 2) {
            clickingAbilityToCard = false;
        } else {
            clickingAbilityToCard = true;
        }

        openedElementsData.push(event.currentTarget);
        if (Object.values(event.currentTarget.childNodes[0].classList).indexOf('back-face') > -1) {
            event.currentTarget.childNodes[0].classList.remove('back-face');
            event.currentTarget.childNodes[0].classList.add('front-face');
            event.currentTarget.childNodes[1].classList.remove('front-face');
            event.currentTarget.childNodes[1].classList.add('back-face');
        }

        if (arrOfOpenedElements.length === 2) {
            //  turning back automatically or keep cards
            setTimeout(() => {
                if (arrOfOpenedElements[0].elementSrc !== arrOfOpenedElements[1].elementSrc) {
                    // cards array 1st child, change faces of cards
                    openedElementsData[0].childNodes[0].classList.remove('front-face');
                    openedElementsData[0].childNodes[0].classList.add('back-face');
                    openedElementsData[0].childNodes[1].classList.remove('back-face');
                    openedElementsData[0].childNodes[1].classList.add('front-face');
                    // cards array 2nd child, change faces of cards
                    openedElementsData[1].childNodes[0].classList.remove('front-face');
                    openedElementsData[1].childNodes[0].classList.add('back-face');
                    openedElementsData[1].childNodes[1].classList.remove('back-face');
                    openedElementsData[1].childNodes[1].classList.add('front-face');
                    openedElementsData = [];
                    clickingAbilityToCard = true;
                } else {
                    // user wins
                    openedElementsData = [];
                    openedCardsCount++;
                    if (+numberOfCards === 12 && openedCardsCount === 6 || +numberOfCards === 20 && openedCardsCount === 10 || +numberOfCards === 30 && openedCardsCount === 15) {
                        alert('congratulations, you won!!!');
                        openedCardsCount = 0;
                        // restart game
                        createCards();
                    }
                }
                arrOfOpenedElements = [];
                clickingAbilityToCard = true;
            }, 1500)
        }
    }
}


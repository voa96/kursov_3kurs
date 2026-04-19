const recommended_equipment = document.querySelector(".recommended_equipment");
const min_equipment = document.querySelector(".min_equipment");

const CloseModalBtn = document.querySelector(".close_modal_win")
const ModalWinMain = document.querySelector(".modal_win_wrapper")
const ModalWin = document.querySelector(".modal_win")

const recPrice = document.querySelectorAll(".rec")
const minPrice = document.querySelectorAll(".min")

recommended_equipment.addEventListener("click",switchmax)
min_equipment.addEventListener("click",switchmin)

let idTarget

const gameInfo = [
    {
        name: 'gta5',
        card: {rec: 'NVIDIA GeForce RTX 4070 / AMD Radeon RX 7800 XT',min: 'NVIDIA GeForce RTX 3060 / AMD Radeon RX 6600 XT'},
        processor: {rec: 'AMD Ryzen 7 7800X3D / Intel Core i7-13700K',min: 'Intel Core i5-12400F / AMD Ryzen 5 5600'},
        access: {rec: '32 GB (2x16) DDR5', min: '16 GB (2x8) DDR4'},
        motherBoard: {rec: 'Z790 / B650',min: 'B660 / B550'},
        ssd: {rec: 'NVMe SSD 1 ТБ (PCIe 4.0)',min: 'SSD 500 GB (SATA или NVMe)'},
        powerUnit: {rec: '750W (80+ Gold)',min: '550W (80+ Bronze)'},
        body: {rec: 'ZALMAN N4 Rev.1 Black ATX',min: 'Deepcool CG530 4F'},
        productiveRec: {low: '200+ FPS',medium: '180+ FPS', high: '150+ FPS',max: '120+ FPS'},
        productiveMin: {low: '100+ FPS',medium: '80+ FPS',high: '70+ FPS',max: '60+ FPS'},
        priceSell:{rec: '200 000 руб', min:'110 000 руб'},
        priceBuy:{rec: '~177 000', min: '~ 95 000'},
        titleName: 'Grand Theft Auto V',
        img: 'https://i.playground.ru/p/axyE4V_QXmwLFJUJ05q7uQ.jpeg',
        gameText:'Grand Theft Auto V — это не просто игра, это живая платформа. Несмотря на возраст, благодаря гениальной работе Rockstar и невероятному сообществу моддеров, Лос-Сантос продолжает удивлять. Сегодня в GTA V можно увидеть то, о чем мы не могли и мечтать в 2015 году: фотореалистичные графические моды, дополнения с машинами и оружием нового поколения, полный перезапуск физики и масштабные ролевые проекты.',
    },
    {
        name: 'gta6',
        card: {rec: 'NVIDIA GeForce RTX 5090 / AMD Radeon RX 7900 XTX',min: 'NVIDIA GeForce RTX 4070 / AMD Radeon RX 7800 XT'},
        processor: {rec: 'AMD Ryzen 7 7800X3D / Intel Core i7-13700K',min: 'Intel Core i5-12600K / AMD Ryzen 5 5600X'},
        access: { rec: '64 GB (2x32) DDR5', min: '32 GB (2x16) DDR5'},
        motherBoard: { rec: 'X670E / Z790', min: 'B650 / B760'},
        ssd: { rec: 'NVMe SSD 2 ТБ (PCIe 4.0/5.0)', min: 'NVMe SSD 1 ТБ' },
        powerUnit: { rec: '1000W (80+ Platinum)', min: '750W (80+ Gold)' },
        body: { rec: 'Full-Tower', min: 'Midi-Tower' },
        productiveRec: { low: '200+ FPS', medium: '160+ FPS', high: '120+ FPS', max: '80+ FPS' },
        productiveMin: { low: '120+ FPS', medium: '90+ FPS', high: '70+ FPS', max: '60+ FPS' },
        priceSell: { rec: '430 000 руб', min: '180 000 руб' },
        priceBuy: { rec: '~355 000', min: '~149 000' },
        titleName: 'Grand Theft Auto VI',
        img: 'https://i.ytimg.com/vi/REP0dcYFP9Q/maxresdefault.jpg',
        gameText:'Grand Theft Auto VI игра в жанре action-adventure с открытым миром, разрабатываемая компанией Rockstar Games. Станет шестнадцатой по счёту и восьмой крупной игрой в серии Grand Theft Auto. ',
    },
    {
        name: 'CS2',
        card: {rec: 'NVIDIA GeForce RTX 5070 / AMD Radeon RX 9060 XT',min: 'AMD Radeon RX 6600 / Intel Arc B580'},
        processor: {rec: 'AMD Ryzen 7 7800X3D / Intel Core i7-13700K',min: 'Intel Core i3-14100F / AMD Ryzen 5 5500'},
        access: { rec: '32 GB (2x16) DDR5', min: '16 GB (2x8) DDR4' },
        motherBoard: { rec: 'B650 / Z790', min: 'B660 / B550 / B760M' },
        ssd: { rec: 'NVMe SSD 1 ТБ (PCIe 4.0)', min: 'NVMe SSD 512 ГБ (PCIe 3.0)' },
        powerUnit: { rec: '750W (80+ Gold)', min: '550W (80+ Bronze)' },
        body: { rec: 'Midi-Tower с хорошей вентиляцией', min: 'Midi-Tower' },
        productiveRec: { low: '400+ FPS', medium: '350+ FPS', high: '300+ FPS', max: '240+ FPS' },
        productiveMin: { low: '200+ FPS', medium: '150+ FPS', high: '120+ FPS', max: '100+ FPS' },
        priceSell: { rec: '200 000 руб', min: '85 000 руб' },
        priceBuy: { rec: '~160 000 руб', min: '~70 000 руб' },
        titleName: 'Counter-Strike 2',
        img: 'https://avatars.mds.yandex.net/get-entity_search/1880293/795741416/S600xU_2x',
        gameText:'Counter-Strike 2 (сокр. CS2; с англ. — «Контрудар 2») — компьютерная игра в жанре многопользовательского тактического шутера от первого лица, разработанная компанией Valve. Это 5-я игра в серии Counter-Strike, заявляется как бесплатное обновление к Counter-Strike: Global Offensive (CS:GO)',
    },
    {
    name: 'dota2', 
    card: {rec: 'NVIDIA GeForce RTX 3060 / AMD Radeon RX 6650 XT',min: 'NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 560'},
    processor: {rec: 'Intel Core i5-12400F / AMD Ryzen 5 5600',min: 'Intel Core i3-10105 / AMD Ryzen 3 3200G'},
    access: { rec: '16 GB (2x8) DDR4', min: '8 GB (2x4) DDR4' },
    motherBoard: { rec: 'B660 / B550', min: 'H610 / A520' },
    ssd: { rec: 'NVMe SSD 512 ГБ (PCIe 3.0)', min: 'SSD 256 ГБ (SATA)' },
    powerUnit: { rec: '550W (80+ Bronze)', min: '400W' },
    body: { rec: 'Midi-Tower', min: 'Midi-Tower' },
    productiveRec: { low: '200+ FPS', medium: '150+ FPS', high: '120+ FPS', max: '100+ FPS' },
    productiveMin: { low: '100+ FPS', medium: '80+ FPS', high: '60+ FPS', max: '40+ FPS' },
    priceSell: { rec: '95 000 руб', min: '55 000 руб' },
    priceBuy: { rec: '~80 000 руб', min: '~45 000 руб' },
    titleName: 'Dota 2',
    img: '---',
    gameText:'Dota 2 — это культовая многопользовательская игра в жанре MOBA, разработанная компанией Valve. Стратегическая глубина, тысячи часов баланса и непредсказуемые командные сражения сделали её одной из самых популярных игр в мире. В 2026 году Dota 2 продолжает эволюционировать с новыми героями, патчами и турнирами, оставаясь главным вызовом для миллионов игроков по всему миру.',
},
{
    name: 'rust',
    card: {
        rec: 'NVIDIA GeForce RTX 3060 / AMD Radeon RX 6600 XT / Intel Arc B580',
        min: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 470 / Intel Arc A580'
    },
    processor: {
        rec: 'AMD Ryzen 5 3600 / Intel Core i7-6700K',
        min: 'Intel Core i5-6600 / AMD Ryzen 5 1400'
    },
    access: { rec: '16 GB (2x8) DDR4', min: '12 GB (2x6) DDR4' },
    motherBoard: { rec: 'B550 / B660', min: 'A320 / H510' },
    ssd: { rec: 'NVMe SSD 500 ГБ (PCIe 3.0) — обязательно', min: 'SSD 500 ГБ (SATA) — настоятельно рекомендуется' },
    powerUnit: { rec: '650W (80+ Bronze)', min: '550W (80+ Bronze)' },
    body: { rec: 'Midi-Tower с хорошей вентиляцией', min: 'Midi-Tower' },
    productiveRec: { low: '120+ FPS', medium: '90+ FPS', high: '70+ FPS', max: '60+ FPS' },
    productiveMin: { low: '60+ FPS', medium: '50+ FPS', high: '40+ FPS', max: '30+ FPS' },
    priceSell: { rec: '110 000 руб', min: '70 000 руб' },
    priceBuy: { rec: '~90 000 руб', min: '~58 000 руб' },
    titleName: 'Rust',
    img: '',
    gameText:'Rust — это жестокая игра на выживание в открытом мире от британской студии Facepunch, где единственная цель — выжить любой ценой [citation:1][citation:4]. Игроки начинают голыми с камнем и факелом в руках, а главную угрозу представляют не дикие животные или радиация, а другие игроки [citation:1][citation:4]. Здесь можно строить базы, крафтить оружие от луков до автоматов Калашникова, объединяться в кланы и рейдить чужие укрепления [citation:3][citation:7]. Мир процедурно генерируется, а обновления выходят каждый месяц, поддерживая игру свежей даже спустя годы [citation:3][citation:6]. Комьюнити славится своей токсичностью, но именно это создаёт ту самую атмосферу дикого выживания, где нет правил, кроме одного — не умри [citation:3][citation:6].'
}

]
function switchmin(){
    setTimeout(() => {
        ModalWin.querySelector(".img_choice_min").style.opacity = "1"
        ModalWin.querySelector(".img_choice_rec").style.opacity = "0"
    },10)
    const gameInfoObject = gameInfo.find((item) => item.name === idTarget);
    ModalWin.querySelector('.card').textContent = gameInfoObject.card.min
    ModalWin.querySelector('.processor').textContent = gameInfoObject.processor.min
    ModalWin.querySelector('.access').textContent = gameInfoObject.access.min
    ModalWin.querySelector('.motherBoard').textContent = gameInfoObject.motherBoard.min
    ModalWin.querySelector('.ssd').textContent = gameInfoObject.ssd.min
    ModalWin.querySelector('.powerUnit').textContent = gameInfoObject.powerUnit.min
    ModalWin.querySelector('.body').textContent = gameInfoObject.body.min
    ModalWin.querySelector('.productivityLow').textContent = gameInfoObject.productiveMin.low
    ModalWin.querySelector('.productivityMedium').textContent = gameInfoObject.productiveMin.medium
    ModalWin.querySelector('.productivityHigh').textContent = gameInfoObject.productiveMin.high
    ModalWin.querySelector('.productivityMax').textContent = gameInfoObject.productiveMin.max
}
function switchmax(){
    setTimeout(() => {
        ModalWin.querySelector(".img_choice_min").style.opacity = "0"
        ModalWin.querySelector(".img_choice_rec").style.opacity = "1"
    },10)
    const gameInfoObject = gameInfo.find((item) => item.name === idTarget);
    console.log(gameInfoObject);
    ModalWin.querySelector('.card').textContent = gameInfoObject.card.rec
    ModalWin.querySelector('.processor').textContent = gameInfoObject.processor.rec
    ModalWin.querySelector('.access').textContent = gameInfoObject.access.rec
    ModalWin.querySelector('.motherBoard').textContent = gameInfoObject.motherBoard.rec
    ModalWin.querySelector('.ssd').textContent = gameInfoObject.ssd.rec
    ModalWin.querySelector('.powerUnit').textContent = gameInfoObject.powerUnit.rec
    ModalWin.querySelector('.body').textContent = gameInfoObject.body.rec
    ModalWin.querySelector('.productivityLow').textContent = gameInfoObject.productiveRec.low
    ModalWin.querySelector('.productivityMedium').textContent = gameInfoObject.productiveRec.medium
    ModalWin.querySelector('.productivityHigh').textContent = gameInfoObject.productiveRec.high
    ModalWin.querySelector('.productivityMax').textContent = gameInfoObject.productiveRec.max

}

CloseModalBtn.addEventListener("click",CloseModal)
function CloseModal(){
    ModalWinMain.style.scale = "0.3"
    ModalWin.style.opacity = "0.1"
    setTimeout(() => {
        ModalWin.style.display = "none"
    }, 200);
    document.documentElement.style.overflow = 'auto'
}



const allSliders = [];

// Функция создания слайдера
function createSlider(gameBlock) {
    const sliderData = {
        container: gameBlock,
        slider: gameBlock.querySelector('.game_screen_slaider'),
        slides: gameBlock.querySelectorAll('.game_screen_slaider img'),
        prevBtn: gameBlock.querySelector('.prev_btn'),
        nextBtn: gameBlock.querySelector('.next_btn'),
        openModalBtn: gameBlock.querySelector('.open_modal'),
        currentSlide: 0,
        autoPlayInterval: null,
        isAutoPlaying: true
    };
    function openModalWin(){
        ModalWin.style.display = 'block'
        document.documentElement.style.overflow = ' hidden'
        setTimeout(() => {
            ModalWinMain.style.scale = '1'
            ModalWin.style.opacity = '1'
        },20);
    }
    
    // Функции для этого слайдера
    function nextSlide() {
        sliderData.currentSlide++;  
        if (sliderData.currentSlide >= sliderData.slides.length) 
            {sliderData.currentSlide = 0;}
        updateSlider();
        resetAutoPlay();
    }
    
    function prevSlide() {
        sliderData.currentSlide--;
        if (sliderData.currentSlide < 0) 
            {sliderData.currentSlide = sliderData.slides.length - 1;}
        updateSlider();
        resetAutoPlay();
    }
    
    function updateSlider() {
        sliderData.slider.style.transform = `translateX(-${sliderData.currentSlide * 100}%)`;
    }
    
    function startAutoPlay() {
        if (sliderData.autoPlayInterval) {
            clearInterval(sliderData.autoPlayInterval);
        }
        sliderData.autoPlayInterval = setInterval(nextSlide, 3000);
        sliderData.isAutoPlaying = true;
    }
    
    function resetAutoPlay() {
        if (sliderData.isAutoPlaying) {
            clearInterval(sliderData.autoPlayInterval);
            startAutoPlay();
        }
    }
    
    sliderData.prevBtn.addEventListener('click', prevSlide);
    sliderData.nextBtn.addEventListener('click', nextSlide);
    
    sliderData.openModalBtn.addEventListener('click', openModalWin);
    sliderData.openModalBtn.addEventListener('click', function ltarget(e){
            idTarget = e.target.id
            console.log(idTarget);
            const gameInfoObject = gameInfo.find((item) => item.name === idTarget);
            ModalWin.querySelector('.game_text').textContent = gameInfoObject.gameText
            ModalWin.querySelector('.img_game').src = gameInfoObject.img
            ModalWin.querySelector('.name_game').textContent = gameInfoObject.titleName
            switchmax()
        });
        
    
    // Пауза при наведении
    sliderData.container.addEventListener('mouseenter', () => {
        if (sliderData.isAutoPlaying) {
            clearInterval(sliderData.autoPlayInterval);
        }
    });
    
    sliderData.container.addEventListener('mouseleave', () => {
        if (sliderData.isAutoPlaying) {
            startAutoPlay();
        }
    });
    
    startAutoPlay();
    
    allSliders.push(sliderData);
}

document.querySelectorAll('.game').forEach(gameBlock => {
    createSlider(gameBlock);
});

console.log(`Создано слайдеров: ${allSliders.length}`);
const openBtn_5 = document.querySelector(".open_modal_game_li_5");
const openBtn_6 = document.querySelector(".open_modal_game_li_6");
const openBtn_4 = document.querySelector(".open_modal_game_li_4");
const openBtn_3 = document.querySelector(".open_modal_game_li_3");
const openBtn_2 = document.querySelector(".open_modal_game_li_2");
const openBtn_1 = document.querySelector(".open_modal_game_li_1");
const modal = document.querySelector(".modal_game_li");
const closeBtn = document.querySelector(".close_modal_game_li");
const modalWr = document.querySelector(".modal_wrapper");

const headerBtn = document.querySelector(".header_but")

const windWidth = window.screen.width;
console.log(windWidth);

function openModal() {
    modal.classList.remove("hide");
    modalWr.style.display = "block";
    modalWr.style.opacity = "0";
    modalWr.style.scale = "0";
    modalWr.style.transform = "translate(-50%, -50%) scale(0.5)";
    modalWr.style.transition = "opacity 0.3s, transform 0.3s";
    document.documentElement.style.overflow = 'hidden';
    header_nav_mini.style.display = "none"
    if(windWidth <= 800){
        headerBtn.style.display = "none"
    }
        setTimeout(() => {
        modalWr.style.opacity = "1";
        modalWr.style.scale = "1";
        modalWr.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
}
function closeModal(e, clickedOutside) {
    if (clickedOutside) {
        if (e.target.classList.contains("modal-overlay"))
            modal.classList.add("hide");
    } else {
            if(windWidth <= 800){
                headerBtn.style.display = "block";
                document.querySelector(".header_menu_img_before").style.display = "block";
                document.querySelector(".header_menu_img_before").style.transform = "rotate(0deg) scale(1)";
                document.querySelector(".header_menu_img_before").style.transition = "transform 0s";
                document.querySelector(".header_menu_img_after").style.display = "none";
            }
        document.documentElement.style.overflow = 'auto';
            modal.classList.add("hide");
            modalContent6.style.display = "none"
            modalContent5.style.display = "none"
            modalContent4.style.display = "none"
            modalContent3.style.display = "none"
            modalContent2.style.display = "none"
            modalContent1.style.display = "none"   
        }
}
const modalContent6 = document.querySelector(".modal_game_content_6");
const modalContent5 = document.querySelector(".modal_game_content_5");
const modalContent4 = document.querySelector(".modal_game_content_4");
const modalContent3 = document.querySelector(".modal_game_content_3");
const modalContent2 = document.querySelector(".modal_game_content_2");
const modalContent1 = document.querySelector(".modal_game_content_1");
openBtn_6.addEventListener("click", function() {
    openModal();
    if (modalContent6) {
        modalContent6.style.display = "block";
    }
});
openBtn_5.addEventListener("click", function() {
    openModal();
    if (modalContent5) {
        modalContent5.style.display = "block";
    }
});
openBtn_4.addEventListener("click", function() {
    openModal();
    if (modalContent4) {
        modalContent4.style.display = "block";
    }
});
openBtn_3.addEventListener("click", function() {
    openModal();
    if (modalContent3) {
        modalContent3.style.display = "block";
    }
});
openBtn_2.addEventListener("click", function() {
    openModal();
    if (modalContent2) {
        modalContent2.style.display = "block";
    }
});
openBtn_1.addEventListener("click", function() {
    openModal();
    if (modalContent1) {
        modalContent1.style.display = "block";
    }
});
modal.addEventListener("click", (e) => closeModal(e, true));
closeBtn.addEventListener("click", closeModal);




// header modal
const header_nav_mini = document.querySelector(".header_menu_box_mini")
const OpenHeaderBtn = document.querySelector(".header_menu_box_button")

OpenHeaderBtn.addEventListener("click", toggleModalHeader);




function toggleModalHeader(){
    if(header_nav_mini.style.display === "none" || header_nav_mini.style.display === ""){
        setTimeout(() =>{
            header_nav_mini.style.transform = "translate(20%, -95%) scale(1)";
            header_nav_mini.style.transition = "transform 0.3s";
        },10)
        header_nav_mini.style.display = "grid"
        OpenHeaderBtn.classList.add("active")
        document.querySelector(".header_menu_img_after").style.transform = "rotate(0deg) scale(1)";
        document.querySelector(".header_menu_img_after").style.transition = "transform 0.5s";
        setTimeout(() => {
            document.querySelector(".header_menu_img_after").style.display = "block";
            document.querySelector(".header_menu_img_before").style.display = "none";
        },200)
        document.querySelector(".header_menu_img_before").style.transform = "rotate(360deg) scale(0.3)";
        document.querySelector(".header_menu_img_before").style.transition = "transform 0.5s";
        if(windWidth <= 600){
            setTimeout(() =>{
            header_nav_mini.style.transform = "translate(25%, -55%) scale(1)";
            header_nav_mini.style.transition = "transform 0.3s";
        },10)
        }
        if(windWidth <= 400){
            setTimeout(() =>{
            header_nav_mini.style.transform = "translate(0%, 5%) scale(1)";
            header_nav_mini.style.transition = "transform 0.3s";
        },10)
        }
    }
    else{
        header_nav_mini.style.transform = "translate(-30%, -100%) scale(0.1)";
        header_nav_mini.style.transition = "transform 0.3s";

        document.querySelector(".header_menu_img_after").style.transform = "rotate(-360deg) scale(0.3)";
        document.querySelector(".header_menu_img_after").style.transition = "transform 0.5s";

        document.querySelector(".header_menu_img_before").style.transform = "rotate(0deg)";
        document.querySelector(".header_menu_img_before").style.transition = "transform 0s";
        setTimeout(() =>{
        document.querySelector(".header_menu_img_after").style.display = "none";
        document.querySelector(".header_menu_img_before").style.display = "block";
        header_nav_mini.style.display = "none"
    },200)
        OpenHeaderBtn.classList.remove("active")
    }
}
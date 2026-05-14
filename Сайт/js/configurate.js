document.addEventListener('DOMContentLoaded', function() {
    fetch('../db/categories.json')
        .then(response => {
            return response.json();
        })
        .then(categories => {
            const componentsList = document.querySelector('.categories');
            categories.forEach(component => {
                const li = document.createElement('li');
                li.className = 'component';
                li.textContent = component.name;
                li.setAttribute('data-id', component.id);
                li.addEventListener('click',() => {
                    changeCategory(component.id)
                })
                componentsList.appendChild(li);
            });
        })
    
    const fieldElements = document.querySelectorAll('.confidurElem');
    fieldElements.forEach(element => {
        element.addEventListener('click', function() {
            const catId = this.id;
            // const catName = this.querySelector('.choice').getAttribute('data-text');
            changeCategory(catId);
        });
    });
});

function changeCategory(catId){
    const elementConfList = document.querySelector('.elementConfList-ul')
    elementConfList.innerHTML = ''
    fetch('../db/products.json')
    .then(response =>{
        return response.json();
    })
    .then(products =>{
        products.forEach(item => {
            if(catId == item.category_id){
                const li = document.createElement('li');
                li.className = 'elementConf';
                li.innerHTML = `
                <img src ="" alt="cart">
                <span class ="text">${item.name}</span>`
                elementConfList.appendChild(li);
            }
        })
    })
    fieldElement(catId)
}

let confFields = document.querySelectorAll('.confidurElem');
console.log(confFields);

function fieldElement(dataId){
    confFields.forEach(element => {
        element.classList.remove('start');
        if (element.id == dataId){
            element.classList.add('start');
        }
    });
}
// new Sortable()
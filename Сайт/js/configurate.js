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
                li.addEventListener('click',() => changeCategory(component.id, component.name))
                componentsList.appendChild(li);
            });
        })
});
function changeCategory(catId, catName){
    fetch('../db/products.json')
    .then(response =>{
        return response.json();
    })
    .then(products =>{
        products.forEach(item => {
            if(catId === item.category_id){
                const elementConfList = document.querySelector('.elementConfList')
                const li = document.createElement('li');
                li.className = 'elementConf';
                li.innerHTML = `
                <div className= "cart"><img src ="" alt="cart"></div>
                <span className ="text">item.name</span>`
            }
        })
    })
}
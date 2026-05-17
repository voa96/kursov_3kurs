document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // Загружаем категории
    fetch('../db/categories.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки categories.json');
            return response.json();
        })
        .then(categories => {
            const componentsList = document.querySelector('.categories');
            if (!componentsList) {
                console.error('Элемент .categories не найден');
                return;
            }
            
            categories.forEach(component => {
                const li = document.createElement('li');
                li.className = 'component';
                li.textContent = component.name;
                li.setAttribute('data-id', component.id);
                li.addEventListener('click', () => {
                    changeCategory(component.id);
                });
                componentsList.appendChild(li);
            });
        })
        .catch(error => console.error('Ошибка:', error));
    
    // Обработчики кликов на слотах
    const fieldElements = document.querySelectorAll('.confidurElem');
    fieldElements.forEach(element => {
        element.addEventListener('click', function() {
            const catId = this.id;
            changeCategory(catId);
        });
    });
    
    // Инициализируем Sortable
    initSortable();
});

// Функция смены категории
function changeCategory(catId) {
    console.log('Смена категории:', catId);
    const elementConfList = document.querySelector('.elementConfList-ul');
    if (!elementConfList) {
        console.error('Элемент .elementConfList-ul не найден');
        return;
    }
    
    elementConfList.innerHTML = '';
    
    fetch('../db/products.json')
        .then(response => {
            if (!response.ok) throw new Error('Ошибка загрузки products.json');
            return response.json();
        })
        .then(products => {
            products.forEach(item => {
                if (catId == item.category_id) {
                    const li = document.createElement('li');
                    li.className = 'elementConf';
                    li.setAttribute('data-id', item.id);
                    li.setAttribute('data-category-id', item.category_id);
                    li.setAttribute('data-name', item.name);
                    li.setAttribute('data-price', item.price || 0);
                    li.setAttribute('data-image', item.image || '');
                    li.innerHTML = `
                        <div class="cart">
                            <img src="${item.image || ''}" alt="${item.name}" style="width: 40px; height: 40px; object-fit: contain;">
                            <span class="text">${item.name}</span>
                        </div>
                        <span class="price">${item.price || 0} ₽</span>
                    `;
                    elementConfList.appendChild(li);
                }
            });
            
            // Обновляем Sortable после добавления элементов
            updateSortable();
        })
        .catch(error => console.error('Ошибка:', error));
    
    fieldElement(catId);
}

// Подсветка выбранного слота
function fieldElement(dataId) {
    const confFields = document.querySelectorAll('.confidurElem');
    confFields.forEach(element => {
        element.classList.remove('start');
        if (element.id == dataId) {
            element.classList.add('start');
            setTimeout(() => {
                element.classList.remove('start');
            }, 1500);
        }
    });
}

// ========== НАСТРОЙКИ ДЛЯ КОРПУСА ==========
// Стандартная картинка корпуса
const defaultCaseImage = '../img/configBodyAfter.svg';

// Функция смены картинки корпуса
function changeCaseImage(imagePath) {
    const pcBody = document.querySelector('.pc_body');
    if (pcBody && imagePath) {
        pcBody.src = imagePath;
        console.log('Картинка корпуса изменена на:', imagePath);
    }
}

// Функция возврата стандартной картинки корпуса
function resetCaseImage() {
    const pcBody = document.querySelector('.pc_body');
    if (pcBody) {
        pcBody.src = defaultCaseImage;
        console.log('Картинка корпуса возвращена на стандартную');
    }
}

// ========== ФОНОВЫЕ КАРТИНКИ ДЛЯ СЛОТОВ ==========
const slotBackgrounds = {
    '1': '../img/components/cpu.png',
    '2': '../img/components/gpu.png',
    '3': '../img/components/mb.png',
    '4': '../img/components/ram.png',
    '5': '../img/components/ssd.png',
    '6': '../img/components/power.png',
    '7': '', // Корпус - фон не меняем
    '8': '../img/components/cooler.png'
};

// ========== SORTABLE.JS ==========
let sortableList = null;

function initSortable() {
    const elementConfList = document.querySelector('.elementConfList-ul');
    const targetContainers = document.querySelectorAll('.img_body .confidurElem');
    
    if (!elementConfList) {
        console.error('Контейнер .elementConfList-ul не найден');
        return;
    }
    
    if (targetContainers.length === 0) {
        console.error('Контейнеры .confidurElem не найдены');
        return;
    }
    
    console.log('Инициализация Sortable, найдено слотов:', targetContainers.length);
    
    // Sortable для левого списка
    sortableList = new Sortable(elementConfList, {
        group: {
            name: 'components',
            pull: 'clone',
            revertClone: false,
            sort: true
        },
        animation: 300,
        sort: true,
        draggable: '.elementConf',
        
        onEnd: function(evt) {
            console.log('Перетаскивание закончено');
        }
    });
    
    // Настраиваем каждый слот как получатель
    targetContainers.forEach(container => {
        new Sortable(container, {
            group: {
                name: 'components',
                pull: true,
                put: function(to, from, drag) {
                    const draggedCategory = drag.getAttribute('data-category-id');
                    const containerId = to.el.id;
                    const isValid = draggedCategory === containerId;
                    console.log('Проверка вставки:', draggedCategory, '->', containerId, isValid);
                    return isValid;
                }
            },
            animation: 300,
            sort: false,
            
            onAdd: function(evt) {
                console.log('onAdd сработал');
                const item = evt.item;
                const container = evt.to;
                const categoryId = item.getAttribute('data-category-id');
                const containerId = container.id;
                
                if (categoryId !== containerId) {
                    console.log('Неверный слот, удаляем');
                    item.remove();
                    alert('❌ Неверный слот для этого компонента!');
                    return false;
                }
                
                // Добавляем компонент в слот
                addComponentToSlot(container, item);
                // Удаляем перетаскиваемый элемент
                item.remove();
            },
            
            onRemove: function(evt) {
                console.log('onRemove сработал');
                const container = evt.from;
                // Удаляем компонент из слота
                removeComponentFromSlot(container);
            }
        });
    });
}

// Функция добавления компонента в слот
function addComponentToSlot(slot, component) {
    console.log('Добавление компонента в слот:', slot.id);
    
    const componentId = component.getAttribute('data-id');
    const componentName = component.getAttribute('data-name');
    const componentPrice = component.getAttribute('data-price');
    const componentImage = component.getAttribute('data-image');
    const categoryId = slot.id;
    
    // Проверяем, есть ли уже компонент в слоте
    if (slot.hasAttribute('data-component-id')) {
        console.log('Слот уже занят, заменяем');
    }
    
    // Скрываем choice (плюс)
    const choice = slot.querySelector('.choice');
    if (choice) {
        choice.style.opacity = '0';
        choice.style.pointerEvents = 'none';
    }
    
    // Добавляем класс has-component
    slot.classList.add('has-component');
    
    // ========== ОСОБАЯ ОБРАБОТКА ДЛЯ КОРПУСА (id = 7) ==========
    if (categoryId == 7) {
        if (componentImage && componentImage !== '') {
            changeCaseImage(componentImage);
        } else {
            changeCaseImage('../img/configBodyBefore.svg');
        }
    }
    
    // Меняем фоновую картинку слота
    if (slotBackgrounds[categoryId] && slotBackgrounds[categoryId] !== '') {
        slot.style.backgroundImage = `url('${slotBackgrounds[categoryId]}')`;
        slot.style.backgroundSize = 'contain';
        slot.style.backgroundRepeat = 'no-repeat';
        slot.style.backgroundPosition = 'center';
        slot.style.backgroundColor = 'rgba(14, 20, 29, 0.5)';
    }
    
    // Сохраняем данные компонента в слот
    slot.setAttribute('data-component-id', componentId);
    slot.setAttribute('data-component-name', componentName);
    slot.setAttribute('data-component-price', componentPrice);
    slot.setAttribute('data-component-image', componentImage);
    
    // Добавляем кнопку удаления
    addRemoveButtonToSlot(slot);
    
    // Обновляем цену
    updateTotalPrice();
    
    console.log('Компонент добавлен:', componentName);
}

// Функция добавления кнопки удаления
function addRemoveButtonToSlot(slot) {
    // Удаляем старую кнопку
    const oldButton = slot.querySelector('.remove-component');
    if (oldButton) oldButton.remove();
    
    // Создаём кнопку
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-component';
    removeBtn.innerHTML = '✖';
    removeBtn.title = 'Удалить';
    removeBtn.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
    `;
    
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Удаление компонента из слота:', slot.id);
        removeComponentFromSlot(slot);
    });
    
    slot.appendChild(removeBtn);
}

// Функция удаления компонента из слота
function removeComponentFromSlot(slot) {
    console.log('Удаление компонента из слота:', slot.id);
    
    const categoryId = slot.id;
    
    // ========== ДЛЯ КОРПУСА ВОЗВРАЩАЕМ СТАНДАРТНУЮ КАРТИНКУ ==========
    if (categoryId == 7) {
        resetCaseImage();
    }
    
    // Очищаем фон слота
    slot.style.backgroundImage = '';
    slot.style.backgroundColor = 'rgba(14, 20, 29, 0.3)';
    
    // Убираем класс has-component
    slot.classList.remove('has-component');
    
    // Показываем choice обратно
    const choice = slot.querySelector('.choice');
    if (choice) {
        choice.style.opacity = '1';
        choice.style.pointerEvents = 'auto';
    }
    
    // Удаляем кнопку удаления
    const removeBtn = slot.querySelector('.remove-component');
    if (removeBtn) removeBtn.remove();
    
    // Очищаем данные слота
    slot.removeAttribute('data-component-id');
    slot.removeAttribute('data-component-name');
    slot.removeAttribute('data-component-price');
    slot.removeAttribute('data-component-image');
    
    // Обновляем цену
    updateTotalPrice();
    
}

// Функция обновления итоговой цены
function updateTotalPrice() {
    let total = 0;
    
    const slots = document.querySelectorAll('.img_body .confidurElem');
    slots.forEach(slot => {
        const price = slot.getAttribute('data-component-price');
        if (price) {
            total += parseInt(price) || 0;
        }
    });
    
    const resultPrice = document.querySelector('.result_price');
    if (resultPrice) {
        resultPrice.textContent = total.toLocaleString() + ' ₽';
    }
    
    console.log('Общая цена:', total);
}

// Обновление Sortable
function updateSortable() {
    if (sortableList) {
        sortableList.destroy();
    }
    initSortable();
}
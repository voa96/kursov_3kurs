const { sequelize } = require('./init_db');
const { defineModel } = require('./addTable');

async function seedDatabase() {
    try {
        const { User, Categories, Products, Orders, Order_items } = defineModel(sequelize);
        
        
        const users = await User.bulkCreate([
            {
                name: 'Мавид',
                email: 'mavidLisii@mail.ru',
                phone: '+7 800 555-35-35',
            },
            {
                name: 'Антон',
                email: 'anton@mail.ru',
                phone: '+7 900 444-12-21',
            },
            {
                name: 'Виталий',
                email: 'vitaliy@gmail.com',
                phone: '+7 905 900-18-50',
            },
            {
                name: 'Милана',
                email: 'milana@mail.ru',
                phone: '+7 905 545-18-20',
            },
            {
                name: 'Сергей Петров',
                email: 'sergey.petrov@yandex.ru',
                phone: '+7 977 949-09-53',
            }
        ]);
        
        
        const categories = await Categories.bulkCreate([
            { name: 'Процессоры' },
            { name: 'Видеокарты' },
            { name: 'Материнские платы' },
            { name: 'Оперативная память' },
            { name: 'SSD накопители' },
            { name: 'Блоки питания' },
            { name: 'Корпуса' },
            { name: 'Кулеры для процессора' },
            { name: 'Корпусные вентиляторы' },
        ]);

        
        const cat = {};
        categories.forEach(c => {
            cat[c.name] = c.id;
        });
        
        // ==================== 3. ЗАПОЛНЯЕМ ПРОДУКТЫ (5 записей) ====================
        
        const products = await Products.bulkCreate([
                        {
                name: 'AMD Ryzen 5 5600X',
                price: 16800,
                old_price: 14000,
                stock: 8,
                category_id: cat['Процессоры'],
                description: '6 ядер / 12 потоков, 3.7 ГГц, сокет AM4, 32 МБ L3'
            },
            {
                name: 'AMD Ryzen 7 5700X',
                price: 18000,
                old_price: 15000,
                stock: 5,
                category_id: cat['Процессоры'],
                description: '8 ядер / 16 потоков, 3.4 ГГц, сокет AM4, 32 МБ L3'
            },
            {
                name: 'AMD Ryzen 9 7950X',
                price: 66000,
                old_price: 55000,
                stock: 3,
                category_id: cat['Процессоры'],
                description: '16 ядер / 32 потока, 4.5 ГГц, сокет AM5, 64 МБ L3'
            },
            {
                name: 'Intel Core i5-13600K',
                price: 30000,
                old_price: 25000,
                stock: 6,
                category_id: cat['Процессоры'],
                description: '14 ядер / 20 потоков, 3.5 ГГц, сокет LGA1700'
            },
            {
                name: 'Intel Core i9-13900K',
                price: 72000,
                old_price: 60000,
                stock: 2,
                category_id: cat['Процессоры'],
                description: '24 ядра / 32 потока, 3.0 ГГц, сокет LGA1700'
            },
            
            // ---------- Видеокарты (5 шт) ----------
            {
                name: 'NVIDIA GeForce RTX 3060',
                price: 30000,
                old_price: 25000,
                stock: 4,
                category_id: cat['Видеокарты'],
                description: '12GB GDDR6, DLSS, Ray Tracing'
            },
            {
                name: 'NVIDIA GeForce RTX 4070 Ti',
                price: 102000,
                old_price: 85000,
                stock: 5,
                category_id: cat['Видеокарты'],
                description: '12GB GDDR6X, 7680 ядер CUDA, DLSS 3'
            },
            {
                name: 'NVIDIA GeForce RTX 4090',
                price: 240000,
                old_price: 200000,
                stock: 2,
                category_id: cat['Видеокарты'],
                description: '24GB GDDR6X, 16384 ядер CUDA, для 4K'
            },
            {
                name: 'AMD Radeon RX 7900 XTX',
                price: 120000,
                old_price: 100000,
                stock: 3,
                category_id: cat['Видеокарты'],
                description: '24GB GDDR6, поддержка FSR 3'
            },
            {
                name: 'AMD Radeon RX 6700 XT',
                price: 42000,
                old_price: 35000,
                stock: 7,
                category_id: cat['Видеокарты'],
                description: '12GB GDDR6, отличный выбор для 1440p'
            },
            
            // ---------- Материнские платы (4 шт) ----------
            {
                name: 'MSI B650 GAMING PLUS WIFI',
                price: 22800,
                old_price: 19000,
                stock: 4,
                category_id: cat['Материнские платы'],
                description: 'Socket AM5, DDR5, PCIe 4.0, Wi-Fi 6E'
            },
            {
                name: 'ASUS ROG STRIX Z790-E',
                price: 48000,
                old_price: 40000,
                stock: 3,
                category_id: cat['Материнские платы'],
                description: 'Socket LGA1700, DDR5, PCIe 5.0, Wi-Fi 6E'
            },
            {
                name: 'Gigabyte B760M DS3H',
                price: 12000,
                old_price: 10000,
                stock: 6,
                category_id: cat['Материнские платы'],
                description: 'Socket LGA1700, DDR4, mATX, бюджетный вариант'
            },
            {
                name: 'ASRock X670E Taichi',
                price: 66000,
                old_price: 55000,
                stock: 1,
                category_id: cat['Материнские платы'],
                description: 'Socket AM5, DDR5, PCIe 5.0, топовая модель'
            },
            
            // ---------- Оперативная память (4 шт) ----------
            {
                name: 'Kingston Fury DDR5 32GB',
                price: 14400,
                old_price: 12000,
                stock: 8,
                category_id: cat['Оперативная память'],
                description: '32GB (2x16GB), DDR5, 5600MHz, CL36'
            },
            {
                name: 'Corsair Vengeance DDR4 16GB',
                price: 4800,
                old_price: 4000,
                stock: 12,
                category_id: cat['Оперативная память'],
                description: '16GB (2x8GB), DDR4, 3200MHz, CL16'
            },
            {
                name: 'G.Skill Trident Z5 RGB DDR5 64GB',
                price: 28800,
                old_price: 24000,
                stock: 2,
                category_id: cat['Оперативная память'],
                description: '64GB (2x32GB), DDR5, 6000MHz, CL30, RGB'
            },
            {
                name: 'Samsung DDR4 8GB',
                price: 2400,
                old_price: 2000,
                stock: 20,
                category_id: cat['Оперативная память'],
                description: '8GB, DDR4, 2666MHz, бюджетный вариант'
            },
            
            // ---------- SSD накопители (4 шт) ----------
            {
                name: 'Samsung 980 Pro 1TB NVMe',
                price: 18000,
                old_price: 15000,
                stock: 7,
                category_id: cat['SSD накопители'],
                description: '1TB, PCIe 4.0, чтение 7000 МБ/с'
            },
            {
                name: 'WD Blue SN570 500GB',
                price: 5400,
                old_price: 4500,
                stock: 10,
                category_id: cat['SSD накопители'],
                description: '500GB, PCIe 3.0, чтение 3500 МБ/с'
            },
            {
                name: 'Kingston KC3000 2TB',
                price: 21600,
                old_price: 18000,
                stock: 3,
                category_id: cat['SSD накопители'],
                description: '2TB, PCIe 4.0, чтение 7000 МБ/с'
            },
            {
                name: 'Crucial P3 Plus 1TB',
                price: 8400,
                old_price: 7000,
                stock: 5,
                category_id: cat['SSD накопители'],
                description: '1TB, PCIe 4.0, чтение 5000 МБ/с'
            },
            
            // ---------- Блоки питания (3 шт) ----------
            {
                name: 'Corsair RM750x',
                price: 14400,
                old_price: 12000,
                stock: 6,
                category_id: cat['Блоки питания'],
                description: '750W, 80+ Gold, полностью модульный'
            },
            {
                name: 'Seasonic Focus GX-850',
                price: 18000,
                old_price: 15000,
                stock: 4,
                category_id: cat['Блоки питания'],
                description: '850W, 80+ Gold, компактный дизайн'
            },
            {
                name: 'Chieftec Proton 650W',
                price: 5400,
                old_price: 4500,
                stock: 10,
                category_id: cat['Блоки питания'],
                description: '650W, 80+ Bronze, бюджетный вариант'
            },
            
            // ---------- Корпуса (3 шт) ----------
            {
                name: 'Fractal Design Meshify C',
                price: 10200,
                old_price: 8500,
                stock: 4,
                category_id: cat['Корпуса'],
                description: 'ATX, tempered glass, отличная вентиляция'
            },
            {
                name: 'NZXT H510 Flow',
                price: 10800,
                old_price: 9000,
                stock: 5,
                category_id: cat['Корпуса'],
                description: 'ATX, минималистичный дизайн, сетчатая панель'
            },
            {
                name: 'Deepcool CC560',
                price: 5400,
                old_price: 4500,
                stock: 8,
                category_id: cat['Корпуса'],
                description: 'ATX, 4 предустановленных вентилятора'
            },
            
            // ---------- Кулеры для процессора (3 шт) ----------
            {
                name: 'Deepcool AK620',
                price: 5400,
                old_price: 4500,
                stock: 6,
                category_id: cat['Кулеры для процессора'],
                description: 'Двухбашенный, 120мм вентиляторы, TDP 260W'
            },
            {
                name: 'Noctua NH-D15',
                price: 10800,
                old_price: 9000,
                stock: 4,
                category_id: cat['Кулеры для процессора'],
                description: 'Топовый воздушный кулер, два вентилятора 140мм'
            },
            {
                name: 'Cooler Master Hyper 212 Spectrum',
                price: 4200,
                old_price: 3500,
                stock: 7,
                category_id: cat['Кулеры для процессора'],
                description: 'Классический башенный кулер, RGB вентилятор'
            },
            
            // ---------- Корпусные вентиляторы (3 шт) ----------
            {
                name: 'Noctua NF-A12x25 PWM',
                price: 4200,
                old_price: 3500,
                stock: 10,
                category_id: cat['Корпусные вентиляторы'],
                description: '120мм, высокое давление, бесшумный'
            },
            {
                name: 'ARCTIC P12 PWM PST',
                price: 1200,
                old_price: 1000,
                stock: 15,
                category_id: cat['Корпусные вентиляторы'],
                description: '120мм, отличное соотношение цена/качество'
            },
            {
                name: 'Corsair LL120 RGB',
                price: 4200,
                old_price: 3500,
                stock: 8,
                category_id: cat['Корпусные вентиляторы'],
                description: '120мм, 16 RGB светодиодов, очень тихий'
            }
        ]);
        
        const prod = {};
        products.forEach(p => {
            prod[p.name] = p.id;
        });
        
        const orders = await Orders.bulkCreate([
            {
                status: 'новый заказ',
                total_amount: 0, // будет рассчитано позже
                delivery_addres: 'г. Москва, ул. Тверская, д.15, кв.45',
                phone: '+7 800 555-35-35',
                comment: 'Позвонить за 30 минут до доставки',
                user_id: users[0].id
            },
            {
                status: 'обработан',
                total_amount: 0,
                delivery_addres: 'г. Санкт-Петербург, Невский пр-т, д.25, кв.12',
                phone: '+7 900 444-12-21',
                comment: 'Оставить у двери',
                user_id: users[1].id
            },
            {
                status: 'доставлен',
                total_amount: 0,
                delivery_addres: 'г. Новосибирск, ул. Ленина, д.50, кв.8',
                phone: '+7 905 900-18-50',
                comment: 'Оплата наличными',
                user_id: users[2].id
            },
            {
                status: 'отменен',
                total_amount: 0,
                delivery_addres: 'г. Екатеринбург, ул. Малышева, д.30, кв.67',
                phone: '+7 905 545-18-20',
                comment: 'Передумал, отмена заказа',
                user_id: users[3].id
            },
            {
                status: 'новый заказ',
                total_amount: 0,
                delivery_addres: 'г. Казань, ул. Баумана, д.10, кв.23',
                phone: '+7 977 949-09-53',
                comment: 'Домофон не работает, звоните в домофон 23',
                user_id: users[4].id
            },
        ]);
        
        const orderItems = await Order_items.bulkCreate([
            {
                quantity: 1,
                price: products[0].price, 
                order_id: orders[0].id,
                product_id: products[0].id
            },

            {
                quantity: 1,
                price: products[1].price, 
                order_id: orders[1].id,
                product_id: products[1].id
            },
            {
                quantity: 2,
                price: products[3].price, 
                order_id: orders[1].id,
                product_id: products[3].id
            },

            {
                quantity: 1,
                price: products[2].price, 
                order_id: orders[2].id,
                product_id: products[2].id
            },
            {
                quantity: 1,
                price: products[4].price, 
                order_id: orders[2].id,
                product_id: products[4].id
            },

            {
                quantity: 1,
                price: products[0].price, 
                order_id: orders[3].id,
                product_id: products[0].id
            },

            {
                quantity: 1,
                price: products[1].price,
                order_id: orders[4].id,
                product_id: products[1].id
            },
            {
                quantity: 1,
                price: products[2].price,
                order_id: orders[4].id,
                product_id: products[2].id
            },
            {
                quantity: 2,
                price: products[4].price, 
                order_id: orders[4].id,
                product_id: products[4].id
            },
        ]);
        
        for (const order of orders) {
            const items = await Order_items.findAll({
                where: { order_id: order.id }
            });

            let total = 0;
            for (const item of items) {
                total += item.quantity * item.price;
            }
            
            await order.update({ total_amount: total });
        }

        const usersCount = await User.count();
        const categoriesCount = await Categories.count();
        const productsCount = await Products.count();
        const ordersCount = await Orders.count();
        const orderItemsCount = await Order_items.count();

        return {
            users,
            categories,
            products,
            orders,
            orderItems
        };
        
    } catch (error) {
        console.error('Ошибка при заполнении базы данных:', error);
        throw error;
    }
}

module.exports = {
    seedDatabase
};
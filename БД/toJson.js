// convert-sqlite-to-json.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./database/компьютернаяТехника.sqlite');

function CatToJson(){
    db.all('SELECT * FROM Categories', (err, rows) => {
        if (err) {
            console.error('Ошибка', err);
            db.close();
            return;
        }
        
        if (rows.length === 0) {
            console.log('пуста');
            db.close();
            return;
        }

        fs.writeFileSync('../Сайт/db/categories.json', JSON.stringify(rows, null, 2));
        
        db.close();
    });
}

function ProdToJson(){
    db.all('SELECT * FROM Products', (err, rows) => {
        if (err) {
            console.error('Ошибка', err);
            db.close();
            return;
        }
        
        if (rows.length === 0) {
            console.log('пуста');
            db.close();
            return;
        }

        fs.writeFileSync('../Сайт/db/products.json', JSON.stringify(rows, null, 2));
        
        db.close();
    });
}
CatToJson()
ProdToJson()

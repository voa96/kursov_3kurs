const output = document.querySelector('.output')
const axi = axios.create({
    baseURL: "http://localhost:3000/"
});
async function all(){
    const { data } = await axi.get('/api/users');
    console.log(data)
    return data
};
async function byId(id) {
    const { data } = await axi.get(`/api/users/${id}`);
    return data
}
const getall = document.querySelector(".get")
const getById = document.querySelector(".element_by_id")
getById.addEventListener('click', async function() {
    const area = document.querySelector('.user_id');
    const textId = area.value;
        const user = await byId(textId);
        console.log("Пользователь успешно получен:", user);
        output.innerHTML = `<p>${user.id}</p>
        <p>${user.name}</p>
        <p>${user.email}</p>`

});
getall.addEventListener('click', async function al(){
    output.innerHTML = ''
    const data = await all();
    for (let i = 0; i < data.length; i++) {
        const user = data[i];
        const eleme = document.createElement('div')
        eleme.innerHTML = `<p>${user.id}</p>
        <p>${user.name}</p>
        <p>${user.email}</p>
        <hr>`
        output.appendChild(eleme)
    }
})
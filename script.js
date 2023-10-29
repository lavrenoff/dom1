const data = [
    {
        id: 1,
        namelesson: 'Фигурное катание',
        time: '9.00 - 11.00',
        maxNumber: 10,
        currentNumber: 10
    },
    {
        id: 2,
        namelesson: 'Хоккей',
        time: '10.00 - 12.00',
        maxNumber: 20,
        currentNumber: 19
    },
    {
        id: 3,
        namelesson: 'Футбол',
        time: '9.00 - 10.30',
        maxNumber: 40,
        currentNumber: 10
    },
    {
        id: 4,
        namelesson: 'Баскетбол',
        time: '12.00 - 14.00',
        maxNumber: 8,
        currentNumber: 5
    },
]


function dataList(db) {
    const info = document.querySelector('.main__info');
    db.forEach(item => {
        info.insertAdjacentHTML('beforeend', `
        <div class='main__item_box'>
        <p>${item.namelesson}</p>
        <p>${item.time}</p>       
        <p>Максимальное число участников: ${item.maxNumber}</p>
        <p>Забронированное число участников: <span data-id='${item.id}'>${item.currentNumber}</span></p>
        <div class='main__buttons'>
        <button class='btn' id='${item.id}'>Записаться</button>
        <button class='btn-cancel disabled ' data-id='${item.namelesson}'>Отменить запись</button>
        </div>
        </div>        
        `);

        if (item.maxNumber <= item.currentNumber) {
            const btn = document.getElementById(`${item.id}`);
            btn.classList.add('disabled');
        }
    })
}

dataList(data);

const info = document.querySelector('.main__info');

info.addEventListener('click', event => {
    if (event.target.classList.contains('btn')) {
        data[event.target.id - 1].currentNumber = data[event.target.id - 1].currentNumber + 1;
        const currentNumber = document.querySelector(`[data-id='${event.target.id}']`);
        currentNumber.textContent = data[event.target.id - 1].currentNumber;

        const btndisabled = document.getElementById(`${event.target.id}`);
        btndisabled.classList.add('disabled');
        btndisabled.nextElementSibling.classList.remove('disabled');
    }
    if (event.target.classList.contains('btn-cancel')) {
        const id = data.filter(item => item.namelesson === event.target.dataset.id);
        const index = id[0].id;

        data[index - 1].currentNumber = data[index - 1].currentNumber - 1;
        const currentNumber = document.querySelector(`[data-id='${index}']`);
        currentNumber.textContent = data[index - 1].currentNumber;

        const btndisabled = document.getElementById(`${index}`);
        btndisabled.classList.remove('disabled');
        btndisabled.nextElementSibling.classList.add('disabled');
    }
});










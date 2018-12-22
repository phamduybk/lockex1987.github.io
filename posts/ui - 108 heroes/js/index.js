var html = `
    ${heroes.map((h) =>
        `
        <div class="card m-2">
            <img class="card-img-top" src="images/${h.image}" title="${h.image}"/>
            <div class="card-body">
                <div class="card-title text-success">${h.rank}: ${h.nameVietnamese}</div>
                <div class="card-subtitle text-info">${h.nicknameVietnamese}</div>
                <p class="card-text">${h.nickname}</p>
            </div>
        </div>
        `
    ).join('')}
    `;

document.querySelector('#gallery').innerHTML = html;

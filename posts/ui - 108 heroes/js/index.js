/*

<!--tr>
                        <th>Rank</th>
                        <th>Sao</th>
                        <th>Hiệu</th>
                        <th>Tên</th>
                        <th>Chức vụ</th>
                        <th>Star</th>
                        <th>Name</th>
                        <th>Nickname</th>
                        <th>Other names</th>
                        <th>Division</th>
                        <th>Designation</th>
                        <th>Origin</th>
                        <th>Ancestral home / Place of origin</th>
                        <th>Weapon</th>
                    </tr-->


        <tr>
            <td>${h.rank}</td>
            <td>${h.starVietnamese}</td>
            <td>${h.nicknameVietnamese}</td>
            <td>${h.nameVietnamese}</td>
            <td>${h.designationVietnamese}</td>
            <td>${h.star}</td>
            <td>${h.name}</td>
            <td>${h.nickname}</td>
            <td>${h.otherNames}</td>
            <td>${h.division}</td>
            <td>${h.designation}</td>
            <td>${h.origin}</td>
            <td>${h.homePlace}</td>
            <td>${h.weapon}</td>
        </tr>
*/
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

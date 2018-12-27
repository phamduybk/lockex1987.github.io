// https://vi.wikipedia.org/wiki/Danh_s%C3%A1ch_th%E1%BB%A7_l%C4%A9nh_L%C6%B0%C6%A1ng_S%C6%A1n_B%E1%BA%A1c
// https://en.wikipedia.org/wiki/108_Stars_of_Destiny

//var a = document.querySelectorAll('#tab3 tr');
var a = document.querySelectorAll('#tab4 tr');

for (var i = 1; i < a.length; i++) {
    var tr = a[i];
    //console.log(tr);

    var cells = tr.querySelectorAll('td');
    var rank = cells[0].innerHTML;
    // 1: Rank 2
    var star = cells[2].innerHTML;
    var name = cells[3].innerHTML;
    var nickname = cells[4].innerHTML;
    var otherNames = cells[5].innerHTML;
    var division = cells[6].innerHTML;
    var designation = cells[7].innerHTML;
    var origin = cells[8].innerHTML;
    var homePlace = cells[9].innerHTML;
    // 10: Chapter of first appearance
    var weapon = cells[11].innerHTML;

    var hero = {
        rank,
        star,
        name,
        nickname,
        otherNames,
        division,
        designation,
        origin,
        homePlace,
        weapon
    }
    console.log(JSON.stringify(hero) + ',');
}

//var a = document.querySelectorAll('#tab1 tr');
var a = document.querySelectorAll('#tab2 tr');

for (var i = 1; i < a.length; i++) {
    var tr = a[i];
    var cells = tr.querySelectorAll('td');
    var rank = cells[0].innerHTML;
    var starVietnamese = cells[1].innerHTML;
    var nicknameVietnamese = cells[2].innerHTML;
    var nameVietnamese = cells[3].innerHTML;
    var designationVietnamese = (cells.length > 4) ? cells[4].innerHTML : '';

    var hero = {
        rank,
        starVietnamese,
        nicknameVietnamese,
        nameVietnamese,
        designationVietnamese
    }
    console.log(JSON.stringify(hero) + ',');
}


for (var i = 0; i < heroes.length; i++) {
    var hero = heroes[i];
    var vietnamese = heroesVietnamese[i];
    var img = images[i];
    
    hero.starVietnamese = vietnamese.starVietnamese;
    hero.nicknameVietnamese = vietnamese.nicknameVietnamese;
    hero.nameVietnamese = vietnamese.nameVietnamese;
    hero.designationVietnamese = vietnamese.designationVietnamese;
    hero.image = img;

    console.log(JSON.stringify(hero) + ',');
}


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

heroes.forEach(hero => console.log(JSON.stringify({
    "rank": hero.rank,
    "nameVietnamese": hero.nameVietnamese,
    "nicknameVietnamese": hero.nicknameVietnamese,
    "nickname": hero.nickname,
    "image": hero.image

}, null, 2) + ','));
// Map giữa mã người và đối tượng người,
// để sau này truy cập cho nhanh
// đỡ phải viết hàm getPersonByCode
var personMap = {};

people.forEach(function(person) {
    personMap[person.code] = person;
});

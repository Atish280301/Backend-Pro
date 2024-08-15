const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const users = data.users;

exports.createUser = (req, res) => {
    console.log(req.body);
    users.push(req.body);
    res.json(req.body);
}
exports.getUsers = (req, res) => {
    res.json(users);
}
exports.getUser = (req, res) => {
    console.log(req.params.id);
    const id = +req.params.id;
    const prd = users.find(p=>p.id === id);
    res.json(prd);
}
exports.replaceUser = (req, res) => {
    const id = +req.params.id;
    const prdIndex = users.findIndex(p=>p.id === id)
    users.splice(prdIndex,1,{...req.body, id:id})
    res.status(201).json({product:"Product Updated"});
}
exports.updateUser = (req, res) => {
    const id = +req.params.id;
    const prdIndex = users.findIndex(p=>p.id === id)
    const prd1 = users[prdIndex];
    users.splice(prdIndex,1,{...prd1,...req.body})
    res.status(201).json({product:"Product Updated"});
}
exports.deleteUser = (req, res) => {
    const id = +req.params.id;
    const prdIndex = users.findIndex(p=>p.id === id);
    const prd1 = users[prdIndex];
    users.splice(prdIndex,1)
    res.status(201).json({product:prd1});
}
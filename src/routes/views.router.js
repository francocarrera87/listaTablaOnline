const {Router} = require('express');
const ItemsManager = require('../ItemsManager');

const manager = new ItemsManager(__dirname+'/../files/items.json')

const router = Router();

router.get('/',async (req, res)=>{
    const items = await manager.getItems()
    res.render('home',{items:items})
})


module.exports = router; 
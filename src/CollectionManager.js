const fs = require('fs');

class CollectionManager {
    static id = 0; 

    constructor(path){
        this.path = path; 
        fs.writeFileSync(path, '[]')
    }

    async addCollection(){
        
        const content = await  fs.promises.readFile(this.path, 'utf-8'); //leemos archivo
        const collections = JSON.parse(content); //convertimos archivo en objeto javascript 

        const collection = {id: ++CollectionManager.id, items: []}

        collections.push(collection); //agregamos collection, argumento de la función 

        //antes de guardar el array hacemos JSON.stringify para convertir nuestro objeto en JSON 
        await fs.promises.writeFile(this.path, JSON.stringify(collections,null, '\t')); //escribimos el archivo
    }

    async getCollection(id){
        const content = await  fs.promises.readFile(this.path, 'utf-8'); //leemos archivo
        const collections = JSON.parse(content); //convertimos archivo en objeto javascript 

        const collection = collections.find(i=>i.id == id) //buscamos un item con ese mismo id 

        return collection; 
    }

    async addItem(id, itemId){
        const content = await fs.promises.readFile(this.path, 'utf-8');
        const collections = JSON.parse(content);

        const col_index = collections.findIndex(i => i.id == id);
        const collection = { ...collections[col_index] };

        const index = collection.items.findIndex(i => i.item == itemId);
        if (index >= 0) {
            collection.items[index].quantity += 1;
        } else {
            collection.items.push({ item: itemId, quantity: 1 });
        }

        collections[col_index] = collection; 
        await fs.promises.writeFile(this.path, JSON.stringify(collections, null, '\t'));
    }
}



module.exports = CollectionManager; 
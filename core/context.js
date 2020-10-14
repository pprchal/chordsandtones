class Context
{
    constructor(){
        this.beans = new Map();
        this.beans['A', 'Ahoj'];
        this.beans['B', 'Bhoj'];
        this.protos = [];
    }

    getBean(beanName){
        return this.beans[beanName];
    }

    register(beanType){
        console.log(beanType);
        this.protos.push(beanType);
    }
}

function createContext(){
    return new Context();
}


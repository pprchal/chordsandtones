class Container
{
    constructor(){
        this.beans = new Map();
    }

    getBean(beanName){
        return this.beans[beanName];
    }

    addBean(beanName, bean){
        this.beans[beanName] = bean;
    }

    register(beanType){
        console.log(beanType);
        // this.protos.push(beanType);
    }
}


function createContainer(){
    let c = new Container();
    // c.beans['x'] = this;
    return c;
}


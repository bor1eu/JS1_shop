//ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
let PRICES = [100, 120, 1000, 15, 18]
let IDS = [0, 1, 2, 3, 4]

let catalog = {
    items: [],
    container: '.catalog',
    construct () {
        this._init () //_ - это обозначение инкапсулированного метода
    },
    _init () {
        this._handleData ()
        this.render ()
    },
    _handleData () {
        for (let i = 0; i < IDS.length; i++) {
            this.items.push (this._createNewProduct (i))
        }
    },
    _createNewProduct (index) {
        return {
            product_name: PRODUCTS_NAMES [index],
            price: PRICES [index],
            product_id: IDS [index]
        }
    },
    render () {
        let str = ''
        this.items.forEach (item => {
            str += `
                <div class="catalog-product">
                    <img src="https://placehold.it/300x200" class="catalog-product-img" alt="Photo" width="300" height="200">
                    <span class="catalog-product-title">${item.product_name}</span>
                    <span class="catalog-product-price">${item.price}</span>
                    <button class="catalog-product-btn" onclick="cart.addProduct (${item.product_id})">Купить</button>
                </div>
            `
        })
        document.querySelector(this.container).innerHTML = str
    }
}

let cart = {
    items: [],
    total: 0,
    sum: 0,
    container: ".cart",
    addProduct (product) {
        let id = product
        //нарушение инкапсуляции (Вообще так не делаем, но пока делаем)
        let prod = catalog._createNewProduct (product)
        
        let find = this.items.find (product => product.product_id === id)
        if (find) {
            find.quantity++
        } else {
            prod.quantity = 1
            this.items.push (prod)
        }
        this.calculateSum ()
        this._checkTotal ()
        // cart.items.push (Object.assign ({}, find, {quantity: 1}))
    },
    deleteProduct (product) {
        if (this.items[product].quantity > 1) {
            --this.items[product].quantity
        } else {
            this.items.splice(product, 1)
        }
        this.calculateSum ()
        this._checkTotal ()
        this.showCart ()
        return false
    },
    calculateSum () {
        let result = 0
        this.items.forEach (el => {
            result += el.price * el.quantity
        })
        this.sum = result
        return false
    },
    _checkTotal () {
        let result = 0
        this.items.forEach (el => {
            result += el.quantity
        })
        this.total = result
    },
    showCart () {
        let str = ""
        this.items.forEach (item => {
            str += `
                <div class="cart-item">
                    <img src="https://placehold.it/300x200" class="cart-item-img" alt="Photo" width="30" height="20">
                    <span class="cart-item-title">${item.product_name}</span>
                    <span class="cart-item-price">${item.price}</span>
                    <span class="cart-item-quantity">${item.quantity}</span>
                    <button class="cart-item-remove-btn" onclick="cart.deleteProduct (${item.product_id})">Удалить</button>
                </div>
            `
        })
        str += `
        <span class="cart-total">Итого: ${this.sum}</span>
        <button class="cart-hide-btn" onClick="cart.hideCart ()">Скрыть корзину</button>
        `
        document.querySelector(this.container).innerHTML = str
    },
    hideCart () {
        document.querySelector(this.container).innerHTML = ""
    }
}
catalog.construct ()
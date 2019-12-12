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
    _createHTML (item) {
        return `
        <div class="catalog-product">
            <img src="https://placehold.it/300x200" class="catalog-product-img" alt="Photo" width="300" height="200">
            <span class="catalog-product-title">${item.product_name}</span>
            <span class="catalog-product-price">$ ${item.price}</span>
            <button class="catalog-product-btn" onclick="cart.productCount (${item.product_id},1)">buy</button>
        </div>
        `
    },
    render () {
        let str = ''
        this.items.forEach (item => {
            str += catalog._createHTML (item)
        })
        document.querySelector(this.container).innerHTML = str
    }
}

let cart = {
    items: [],
    total: 0,
    sum: 0,
    container: ".cart",
    chkbox: "cartIsVisible",
    _init () {
        strTotal = `
        <span class="cart-total-text">Пусто</span>
        `
        document.querySelector(this.container + '-total').innerHTML = strTotal
    },
    _createNewProduct (index) {
        return {
            product_name: PRODUCTS_NAMES [index],
            price: PRICES [index],
            product_id: IDS [index]
        }
    },
    _createHTML (item) {
        return `
            <div class="cart-item">
                <img src="https://placehold.it/300x200" class="cart-item-img" alt="Photo" width="45" height="30">
                <span class="cart-item-title">${item.product_name}</span>
                <span class="cart-item-price">$ ${item.price}</span>
                <button class="cart-item-adjust-btn" onclick="cart.productCount (${item.product_id}, -1)">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="cart-item-adjust-btn" onclick="cart.productCount (${item.product_id}, 1)">+</button>
            </div>
        `
    },
    productCount (product, step) {
        let id = product
        let prod = this._createNewProduct (product)
        let strNew = ``
        let strOld = ``
        let el = document.querySelector(this.container + '-products')
        
        let find = this.items.find (product => product.product_id === id)
        if (find && (find.quantity + step > 0)) {
            strOld = this._createHTML (find)
            find.quantity+=step
            strNew = this._createHTML (find)
            el.innerHTML = el.innerHTML.replace (strOld, strNew)
        } else if (find && (find.quantity + step === 0)) {
            strOld = this._createHTML (find)
            el.innerHTML = el.innerHTML.replace (strOld, ``)
            this.items.splice(this.items.indexOf(find), 1)
        } else {
            prod.quantity = 1
            this.items.push (prod)
            strNew = this._createHTML (prod)
            el.insertAdjacentHTML ('beforeend', strNew)
        }
        this.calculateSum ()
        this._checkTotal ()
        // cart.items.push (Object.assign ({}, find, {quantity: 1}))
    },
    calculateSum () {
        let result = 0
        let strTotal;
        if (this.items.length !== 0) {
            this.items.forEach (el => {
                result += el.price * el.quantity
            })
            this.sum = result
            strTotal = `
                <span class="cart-total-text">Итого:</span><span class="cart-total-price">$ ${this.sum}</span>
            `
        } else {
            strTotal = `
                <span class="cart-total-text">Пусто</span>
            `
        }
        document.querySelector(this.container + '-total').innerHTML = strTotal
        return false
    },
    _checkTotal () {
        let result = 0
        this.items.forEach (el => {
            result += el.quantity
        })
        this.total = result
    },
    toggleCart () {
        let el = document.getElementById(this.chkbox)
        el.checked = !el.checked
    }
}

catalog.construct ()
cart._init ()
import $ from 'jquery';
class Basket {

    constructor() {
        // create a cart object
        this.basket = {
            items: [
                {
                    id: "1",
                    name: 'Cotton T-Shirt, Medium',
                    price: "1.99",
                    quantity: "1"
                },
                {
                    id: "2",
                    name: 'Baseball Cap, One Size',
                    price: "2.99",
                    quantity: "1"
                },
                {
                    id: "3",
                    name: 'Swim Shorts, Medium',
                    price: "3.99",
                    quantity: "1"
                },
                {
                    id: "4",
                    name: 'Sports Swimming Goggle',
                    price: "2.49",
                    quantity: "1"
                }
            ],
            subtotal: "",
            vat: "",
            totalcost: "",
        };
        
        this.renderCart();
        this.calcTotal();
        this.checkCartLength();

        $(document)
            .on('click', '[data-quantity="plus"]', this.incrementValue)
            .on('click', '[data-quantity="minus"]', this.decrementValue)
            .on('keyup', '[data-quantity="field"]', this.inputKeyPressCheck)
            .on('click', '[data-delete]', this.deleteItem)
            .on('click', '[data-submit]', this.submitCart);
        
    }


    incrementValue(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        const fieldName = $(this).attr('data-field');
        // Get its current value
        const currentVal = parseInt($(`input[name=${fieldName}]`).val());
        // If is not undefined
        if (!isNaN(currentVal) && currentVal < 10) {
            // Increment
            $(`input[name=${fieldName}]`).val(currentVal + 1);
        } else {
            // Otherwise put a 10 there
            $(`input[name=${fieldName}]`).val(10);
        }

        const quantity = $(`input[name=${fieldName}]`).val();
        const price = $(`input[name=${fieldName}]`).attr('data-price');
        const id = $(`input[name=${fieldName}]`).attr('data-id');
        const name = $(`input[name=${fieldName}]`).attr('data-name');

        // call cost calc function
        cart.calcCost(id, name, price, quantity);
    }


    decrementValue(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        const fieldName = $(this).attr('data-field');
        // Get its current value
        const currentVal = parseInt($(`input[name=${fieldName}]`).val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 1) {
            // Decrement one
            $(`input[name=${fieldName}]`).val(currentVal - 1);
        } else {
            // Otherwise put a 1 there
            $(`input[name=${fieldName}]`).val(1);
        }

        const quantity = $(`input[name=${fieldName}]`).val();
        const price = $(`input[name=${fieldName}]`).attr('data-price');
        const id = $(`input[name=${fieldName}]`).attr('data-id');
        const name = $(`input[name=${fieldName}]`).attr('data-name');

        // call cost calc function
        cart.calcCost(id, name, price, quantity);
    }


    inputKeyPressCheck(e){
        const $this = $(this);
        const currentVal = (parseInt(e.target.value));
        
        if (!isNaN(currentVal) && currentVal < 1) {
            // Put 1 if less than 1
            $(this).val(1);
        } else if (currentVal > 10) {
            // Put 10 if more than 10 entered
            $(this).val(10);
        }

        const quantity = $($this).val();
        const price = $($this).attr('data-price');
        const id = $($this).attr('data-id');
        const name = $($this).attr('data-name');

        // call cost calc function
        cart.calcCost(id, name, price, quantity);
        
        // allow only number
        const ev = e || window.event;
        if (ev.charCode < 48 || ev.charCode > 57) {
            return false; // not a digit
        } else if (this.value * 10 + ev.charCode - 48 > this.max) {
            return false;
        } else {
            return true;
        }

    }


    renderCart(){
        let markup = '';
        for (const item of this.basket.items) {
            markup += `<tr id="item${item.id}">
                <td data-label="Product">${item.name}</td>
                <td data-label="Price">€${item.price}</td>
                <td data-label="Qty">
                    <div class="quantity">
                        <input class="form-control inline-block" type="number" value=${item.quantity} data-quantity="field" name="quantity${item.id}" min="1" max="10" maxlength="2" data-price="${item.price}" data-id="${item.id}" data-name="${item.name}">
                        <div class="quantity__btn-wrapper inline-block">
                            <button type="button" class="btn btn-plus" data-quantity="plus" data-field="quantity${item.id}" data-price="${item.price}" data-id="${item.id}" data-name="${item.name}"></button>
                            <button type="button" class="btn btn-minus" data-quantity="minus" data-field="quantity${item.id}" data-price="${item.price}" data-id="${item.id}" data-name="${item.name}"></button>
                        </div>
                    </div>
                </td>
                <td data-label="Cost" data-cost${item.id}>€${item.price * item.quantity}</td>
                <td>
                    <button type="button" class="btn btn-link" data-itemid=${item.id} data-delete>
                        <svg class="icon-trash" role="img" title="Delete" width="20px" height="20px">
                            <use xlink:href="images/sprite.svg#trash"></use>
                        </svg>
                    </button>
                </td>
            </tr>`;

            $('#basketItem').html(markup);
        }
        
    }


    calcCost(id, name, price, quantity){
        // calc cost
        const cost = quantity * price;

        // create new item
        const newitem = { id, name, price, quantity };

        // change items array
        this.basket.items = cart.basket.items.map(item => item.id == id ? newitem : item);

        // print cost in browser
        $(`[data-cost${id}]`).text(`€${cost.toFixed(2)}`);
        
        this.calcTotal();
    }


    calcTotal() {
        
        // calc subtotal
        let subtotal = 0;
        for (const item of this.basket.items) {
            subtotal += item.quantity * item.price;
            // add cost in each item object
            item.cost = item.quantity * item.price;
        }

        // calc vat 20% on subtotal
        const vat = subtotal * 0.2;

        // calc total cost
        const totalcost = subtotal + vat;

        // modify object with subtotal, vat, totalcost
        this.basket.subtotal = subtotal.toFixed(2);
        this.basket.vat = vat.toFixed(2);
        this.basket.totalcost = totalcost.toFixed(2);
        
        // print subtotal
        $('[data-subtotal]').text(`€${subtotal.toFixed(2)}`);

        // print vat 20% on subtotal
        $('[data-vat]').text(`€${vat.toFixed(2)}`);

        // print total cost
        $('[data-totalcost]').text(`€${totalcost.toFixed(2)}`);
    }


    deleteItem(){
        
        const itemid = $(this).attr('data-itemid');
        
        cart.basket.items = cart.basket.items.filter(item => item.id != itemid );

        // recalc subtotal
        cart.calcTotal();

        // delete item in browser
        $(`#item${itemid}`).remove();

        cart.checkCartLength();
    }


    checkCartLength(){
        if (this.basket.items.length === 0) {
            $('[data-noproudcts]').removeClass('hide');
            $('[data-submit]').attr('disabled', true);
        }
        else {
            $('[data-noproudcts]').addClass('hide');
            $('[data-submit]').attr('disabled', false);
        }
    }


    submitCart(e){
        e.preventDefault();
        
        $.ajax({
            type: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            // assign "cart.basket" object to data attr
            data: JSON.stringify( cart.basket ),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossDomain: true,
            success: function (data) {
                console.log(data);
                alert('Ajax post request complete, please check browser console or network tab for submitted response.'); 
                
            },
            failure: function (errMsg) {
                alert(errMsg);
                
            }
        });
        console.log(cart.basket);
    }


}


let cart = new Basket();
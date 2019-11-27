if (document.readyState =='loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}


function ready() {
    //Whenever we remove an item we have to update the total price of the shopping cart.
    function updateCartTotal() {
        var carItemContainer = document.getElementsByClassName('cart-items')[0];
        var cartRows = carItemContainer.getElementsByClassName('cart-row');
        var total = 0;
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value;
            total = total + price * quantity;
        }
        //Only two decimals
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
    }

    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    }

    function quantityChanged(event) {
        var input = event.target;

        //isNaN - is not a number
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;

        }
        updateCartTotal();
    }

    function addItemToCart(title, price, imgSource) {
        var cartItems = document.getElementsByClassName('cart-items')[0];


        //Check if the product already exists.
        var cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
        for (let i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText == title) {
                 alert('This item already exists in the shopping list.');
                 return;
            }
        }

        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSource}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
        `
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    }

    //Adding an element to the shopping cart from the list.
    function addToCartClicked(event) {
        var buttonClicked = event.target;

        var shopItem = buttonClicked.parentElement.parentElement;
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imgSource = shopItem.getElementsByClassName('shop-item-image')[0].src
        console.log(title,price, imgSource);

        addItemToCart(title, price, imgSource);
        updateCartTotal();
    } 

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (let i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
}


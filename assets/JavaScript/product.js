$("#header").load("./Components/Header.html")

let products = [];

// function toShort(str, max = 50) {

//     if (str.length > max) {
//         return str.substring(0, max) + "....."
//     }
//     return str;

// }

function toShow(x) {
    $("#products").empty();
    x.map(product => {
        const val = product.price / product.compare_at_price * 100;
        const discount = 100 - val;
        $("#products").append(`

    <div class='card' id =${product.id} name=${product.vendor}>
            <div class='position-relative overflow-hidden'> 
                <div class='product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0'> 
            </div>
             <a class='image'><img class='card-img-top' src=${product.image_src} alt=${product.vendor}></a>
        </div>
         <div class='size-chart' id='size${product.id}'>   
             <h6 class='fw-bold mb-3 namedata'>${product.vendor}</h6>            
              <div class='d-flex align-items-center gap-2 flex-wrap justify-content-center'>            
                      <div class=''>      
                        <button type='button'  onclick='addToCart()'>38</button>
                      </div>                     
                      <div class=''>       
                        <button type='button' onclick='addToCart(${product.id})'>39</button>   
                      </div>                                 
                       <div class=''>      
                         <button ype='button' onclick='addToCart(${product.id})'>41</button>   
                        </div>  
                        <div class=''>       
                          <button type='button' onclick='addToCart(${product.id})'>44</button>    
                        </div>  
                        <div class=''> 
                           <button type='button' onclick='addToCart(${product.id})'>48</button>    
                        </div>      
                                               
                 </div >                                   
                 <p>Sizes : XS, S, M, L, XL, XXL</p> <p class='mb-0 h6 fw-bold product-price'>$${product.price}</p>  
           </div>  <div class='addto-chart ustify-content-center flex-column p-2' id='addtocart${product.id}' style='display: none'>
            <button class="btn btn-outline-dark py-2 px-5 fs-5 mb-3 w-100 add-to-cart" data-id="${product.id}">
                Add To cart <i class="fas fa-cart-plus"></i></button    <p>Sizes : XS, S, M, L, XL, XXL</p>  <div class='d-flex align-items-center gap-2'>    <p class='mb-0 h6 fw-bold product-price'>$${product.price}</p>  <s>${product.compare_at_price}</s> <p class='mb-0 h6 fw-normal'>(${discount.toFixed()}% OFF)</p>         </div>  </div>                              <div class='card-body position-relative productde' id='products-de${product.id}'>        <div class='product-info'>            <h6 class='mb-2 fw-bold'>${product.vendor}</h6> <p class='d-flex names'>${name}</p> <div class='d-flex align-items-center gap-2'> <p class='mb-0 h6 fw-bold product-price'>$${product.price}</p>  <s>${product.compare_at_price}</s> <p class='mb-0 h6 fw-normal'>(${discount.toFixed()}% OFF)</p>  </div>   </div></div></div>

    `)
    })
}

function cartTotal() {

    let count = $(".item-in-cart-cost").length;

    $(".item-in-cart-count").html(count);


    if (count > 0) {
        let totalCost = $(".item-in-cart-cost").toArray().map(el => el.innerHTML).reduce((x, y) => Number(x) + Number(y));
        // console.log(typeof totalCost);
        $(".total").html(`

        <div class="d-flex justify-content-between font-weight-bold px-3">
            <h4>Total</h4>
            <h4>$ <span class="cart-cost-total">${Number(totalCost).toFixed(2)}</span></h4>
        </div>

    `)
    } else {
        $(".total").html("empty cart")
    }

}



$.get("./assets/JavaScript/product.json", function (data) {
    products = data;
    toShow(products);
})
function addToCart(num) {

    document.getElementById(`addtocart${num}`).style.display = 'block';
    document.getElementById(`size${num}`).style.display = 'none';
    document.getElementById(`products-de${num}`).style.display = 'none';

}

$("#products").delegate(".add-to-cart", "click", function () {
    let currentItemId = $(this).attr("data-id");

    let productInfo = products.filter(el => el.id == currentItemId)[0];

    if ($(".item-in-cart").toArray().map(el => el.getAttribute("data-id")).includes(currentItemId)) {

        alert("Already Added")

    } else {

        $("#cart").append(`
<div class="card border-0 item-in-cart" data-id="${productInfo.id}">
    <div class="">
        <div class="d-flex justify-content-between align-items-center gap-3 mb-3">
            <img src="${productInfo.image_src}" class="img-in-cart" alt="">
            <p class="mt-3">
            ${productInfo.name}
        </p>
            <button class="btn btn-outline-danger remove-from-cart">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
        
        <div class="d-flex justify-content-between align-items-center">
            <div class="form-row">
                
                <input type="number" class="form-control w-25 mx-2 quantity" unitPrice="${productInfo.price}" value="1" readonly>
              
            </div>
            <p class="mb-0">$ <span class="item-in-cart-cost">${productInfo.price}</span></p>
        </div>
        <hr>
    </div>
</div>
`);

    }

    cartTotal();

})

$("#cart").delegate(".remove-from-cart", "click", function () {

    $(this).parentsUntil("#cart").remove();
    cartTotal();

})


const open = () => {
    document.getElementById("model").style.display = "block"
}

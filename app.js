
// call the api
const productAPI = async () => {
  const res = await fetch("./products.json");
  const data = await res.json();
  displayProduct(data);
  searchProduct(data);
};


// diplay all products on the table
const displayProduct = (products) => {
  const productTable = document.getElementById("product-table");
 
 productTable.content=""
  products.forEach((product) => {
    const categoryElement = document.getElementById('category');
   const img1=product.members[0]
   const img2=product.members[1]
   const img3=product.members[2]
   const img4=product.members[3]
   const img5=product.members[4]

  
    // table row for products
    const tr= document.createElement("tr");
    tr.innerHTML = `
       <td class="brands">

       <div class="brand-section">
        <input type="checkbox"/>
        <img class="logo" src=${product.logo}>
      <p>  ${product.brand}</p>
       </div>
       <div class="brand">
       ${product.copy ? `<img src="${product.copy}">` : ""}     
         ${product.day ? `<p>${product.day}</p>` : ""}
       </div>
     
       </td>
       <td>${product.description.slice(0, 20)}...</td>
      <td>
      <div class="images">
      ${img1 ? `<img  src="${img1}">` : ""}     
      ${img2 ? `<img src="${img2}">` : ""}     
      ${img3 ? `<img src="${img3}">` : ""}     
      ${img4 ? `<img src="${img4}">` : ""}     
      ${img5 ? `<img src="${img5}">` : ""}     

     </div>
      </td>
       <td >
       <span id="catgeory">${product.categories}</span>
       </td>
       <td >${product.Tags}</td>
        <td>
        <div class="meeting-cls" style="background-color:${product.bg_color}">${
      product.next_meeting
    }</div>

        </td>
       <td></td>
       `;

      //  append the row in the product table
    productTable.appendChild(tr);
  });

  const countRow = document.createElement("tr");
  countRow.innerHTML = `
  <td> <span style="font-Weight:bold" id="count">28</span> Count</td>
  <td>+Add Calculation</td>
  <td>+Add Calculation</td>
  <td>+Add Calculation</td>
  <td>+Add Calculation</td>
  `;
  productTable.appendChild(countRow);


  
  // Calculate total days and set it to the count element
  const brandDays = products.map(product => product.day);
  const days = brandDays.map(brandday => parseInt(brandday)).filter(day => !isNaN(day));
  const totalDay = days.reduce((previousDay, currentDay) => previousDay + currentDay, 0); // Ensure to initialize with 0
  const count = document.getElementById("count");
  count.innerHTML = totalDay;



};

// search implement..by search product
const searchProduct = (products) => {
  const productTable = document.getElementById("product-table");
  document.getElementById("search").addEventListener("keyup", function (e) {
    const search = e.target.value.toLowerCase(); // Convert search query to lowercase for case-insensitive comparison

    // clear the table for display searching product
    productTable.innerHTML = '';

    const searchingProduct = products.filter((product) => {
      const categoriesString = String(product.categories).toLowerCase(); 
      return categoriesString.includes(search);
    });

    // Call displayProduct function with filtered products
    displayProduct(searchingProduct);
  });
};
productAPI();


// dropdown menu
const close=document.getElementById('close')
const open=document.getElementById('open')
const footer=document.getElementById('footer')
close.addEventListener('click',function(e){
footer.style.display='none'
open.style.display="block"

})

// open footer
document.getElementById('open').addEventListener('click',function(){
  footer.style.display="flex"
  open.style.display="none"
})
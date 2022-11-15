
function hienThiTrangAdmin(obj) {
    switch (obj.id) {
        case "trangchu": {
            trangChuUser();
            break;
        }
        case "quanlyuser": {
            quanlyuser();
            break;
        }
        case "quanlysanpham": {
            quanlysanpam();
            break;
        }
        case "quanlydonhang": {
    

            break;
        }
        case "thongkekinhdoanh": {
    

            break;
        }
    }
}




function trangChuUser() {
window.location.href = "http://127.0.0.1:5500/user.html";
document.getElementById("sign-in").outerHTML = `
<div id="sign-in" onclick="dangXuat();">
<i class="fas fa-sign-in-alt"></i>
<a href="#">Đăng Xuất</a>
</div>`
document.getElementById("user").innerHTML = `<i class="fas fa-cog"></i><a href="#">Admin</a>`
}

function quanlyuser() {
var s = `            
<table id="quanlyuser">
    <thead>
        <th>STT</th>
        <th>Họ Tên</th>
        <th>Số điện thoại</th>
        <th>Tài Khoản</th>
        <th>Mật Khẩu</th>
    </thead>
    <tbody id="table-body">
        
    </tbody>
    <tfoot>
        <tr id="tongTaiKhoan">
            
        </tr>
    </tfoot>
</table>`;
document.getElementById("container").innerHTML = s;
var listTaiKhoan = JSON.parse(localStorage.getItem("listTaiKhoan"));
var s = "";
for (var i = 0; i < listTaiKhoan.length; i++) {
    s += `
    <tr>
        <td>${i+1}</td>
        <td>${listTaiKhoan[i].hoten}</td>
        <td>${listTaiKhoan[i].sdt}</td>
        <td>${listTaiKhoan[i].taikhoan}</td>
        <td>${listTaiKhoan[i].matkhau}</td>
    </tr>`
}
document.getElementById("table-body").innerHTML = s;
document.getElementById("tongTaiKhoan").innerHTML = `<th colspan="5"><spanp>Tổng Tài Khoản: </spanp>${listTaiKhoan.length}</th>`
}


function quanlysanpam() {
var s = `
    <div class = "content">
        <table id="quanlysanpham">
            <thead>
                <th>STT</th>
                <th>Tên Hãng</th>
                <th>Tên Sản Phẩm</th>
                <th>Mã Sản Phẩm</th>
                <th>Hình Sản Phẩm</th>
                <th>Số Lượng</th>
                <th>Giá</th>
                <th>Action</th>
            </thead>
            <tbody id="table-body">

            </tbody>

            <tr id="themSp" onclick="addsp()">
                <th colspan="8">Thêm Sản Phẩm <i class="fas fa-plus"></i></th>
            </tr>
            <tfoot>
                <tr id="tongSanPham">

                </tr>
                <tr id="tongNike">

                </tr>
                <tr id="tongAdidas">

                </tr>
                <tr id="tongJordan">

                </tr>
                <tr id="tongMen">

                </tr>
                <tr id="tongBitis">

                </tr>
            </tfoot>
        </table>
    </div>`;
document.getElementById("container").innerHTML = s;
var s = "";
var stt=0,tong=0,nike=0,adidas=0,jordan=0,men=0,bitis=0;
var arr = JSON.parse(localStorage.getItem("sanPham"));
for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
        s += `
        <tr>
            <td>${++stt}</td>
            <td class="brand">${arr[i][j].brand}</td>
            <td class="name">${arr[i][j].name}</td>
            <td class="productID">${arr[i][j].productId}</td>
            <td class="img"><img src="${arr[i][j].img}" alt=""></td>
            <td class="quantity">${arr[i][j].quantity}</td>
            <td class="price">${arr[i][j].price}đ</td>
            <td class="action">
                <button onclick="editsp(this);">Edit</button>
                <button onclick="deletesp();">Delete</button>
            </td>
        </tr>`;
        tong += arr[i][j].quantity;
        if (arr[i][j].brand === "Nike") {
            nike += arr[i][j].quantity;
        }
        else if (arr[i][j].brand === "Adidas"){
            adidas += arr[i][j].quantity;
        }
        else if (arr[i][j].brand === "Jordan"){
            jordan += arr[i][j].quantity;
        }
        else if (arr[i][j].brand === "Men"){
            men += arr[i][j].quantity;
        }
        else {
            bitis += arr[i][j].quantity;
        }

    }
}
document.getElementById("table-body").innerHTML = s;
document.getElementById("tongSanPham").innerHTML = `<th colspan="8"><spanp>Tổng Sản Phẩm: </spanp>${tong}</th>`;
document.getElementById("tongNike").innerHTML = `<th colspan="8"><spanp>Tổng Giày Nike: </spanp>${nike}</th>`;
document.getElementById("tongAdidas").innerHTML = `<th colspan="8"><spanp>Tổng Giày Adidas: </spanp>${adidas}</th>`;
document.getElementById("tongJordan").innerHTML = `<th colspan="8"><spanp>Tổng Giày Jordan: </spanp>${jordan}</th>`;
document.getElementById("tongMen").innerHTML = `<th colspan="8"><spanp>Tổng Giày Nam: </spanp>${men}</th>`;
document.getElementById("tongBitis").innerHTML = `<th colspan="8"><spanp>Tổng Giày Bitis: </spanp>${bitis}</th>`;
}


var brand;
var productID;
function editsp(button) {
    document.getElementById("editSP").style.display = "block";
    brand = button.parentElement.parentElement.querySelector(".brand").innerHTML;
    var name = button.parentElement.parentElement.querySelector(".name").innerHTML;
    productID = button.parentElement.parentElement.querySelector(".productID").innerHTML;
    var img = button.parentElement.parentElement.querySelector(".img").querySelector("img").getAttribute("src");
    var quantity = button.parentElement.parentElement.querySelector(".quantity").innerHTML;
    var price = button.parentElement.parentElement.querySelector(".price").innerHTML;
    

    var edit = document.getElementById("form-edit");
    var arr = edit.querySelector(".hangsp").children;
    console.log(brand);
    for (var option of arr) {
        if (option.value === brand) {
            option.setAttribute("selected", "selected");
        }
    }

    edit.querySelector(".hangsp").firstElementChild.innerHTML = brand;
    edit.querySelector(".tensp").value = name;
    edit.querySelector(".idsp").value = productID;
    edit.querySelector(".hinhsp").setAttribute("src",img);
    edit.querySelector(".slsp").value = quantity;
    edit.querySelector(".giasp").value = price;
}

function closeEdit() {
    document.getElementById("editSP").style.display = "none";
}

function thietlapEdit() {
    // Kiểm tra trùng thông tin với các sản phẩm trước
    var hang = document.getElementById("form-edit").querySelector(".tensp")
    var tensp = document.getElementById("form-edit").querySelector(".tensp").value;
    var masp = document.getElementById("form-edit").querySelector(".idsp").value;
    var hinhsp = document.getElementById("form-edit").querySelector(".hinhsp").getAttribute("src");
    var slsp = document.getElementById("form-edit").querySelector(".slsp").value;
    var giasp = document.getElementById("form-edit").querySelector(".giasp").value;
    var arr = JSON.parse(localStorage.getItem("sanPham"));
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            if (arr[i][j].productId != productID) {
                if (arr[i][j].name === tensp) {
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";
    
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "Tên sản phẩm đã tồn tại";
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").style.color = "red";
                    return false;
                }
                else if (arr[i][j].productId === masp) {
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";
    
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "ID sản phẩm đã tồn tại";
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").style.color = "red";
                    return false;
    
                }
                else if (arr[i][j].img === hinhsp) {
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "";
    
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "Hình sản phẩm đã tồn tại";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").style.color = "red";
                    return false;
                }
                else {
                    document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "";
                    document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";
                }

            }
            
        }
    }
    var checkId = document.querySelector(".idsp").parentElement.querySelector(".error-message").innerText;
    var checkTen = document.querySelector(".tensp").parentElement.querySelector(".error-message").innerText;
    var checkHinh = document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerText;
    console.log(checkId, checkTen, checkHinh);
    var Nike = JSON.parse(localStorage.getItem("nike"));
    var Adidas = JSON.parse(localStorage.getItem("adidas"));
    var Jordan = JSON.parse(localStorage.getItem("jordan"));
    var Men = JSON.parse(localStorage.getItem("men"));
    var Bitis = JSON.parse(localStorage.getItem("bitis"));
    var sanpham = JSON.parse(localStorage.getItem("sanPham"));
    if (checkId==="" && checkTen==="" && checkHinh==="") {
        if (document.querySelector(".hangsp").value === brand) {
            if (brand === "Nike") {
                Nike.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Nike));

                
                sanpham[0].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Adidas") {
                Adidas.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Adidas));

                sanpham[1].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Jordan") {
                Jordan.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Jordan));

                sanpham[2].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Men") {
                Men.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Men));

                sanpham[3].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }
            else if (brand === "Bitis") {
                Bitis.forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("nike",JSON.stringify(Bitis));

                sanpham[4].forEach(function(value,index) {
                    if (value.productId === productID) {
                        value.productId = masp;
                        value.name = tensp;
                        value.img = hinhsp;
                        value.quantity = parseInt(slsp);
                        value.price = parseInt(giasp);
                    }
                });
                localStorage.setItem("sanPham",JSON.stringify(sanpham));
            }

        }





        alert("Thiết Lập Thành Công!");
        closeEdit();
    }
}

function doiHinh(event) {
    event.stopPropagation();
    event.preventDefault();

    var files = event.target.files;
    var file = files[0];

    var fileReader = new FileReader();

    fileReader.onload = function(progressEvent) {
        var url = fileReader.result;

        var myImg = document.getElementById("form-edit").querySelector(".hinhsp");
        myImg.src = url;
    }
    fileReader.readAsDataURL(file);
}





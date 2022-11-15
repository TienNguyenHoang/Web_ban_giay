

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
for (var i = 0; i < sanPham.length; i++) {
    for (var j = 0; j < sanPham[i].length; j++) {
        s += `
        <tr>
            <td>${++stt}</td>
            <td class="brand">${sanPham[i][j].brand}</td>
            <td class="name">${sanPham[i][j].name}</td>
            <td class="productID">${sanPham[i][j].productId}</td>
            <td class="img"><img src="${sanPham[i][j].img}" alt=""></td>
            <td class="quantity">${sanPham[i][j].quantity}</td>
            <td class="price">${sanPham[i][j].price}đ</td>
            <td class="action">
                <button onclick="editsp(this);">Edit</button>
                <button onclick="deletesp();">Delete</button>
            </td>
        </tr>`;
        tong += sanPham[i][j].quantity;
        if (sanPham[i][j].brand === "Nike") {
            nike += sanPham[i][j].quantity;
        }
        else if (sanPham[i][j].brand === "Adidas"){
            adidas += sanPham[i][j].quantity;
        }
        else if (sanPham[i][j].brand === "Jordan"){
            jordan += sanPham[i][j].quantity;
        }
        else if (sanPham[i][j].brand === "Men"){
            men += sanPham[i][j].quantity;
        }
        else {
            bitis += sanPham[i][j].quantity;
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



function editsp(button) {
    document.getElementById("editSP").style.display = "block";
    var brand = button.parentElement.parentElement.querySelector(".brand").innerHTML;
    var name = button.parentElement.parentElement.querySelector(".name").innerHTML;
    var productID = button.parentElement.parentElement.querySelector(".productID").innerHTML;
    var img = button.parentElement.parentElement.querySelector(".img").querySelector("img").getAttribute("src");
    var quantity = button.parentElement.parentElement.querySelector(".quantity").innerHTML;
    var price = button.parentElement.parentElement.querySelector(".price").innerHTML;
    

    var edit = document.getElementById("form-edit");
    edit.querySelector(".hangsp").firstElementChild.value = brand;
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

    for (var i = 0; i < sanPham.length; i++) {
        for (var j = 0; j < sanPham[i].length; j++) {
            if (sanPham[i][j].name === tensp) {
                document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "";
                document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";

                document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "Tên sản phẩm đã tồn tại";
                document.querySelector(".tensp").parentElement.querySelector(".error-message").style.color = "red";
                return false;
            }
            else if (sanPham[i][j].productId === masp) {
                document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML = "";
                document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML = "";

                document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML = "ID sản phẩm đã tồn tại";
                document.querySelector(".idsp").parentElement.querySelector(".error-message").style.color = "red";
                return false;

            }
            else if (sanPham[i][j].img === hinhsp) {
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
    var checkId = document.querySelector(".idsp").parentElement.querySelector(".error-message").innerHTML;
    var checkTen = document.querySelector(".tensp").parentElement.querySelector(".error-message").innerHTML;
    var checkHinh = document.querySelector(".hinhsp").parentElement.querySelector(".error-message").innerHTML;

    if (checkId!="" && checkTen!="" && checkHinh!="") {







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





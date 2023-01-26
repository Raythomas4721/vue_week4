import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'han113';

// const username = document.querySelector('#floatingInput').value;
// const password = document.querySelector('#floatingPassword').value;
// const signinBtn = document.querySelector('#signin');

let productModal = {};
let delProductModal = {};

const app = {
    data() {
        return {
            products : [],
            tempProduct : {
                imagesUrl:[],
            },
            isNew : false,
        }
    },
    methods : {
        checkStatus() {
            axios.post(`${url}api/user/check`).then((res) => {
                // console.log(res);
                this.getProductList();
            }).catch((err) => {
                console.log(err);
                alert(err.response.data.message);
                // 導入 login.html 頁面
                window.location = 'login.html';
            })
        },
        getProductList() {
            axios.get(`${url}api/${path}/admin/products/all`).then((res) => {
                this.products = res.data.products;
                // console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        },
        openModal(status, product) {
            if(status === 'create') {
                productModal.show();
                this.isNew = true;
                // 帶入初始化資料
                this.tempProduct = {
                    imagesUrl : [],
                }
            }else if (status === 'edit'){
                productModal.show();
                this.isNew = false;
                // 帶入當前要編輯的資料
                this.tempProduct = {...product};

            }else if (status === 'delete'){
                delProductModal.show();
                this.tempProduct = {...product};

            }
        },
        updateProduct() {
            let urlLink = `${url}api/${path}/admin/product` ;
            let method = `post`;
            
            if(!this.isNew) {
                urlLink = `${url}api/${path}/admin/product/${this.tempProduct.id}`;
                method = `put`;
            }

            axios[method](urlLink, { data: this.tempProduct} ).then(res => {
                // console.log(res);
                this.getProductList();
                productModal.hide();
            }).catch(err => {
                console.log(err);
            })
        },
        deleteProduct() {
            axios.delete(`${url}api/${path}/admin/product/${this.tempProduct.id}`).then(res => {
                // console.log(res);
                this.getProductList();
                delProductModal.hide();
            }).catch(err => {
                console.log(err);
            })
        },
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)vue-Class\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
        this.checkStatus();
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
    }

}

createApp(app)
    .mount('#app');
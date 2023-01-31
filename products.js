import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js'

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'han113';

let productModal = {};
let delProductModal = {};

const app =  createApp({
    data() {
        return {
            products : [],
            tempProduct : {
                imagesUrl:[],
            },
            isNew : false, // 確認是編輯或是新增
            page : {},
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
        
        getProductList(page = 1) {
            axios.get(`${url}api/${path}/admin/products/?page=${page}`).then((res) => {
                this.products = res.data.products;
                this.page = res.data.pagination;
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
    components : {
        pagination
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)vue-Class\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
        this.checkStatus();
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
    }

});


app.component('product-modal',{
    props:['tempProduct','updateProduct'],
    template : '#product-modal-template',
})

app.mount('#app');



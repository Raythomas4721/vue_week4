
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/';
const path = 'han113';

// const username = document.querySelector('#floatingInput').value;
// const password = document.querySelector('#floatingPassword').value;
// const signinBtn = document.querySelector('#signin');

const app = {
    data() {
        return {
            user: {
                username: '',
                password: '',
              },
        }
    },
    methods : {
        signin() {
            axios.post(`${url}admin/signin`, this.user).then((res) => {
                const {token,expired} = res.data;
                // 寫入 cookie token expired
                document.cookie = `vue-Class = ${token}; expires = ${expired}`;
                // 導入 products.html 頁面
                window.location = 'products.html';
            }).catch((err) => {
                console.log(err)
            })
        },
        getData() {
            axios.get(`${url}api/${path}/products/all`).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    }

}

createApp(app)
    .mount('#app')
export default {
  props: ['pages','get-product-list'],
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class='{disabled: !pages.has_pre}'>
        <a class="page-link" href="#" @click.prevent='getProductList(pages.current_page - 1)' aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class='{active: page === pages.current_page}' v-for='page in pages.total_pages' :key="page + 'page'">
        <a class="page-link" href="#" @click.prevent='getProductList(page)'>{{ page }}</a></li>
      <li class="page-item" :class='{disabled: !pages.has_next}'>
        <a class="page-link" href="#" @click.prevent='getProductList(pages.current_page+1)' aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav> `,
};

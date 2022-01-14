<template>

  <div>

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Ver</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>Entradas</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="filter"
                class="d-inline-block mr-1"
                placeholder="Buscar..."
              />
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table
        ref="refArticlesListTable"
        :items="items"
        :fields="columns"
        responsive
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        :empty-text="empty"
        :sort-desc.sync="isSortDirDesc"
        :filter="filter"
        :empty-filtered-text="empty"
        :current-page="currentPage"
        :per-page="perPage"
      >     
   
     </b-table>

      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Mostrando {{ dataMeta.from }} de {{ dataMeta.to }} de {{ dataMeta.of }} entradas</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>


    </b-card>

  </div>
</template>

<script>

/*eslint-disable*/

// Bootstrap
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination,
} from 'bootstrap-vue'

// vSelect
import vSelect from 'vue-select'

// Servicios
import * as articleService from '@/services/articles'

export default {
  components: {    
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },
  data() {
    return {
      loading: true,
      items: [],
      dataInventory: {},
      empty: 'No hay datos para mostrar',
      columns: [
        { key: 'id', label: 'Id', sortable: true },
        { key: 'name', label: 'Artículo', sortable: true },
        { key: 'catalog_id', label: 'Id Catalogo', sortable: true },
      ],
      perPage: 10,
      sortBy: 'id',
      isSortDirDesc: true,
      perPageOptions: [5, 10, 25, 50],
      currentPage: 1,
      filter: '',
    }
  },

  computed: {
    rows() {
      return this.items.length
    },
    dataMeta() {
      return {
        from: (this.currentPage - 1) * this.perPage + 1,
        to: this.currentPage * this.perPage > this.rows ? this.rows : this.currentPage * this.perPage,
        of: this.rows,
      }
    },
  },


  created() {
    this.getArticles()
  },

  methods: {

    async getArticles() {
      try {
        const response = await articleService.getArticles()
        if (response.status === 200) {
          this.items = response.data.data
        }
      } catch (error) {
        this.loading = false
        this.showToast('Warning', 'AlertCircleIcon', 'No se pudieron obtener los datos', 'warning')
      }
    },

    showToast(title, icon, text, variant) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title,
          icon,
          text,
          variant,
        },
      })
    },

  },

}
</script>

<style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  @import '@core/scss/vue/libs/vue-select.scss';
</style>

<template>
  <div class="home">
    <div class="container">
      <div class="row flex-lg-nowrap mt-5">
        <div class="col">
          <div class="row flex-lg-nowrap">
            <div class="col mb-3">
              <div class="e-panel card">
                  <div class="card-header">
                    <h5 class="card-title d-flex justify-content-between align-items-center p-2">
                      Séries
                      <router-link class="btn btn-sm btn-primary" to="/series/nova">
                        Adicionar série
                      </router-link> 
                    </h5>
                  </div>
                  <div class="card-body">
                    <div class="row mt-5">
                      <div v-if="message" class="alert alert-success" role="alert">
                        {{ message }}
                      </div>
                    </div>
                    <div class="table-responsive table-lg mt-3">
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Situação</th>
                            <th>Nome</th>
                            <th class="max-width">Ano de lançamento</th>
                            <th class="sortable">Número de temporadas</th>
                            <th>Sinopse</th>
                            <th>Categoria</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody v-if="series.length > 0">
                          
                          <tr v-for="serie in series" :key="serie.id">
                            <td width="140px">
                              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <label :class="classRadio('alreadySaw', serie)">
                                  <input type="radio" autocomplete="off"> Já vi
                                </label>
                                <label :class="classRadio('wantToSee', serie)">
                                  <input type="radio" autocomplete="off"> Quero ver
                                </label>
                              </div>
                            </td>
                            <td class="align-middle text-center">
                              {{ serie.name }}
                            </td>
                            <td class="text-nowrap align-middle">
                              {{ serie.year }}
                              </td>
                            <td class="text-nowrap align-middle">
                              {{ serie.seasons }}
                            </td>
                            <td class="text-center align-middle">
                              {{ serie.synopsis.replace(/(.{30})..+/, "$1…") }}
                            </td>
                            <td class="text-center align-middle">
                              {{ getCategoryName(serie.category) }}
                            </td>
                            <td class="text-center align-middle">
                              <div class="btn-group align-top">
                                  <button class="btn btn-sm btn-dark badge" type="button">
                                    <i>
                                      <a class="text-white" v-bind:href="'/series/editar/'+serie._id"><font-awesome-icon icon="edit" /></a>
                                    </i>
                                  </button>
                                  <button @click="deleteSerie(serie._id)" class="btn btn-sm btn-danger badge" type="button"><i><font-awesome-icon icon="trash" /></i></button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="6">
                              Nenhum registro encontrado.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import api from '@/services/series'

import Constants from '../../utils/constants'

export default {
  name: 'Home',
  data () {
    return {
      loading: false,
      series: [],
      categories: Constants.categories,
    }
  },
  computed: {
    message() {
      let message = localStorage.getItem('message');
      if (message) {
        localStorage.removeItem('message');
        return message;
      } else {
        return false;
      }
    },

  },
  async created () {
    await this.refreshSeries()
  },
  methods: {
    getCategoryName(category) {
      let search = this.categories.find((cat) => category == cat.key);
      return search ? search.name : '';
    },
    classRadio(key, serie) {
      return 'btn btn-success '+(serie.situation == key ? 'active' : '');
    },
    async refreshSeries () {
      this.loading = true;
      const { data } = await api.getSeries();
      this.series = data;
      this.loading = false;
    },
    async deleteSerie (id) {
      if (confirm('Você tem certeza que deseja excluir esta série?')) {
        await api.deleteSerie(id);
        await this.refreshSeries();
      }
    }
  }
}
</script>

<style scoped>
  .btn-group-toggle input {
    display: none;
  }

  .btn-group-toggle label {
    font-size: 11px;
  }

  table td, table th {
    vertical-align: middle;
  }
</style>

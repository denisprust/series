<template>
  <div class="create">
    <div class="container">
      <div class="row flex-lg-nowrap mt-5">
        <div class="col">
          <div class="row flex-lg-nowrap">
            <div class="col mb-3">
              <div class="e-panel card">
                <div class="card-header">
                  <div class="card-title">
                    <h5 class="d-flex justify-content-between align-items-center p-2">
                      {{ isUpdate ? 'Editar série' : 'Adicionar Série' }}
                      <router-link class="btn btn-sm btn-primary" to="/">
                        Voltar
                      </router-link>
                    </h5>
                  </div>
                </div>
                <div class="card-body">
                    <input type="hidden" v-model="model._id"> 
                    <div class="form-group row">
                      <div class="col-sm-4">
                        <label for="nome">Nome:</label>
                        <input type="text" class="form-control" id="nome" maxlength="255" v-model="model.name">
                      </div>
                      <div class="col-sm-4">
                        <label for="ano">Ano de lançamento:</label>
                        <input type="number" class="form-control" id="ano" maxlength="4" v-model="model.year">
                      </div>
                      <div class="col-sm-4">
                        <label for="temporadas">Temporadas:</label>
                        <input type="number" class="form-control" id="temporadas" maxlength="3" v-model="model.seasons">
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-4">
                        <label for="categoria">Categoria:</label>
                        <select class="form-control" id="categoria" v-model="model.category">
                          <option  v-for="category in categories" v-bind:value="category.key" :key="category.key">
                            {{category.name}}
                          </option>
                        </select>
                      </div>
                      <div class="col-sm-4">
                         <label for="situation">Situação:</label>
                         <select class="form-control" id="situation" v-model="model.situation">
                          <option  v-for="situation in situations" v-bind:value="situation.key" :key="situation.key">
                            {{situation.name}}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-12">
                        <label for="sinopse">Sinopse:</label>
                        <textarea class="form-control" id="sinopse" v-model="model.synopsis"></textarea>
                      </div>
                    </div>
                    <div class="form-group row mt-5">
                      <div class="col-sm-12">
                        <button @click="save" class="btn btn-success">
                          <span
                            v-show="loading"
                            class="spinner-border spinner-border-sm"
                          ></span>
                          Salvar
                        </button>
                      </div>
                    </div>

                    <div class="row mt-5">
                      <div v-if="message" class="alert alert-danger" role="alert">
                        {{ message }}
                      </div>
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
// @ is an alias to /src
import api from '@/services/series'

import Constants from '../../utils/constants'

export default {
  name: 'Create',
  data() {

    return {
      // schema,
      isUpdate: false,
      loading: false,
      categories: Constants.categories,
      situations: Constants.situations,
      model: {
        id: undefined,
        name: undefined,
        year: undefined,
        synopsis: undefined,
        category: undefined,
        seasons: undefined,
        situation: undefined,
      }
    }
  },
  components: {
  },
  async created() {
    if (this.$route.params.id) {
      this.isUpdate = true;
      const { data } = await api.getSerie(this.$route.params.id);
      this.model = data;
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    async save () {
      this.loading = true;

      if(this.model._id) {
        await api.updateSerie(this.$route.params.id, this.model)
      } else {
        await api.createSerie(this.model)
      }

      localStorage.setItem('message', 'Série salva com sucesso!');
      
      this.loading = false;
      this.goBack();
    },
  }
}
</script>

<style lang="css" scoped>
  div label {
    display: flex;
  }

  .row {
    margin-top: 10px;
  }
</style>

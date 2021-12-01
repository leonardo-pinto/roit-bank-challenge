<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          <h2 class="modal-header-title">Editar</h2>
          <button class="btn-close" type="button" @click="closeUpdateModal">
            X
          </button>
        </header>
        <form class="modal-form" id="modalDescription">
          <div class="input-container">
            <label class="input-label" for="id">ID</label>
            <input
              class="input"
              disabled=true
              type="text"
              id="id"
              v-model="user.id"
              placeholder="Digite um ID" />
          </div>
          <div class="input-container">
            <label class="input-label" for="nome">Nome</label>
            <input
              class="input"
              type="text"
              id="nome"
              v-model="user.nome"
              placeholder="Digite um nome"
            />
          </div>
          <div class="input-container">
            <label class="input-label" for="idade">Idade</label>
            <input
              class="input"
              type="number"
              id="idade"
              v-model="user.idade"
              placeholder="Digite sua idade"
            />
          </div>
        </form>
        <footer class="modal-footer">
          <button class="btn-cancel" type="button" @click="closeUpdateModal">
            <p class="btn-cancel-text">
              Cancelar
            </p>
          </button>
          <button class="btn-save" type="button" @click="updateUser">
            <p class="btn-save-text">Salvar</p>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import server from '../server';

export default {
  props: ['idUser'],

  data() {
    return {
      user: {
        id: '',
        nome: '',
        idade: '',
      },
      getUserToUpdate: this.idUser,
    };
  },

  name: 'Modal',

  created() {
    this.getUserById(this.getUserToUpdate);
  },

  methods: {
    closeUpdateModal() {
      this.$emit('close');
    },

    updateUser() {
      const userData = {
        id: this.user.id,
        nome: this.user.nome,
        idade: this.user.idade,
      };

      axios
        .put(`${server.baseURL}/${this.user.id}`, userData)
        .then(() => {
          window.location.reload();
          this.close();
        });
    },

    getUserById() {
      const id = this.getUserToUpdate;
      axios
        .get(`${server.baseURL}/${id}`)
        .then((res) => {
          this.user = res.data;
        });
    },
  },
};

</script>

<style>
  button {
    border-width: 0px;
  }
</style>

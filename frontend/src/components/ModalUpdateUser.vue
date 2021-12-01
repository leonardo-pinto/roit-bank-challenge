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
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
  }

  .modal-form {
    position: relative;
    padding: 20px 10px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  } .input {
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid var(---dfe3e6-border);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #DFE3E6;
    border-radius: 4px;
    font: normal normal normal 14px/20px Open Sans;
    opacity: 1;
  }

  button {
    border-width: 0px;
  }
</style>

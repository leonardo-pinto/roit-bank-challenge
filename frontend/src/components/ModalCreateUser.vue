<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          <h2>Adicionar</h2>
          <button class="btn-close" type="button" @click="closeCreateModal">Fechar</button>
        </header>
        <form class="modal-form" id="modalDescription">
          <div>
          <label for="id">ID</label>
          <input type="text" id="id" v-model="id" placeholder="Digite um ID" />
        </div>
        <div>
          <label for="nome">Nome</label>
          <input type="text" id="nome" v-model="nome" placeholder="Digite um nome" />
        </div>
        <div>
          <label for="idade">Idade</label>
          <input type="number" id="idade" v-model="idade" placeholder="Digite sua idade" />
        </div>
        </form>
        <footer class="modal-footer">
          <button type="button" @click="closeCreateModal">Cancelar</button>
          <button class="btn-green" type="submit" @click="createUser">Salvar</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';
import server from '../server';

export default {
  data() {
    return {
      id: '',
      nome: '',
      idade: '',
    };
  },

  name: 'Modal',

  methods: {
    closeCreateModal() {
      this.$emit('close');
    },

    createUser() {
      const userData = {
        id: this.id,
        nome: this.nome,
        idade: this.idade,
      };

      axios
        .post(server.baseURL, userData)
        .then(() => {
          window.location.reload();
          this.close();
        });
    },
  },

};

</script>

<style>
/* Modal style based on https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component */
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

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-form {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>

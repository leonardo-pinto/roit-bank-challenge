<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          <h2>Editar</h2>
          <button class="btn-close" type="button" @click="closeUpdateModal">Fechar</button>
        </header>
        <form class="modal-form" id="modalDescription">
          <div>
          <label for="id">ID</label>
          <input disabled=true type="text" id="id" v-model="user.id" placeholder="Digite um ID" />
        </div>
        <div>
          <label for="nome">Nome</label>
          <input type="text" id="nome" v-model="user.nome"
           placeholder="Digite um nome" />
        </div>
        <div>
          <label for="idade">Idade</label>
          <input
            type="number"
            id="idade"
            v-model="user.idade"
            placeholder="Digite sua idade"
          />
        </div>
        </form>
        <footer class="modal-footer">
          <button type="button" @click="closeUpdateModal">Cancelar</button>
          <button class="btn-green" type="button" @click="updateUser">Salvar</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios';

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
        .put(`http://localhost:3000/user/${this.user.id}`, userData)
        .then(() => {
          window.location.reload();
          this.close();
        });
    },

    getUserById() {
      const id = this.getUserToUpdate;
      axios
        .get(`http://localhost:3000/user/${id}`)
        .then((res) => {
          this.user = res.data;
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

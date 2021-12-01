<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          <h2 class="modal-header-title">Adicionar</h2>
          <button class="btn-close" type="button" @click="closeCreateModal">
            X
          </button>
        </header>
        <form class="modal-form" id="modalDescription">
          <div class="input-container">
            <label class="input-label" for="id">ID</label>
            <input class="input" type="text" id="id" v-model="id" placeholder="Digite um ID" />
          </div>
          <div class="input-container">
            <label class="input-label" for="nome">Nome</label>
            <input
              class="input"
              type="text"
              id="nome"
              v-model="nome"
              placeholder="Digite um nome"
            />
          </div>
          <div class="input-container">
            <label class="input-label" for="idade">Idade</label>
            <input
              class="input"
              type="number"
              id="idade"
              v-model="idade"
              placeholder="Digite sua idade"
            />
          </div>
        </form>
        <footer class="modal-footer">
          <button class="btn-cancel" type="button" @click="closeCreateModal">
            Cancelar
          </button>
          <button class="btn-save" type="submit" @click="createUser">
             Salvar
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
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
  }

  .modal {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 40px #00000029;
    border: 1px solid #DFE3E6;
    border-radius: 10px;
    opacity: 1;
    width: 80%;
  }

  .modal-header {
    display: flex;
    position: relative;
    border-bottom: 1px solid #eeeeee;
  }

  .modal-header-title {
    text-align: left;
    font: normal normal 600 18px/27px Poppins;
    letter-spacing: 0px;
    color: #03181EDE;
    opacity: 1;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    display: flex;
    justify-content: flex-end;
  }

  .modal-form {
    position: relative;
    padding: 20px 10px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin: 10px;
  }

  .input {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #DFE3E6;
    border-radius: 4px;
    font: normal normal normal 14px/20px Open Sans;
    padding: 10px;
    opacity: 1;
  }

  .input-label {
    color: #000000DE;
    text-align: left;
    font: normal normal normal 12px/24px Open Sans;
    font-size: 1.0em;
    letter-spacing: 0px;
    margin: 10px 5px;
    opacity: 1;
  }

  .btn-close {
    background: #DDDFE5 0% 0% no-repeat padding-box;
    border-radius: 50%;
    opacity: 1;
    height: 30px;
    width: 30px;
  }

 .btn-cancel {
    width: 87px;
    height: 40px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border: 1px solid #E2B874;
    border-radius: 4px;
    color: #E2B874;
    margin: 0px 15px;
    opacity: 1;
    width: 30%;
  }

  .btn-save {
    width: 87px;
    height: 40px;
    background: #E2B874 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border: 1px solid #E2B874;
    border-radius: 4px;
    color: #FFFFFF;
    opacity: 1;
    width: 30%;
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

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          <h2 class="modal-header-title">Adicionar</h2>
          <button class="btn-close" type="button" @click="closeCreateModal">
            <p class="btn-close-text">X</p>
          </button>
        </header>
        <form class="modal-form" id="modalDescription">
          <div>
          <label class="input-label" for="id">ID</label>
          <input class="input" type="text" id="id" v-model="id" placeholder="Digite um ID" />
        </div>
        <div>
          <label class="input-label" for="nome">Nome</label>
          <input
            class="input"
            type="text"
            id="nome"
            v-model="nome"
            placeholder="Digite um nome"
          />
        </div>
        <div>
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
            <p class="btn-cancel-text">Cancelar</p>
          </button>
          <button class="btn-save" type="submit" @click="createUser">
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
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid var(---dfe3e6-border);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 6px 40px #00000029;
    border: 1px solid #DFE3E6;
    border-radius: 10px;
    opacity: 1;
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

  .modal-header-title {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600)
    var(--unnamed-font-size-18)/var(--unnamed-line-spacing-27) var(--unnamed-font-family-poppins);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(--unnamed-color-03181e);
    text-align: left;
    font: normal normal 600 18px/27px Poppins;
    letter-spacing: 0px;
    color: #03181EDE;
    opacity: 1;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-form {
    position: relative;
    padding: 20px 10px;
  }

  .input {
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid var(---dfe3e6-border);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 1px solid #DFE3E6;
    border-radius: 4px;
    font: normal normal normal 14px/20px Open Sans;
    opacity: 1;
  }

  .input-label {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal)
    var(--unnamed-font-size-12)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-open-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(---000000-87-);
    text-align: left;
    font: normal normal normal 12px/24px Open Sans;
    letter-spacing: 0px;
    color: #000000DE;
    opacity: 1;
  }

  .btn-close {
    background: #707E8A 0% 0% no-repeat padding-box;
    opacity: 1;
  }

  .btn-close-text {
    background: #707E8A 0% 0% no-repeat padding-box;
    opacity: 1;
  }

 .btn-cancel {
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid var(---e2b874-primary);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border: 1px solid #E2B874;
    border-radius: 4px;
    opacity: 1;
  }

  .btn-cancel-text {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600)
    var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(---e2b874-primary);
    text-align: left;
    font: normal normal 600 14px/21px Poppins;
    letter-spacing: 0px;
    color: #E2B874;
    opacity: 1;
  }

  .btn-save-text {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600)
    var(--unnamed-font-size-14)/var(--unnamed-line-spacing-21) var(--unnamed-font-family-poppins);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(--unnamed-color-ffffff);
    text-align: left;
    font: normal normal 600 14px/21px Poppins;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
  }

  .btn-save {
    background: var(---e2b874-primary) 0% 0% no-repeat padding-box;
    background: #E2B874 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border-radius: 4px;
    opacity: 1;
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

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          <h2 class="modal-header-title-delete">Excluir</h2>
          <button class="btn-close" type="button" @click="closeDeleteModal">
            X
          </button>
        </header>
        <section class="modal-delete-form" id="modalDescription">
          <img src="../assets/checagem_errada.svg" />
          <p class="delete-text">Confirma a exclusão deste registro?</p>
        </section>
        <footer class="modal-footer">
          <button class="btn-cancel-delete" @click="closeDeleteModal">
            Cancelar
          </button>
          <button class="btn-delete" type="submit" @click="deleteUser">
            Excluir
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
      id: this.idUser,
    };
  },

  name: 'Modal',

  methods: {
    closeDeleteModal() {
      this.$emit('close');
    },

    deleteUser() {
      axios
        .delete(`${server.baseURL}/${this.id}`)
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

  .modal-header-title-delete {
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(---000000-87-);
    text-align: left;
    font: normal normal 600 18px/27px Poppins;
    letter-spacing: 0px;
    color: #000000DE;
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
    align-items: center;
  }

  .modal-form {
    position: relative;
    padding: 20px 10px;
  }

  .modal-delete-form {
    display: flex;
    align-items: center;
    padding: 30px;
  }

  .delete-text {
    color: #000000DE;
    font: normal normal normal 14px/18px Open Sans;
    letter-spacing: 0px;
    margin-left: 10px;
    text-align: left;
    opacity: 1;
  }

  .btn-cancel-delete {
    width: 87px;
    height: 40px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border: 1px solid #D83636;
    border-radius: 4px;
    color: #D83636;
    margin: 0px 15px;
    opacity: 1;
    width: 30%;
  }

  .btn-delete {
    width: 87px;
    height: 40px;
    background: #D83636 0% 0% no-repeat padding-box;
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

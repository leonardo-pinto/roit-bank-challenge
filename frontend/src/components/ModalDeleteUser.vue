<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header" id="modalTitle">
          <h2 class="modal-header-title-delete">Excluir</h2>
          <button class="btn-close" type="button"       @click="closeDeleteModal">
            <p class="btn-close-text">X</p>
          </button>
        </header>
        <section class="modal-form" id="modalDescription">
          <p class="delete-icon">X</p>
          <p class="delete-text">Confirma a exclusão deste registro?</p>
        </section>
        <footer class="modal-footer">
          <button type="btn-cancel-delete" @click="closeDeleteModal">
            <p class="btn-cancel-delete-text">Cancelar</p>
          </button>
          <button class="btn-delete" type="submit" @click="deleteUser">
            <p class="btn-delete-text">Excluir</p>
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

  .modal-header-title-delete {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600)
    var(--unnamed-font-size-18)/var(--unnamed-line-spacing-27) var(--unnamed-font-family-poppins);
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
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }

  .modal-form {
    position: relative;
    padding: 20px 10px;
  }

  .delete-icon {
    /* background: transparent url('img/checagem_errada.png') 0% 0% no-repeat padding-box; */
    background: transparent 0% 0% no-repeat padding-box;
    opacity: 1;
  }

  .delete-text {
  font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal)
  var(--unnamed-font-size-14)/var(--unnamed-line-spacing-18) var(--unnamed-font-family-open-sans);
  letter-spacing: var(--unnamed-character-spacing-0);
  color: var(---000000-87-);
  text-align: left;
  font: normal normal normal 14px/18px Open Sans;
  letter-spacing: 0px;
  color: #000000DE;
  opacity: 1;
    }

  .btn-cancel-delete {
    background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
    border: 1px solid var(--unnamed-color-d83636);
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border: 1px solid #D83636;
    border-radius: 4px;
    opacity: 1;
  }

  .btn-cancel-delete-text {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600) 15px/23px
    var(--unnamed-font-family-poppins);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(--unnamed-color-d83636);
    text-align: left;
    font: normal normal 600 15px/23px Poppins;
    letter-spacing: 0px;
    color: #D83636;
    opacity: 1;
  }

  .btn-delete {
    background: var(--unnamed-color-d83636) 0% 0% no-repeat padding-box;
    background: #D83636 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border-radius: 4px;
    opacity: 1;
  }

  .btn-delete-text {
    font: var(--unnamed-font-style-normal) normal
    var(--unnamed-font-weight-600) 15px/23px var(--unnamed-font-family-poppins);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(--unnamed-color-ffffff);
    text-align: left;
    font: normal normal 600 15px/23px Poppins;
    letter-spacing: 0px;
    color: #FFFFFF;
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

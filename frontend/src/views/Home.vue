<template>
  <div class="main-container">
    <modal-create-user
      v-if="isCreateModalVisible"
      @close="closeCreateModal"
    />
    <modal-update-user
      v-if="isUpdateModalVisible"
      :idUser="idUser"
      @close="closeUpdateModal"
    />
    <modal-delete-user
      v-if="isDeleteModalVisible"
      :idUser="idUser"
      @close="closeDeleteModal"
    />
    <div class="register-container">
      <button class="btn-register" type="button" @click="openCreateModal">
        <p class="btn-register-text">Cadastrar</p>
      </button>
    </div>
    <div>
      <div v-if="users.length === 0">
        <h2>Não existem usuários cadastrados</h2>
      </div>
    </div>

    <div>
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.nome }}</td>
            <td>{{ user.idade }}</td>
            <td>
              <div>
                <div>
                  <button @click="openUpdateModal(user.id)">Editar</button>
                  <button @click="openDeleteModal(user.id)">Deletar</button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ModalCreateUser from '../components/ModalCreateUser.vue';
import ModalUpdateUser from '../components/ModalUpdateUser.vue';
import ModalDeleteUser from '../components/ModalDeleteUser.vue';
import server from '../server';

export default {
  components: {
    'modal-create-user': ModalCreateUser,
    'modal-update-user': ModalUpdateUser,
    'modal-delete-user': ModalDeleteUser,
  },

  data() {
    return {
      users: [],
      isCreateModalVisible: false,
      isUpdateModalVisible: false,
      isDeleteModalVisible: false,
      idUser: '',
    };
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    getAllUsers() {
      axios
        .get(server.baseURL)
        .then((res) => {
          this.users = res.data;
        });
    },

    deleteUser(id) {
      axios
        .delete(`server.baseURL/${id}`)
        .then(() => window.location.reload());
    },

    openCreateModal() {
      this.isCreateModalVisible = true;
    },

    closeCreateModal() {
      this.isCreateModalVisible = false;
    },

    openDeleteModal(id) {
      this.idUser = id;
      this.isDeleteModalVisible = true;
    },

    closeDeleteModal() {
      this.isDeleteModalVisible = false;
    },

    openUpdateModal(id) {
      this.idUser = id;
      this.isUpdateModalVisible = true;
    },

    closeUpdateModal() {
      this.isUpdateModalVisible = false;
    },
  },

};

</script>

<style scoped>

  /* .main-container {
    border: 1px solid var(---dfe3e6-border);
    background: #F2F3F5 0% 0% no-repeat padding-box;
    border: 1px solid #DFE3E6;
    border-radius: 10px 10px 0px 0px;
    opacity: 1;
  } */

  .register-container {
    display: flex;
    padding: 10px;
  }

  .btn-register {
    background: var(---e2b874-primary) 0% 0% no-repeat padding-box;
    background: #E2B874 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border-radius: 4px;
    opacity: 1;
  }

  .btn-register-text {
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

  .user-table {
    border: 1px solid var(---dfe3e6-border);
    background: #F2F3F5 0% 0% no-repeat padding-box;
    border: 1px solid #DFE3E6;
    border-radius: 10px 10px 0px 0px;
    opacity: 1;
  }

  th {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-600)
    var(--unnamed-font-size-14)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-open-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(---000000-54-);
    text-align: left;
    font: normal normal 600 14px/24px Open Sans;
    letter-spacing: 0px;
    color: #0000008A;
    opacity: 1;
  }

  tr {
    border: 1px solid var(---dfe3e6-border);
    background: 0% 0% no-repeat padding-box;
    border: 1px solid #DFE3E6;
    border-radius: 0px 0px 10px 10px;
    opacity: 1;
  }

  td {
    font: var(--unnamed-font-style-normal) normal var(--unnamed-font-weight-normal)
    var(--unnamed-font-size-13)/var(--unnamed-line-spacing-24) var(--unnamed-font-family-open-sans);
    letter-spacing: var(--unnamed-character-spacing-0);
    color: var(---000000-87-);
    text-align: left;
    font: normal normal normal 13px/24px Open Sans;
    letter-spacing: 0px;
    color: #000000DD;
    opacity: 1;
  }
</style>

<template>
  <div>
    <h1 class="main-title">Teste Engenheiro de Software Full Stack</h1>
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
    <div class="main-container">
      <div class="register-container">
        <button class="btn-register" type="button" @click="openCreateModal">
          Cadastrar
        </button>
      </div>
      <div>
        <div v-if="users.length === 0">
          <h3>Não existem usuários cadastrados</h3>
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
                <div class="table-btn-container">
                  <button class="table-btn" @click="openUpdateModal(user.id)">
                    <img src="../assets/eye.svg" />
                  </button>
                  <button class="table-btn" @click="openDeleteModal(user.id)">
                    <img src="../assets/trash.svg" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
  .main-container {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 3px 3px #00000029;
    margin: auto;
    padding: 10px;
    width: 40%;
  }

  .main-title {
    text-align: center;
    font-size: 1.5em;
    letter-spacing: 0px;
    color: #000000DE;
    opacity: 1;
  }

  .register-container {
    display: flex;
    padding: 10px;
  }

  .btn-register {
    width: 113px;
    height: 40px;
    background: #E2B874 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 3px #00000029;
    border: 1px solid #E2B874;
    border-radius: 4px;
    color: #FFFFFF;
    letter-spacing: 0px;
    text-align: center;
    opacity: 1;
  }

  .table-btn-container {
    display: flex;
    justify-content: center;
  }
  .table-btn {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    margin: 0px 8px;
    overflow: hidden;
    outline: none;
  }

  .user-table {
    background: #F2F3F5 0% 0% no-repeat padding-box;
    border-radius: 4px;
    margin: auto;
    opacity: 1;
    width: 95%;
    border-collapse: collapse;
  }

  th {
    color: #0000008A;
    font: normal normal 600 14px/24px Open Sans;
    font-size: 1.1em;
    letter-spacing: 0px;
    padding: 8px;
    text-align: left;
    opacity: 1;
  }

  tbody {
    background-color: white;
  }

  tr {
    border: 1px solid #DFE3E6;
    border-radius: 0px 0px 10px 10px;
    opacity: 1;
  }

  td {
    background-color: white;
    color: #000000DD;
    font: normal normal normal 13px/24px Open Sans;
    font-size: 1.1em;
    letter-spacing: 0px;
    text-align: left;
    padding: 8px;
    opacity: 1;
  }
</style>

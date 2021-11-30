<template>
  <div>
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
    <div>
      <button type="button" @click="openCreateModal">Cadastrar</button>
    </div>
    <div>
      <div v-if="users.length === 0">
        <h2>Não existem usuários cadastrados</h2>
      </div>
    </div>

    <div>
      <table>
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
// import server from '../server';

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
        .get('http://localhost:3000/user')
        .then((res) => {
          this.users = res.data;
        });
    },

    deleteUser(id) {
      axios
        .delete(`http://localhost:3000/user/${id}`)
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

</style>

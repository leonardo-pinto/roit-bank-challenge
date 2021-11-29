<template>
  <div>
    <modal-create-user v-show="isModalVisible" @close="closeModal" />
    <div>
      <button type="button" @click="openModal">Cadastrar</button>
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
                  <button>Editar</button>
                  <button @click="deleteUser(user.id)">Deletar</button>
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
// import server from '../server';

export default {
  components: {
    'modal-create-user': ModalCreateUser,
  },

  data() {
    return {
      users: [],
      isModalVisible: false,
    };
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

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
  },

};

</script>

<style scoped>

</style>

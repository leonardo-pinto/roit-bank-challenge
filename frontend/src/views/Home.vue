<template>
  <div>
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
// import server from '../server';

export default {

  data() {
    return {
      users: [],
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
      console.log(id);
      axios
        .delete(`http://localhost:3000/user/${id}`)
        .then(() => window.location.reload());
    },
  },

};

</script>

<style scoped>

</style>

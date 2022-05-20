<template>
  <q-page class="flex flex-center">
    <div class="absolute-top q-pa-md">
      <q-form @submit="addTask" @reset="onReset" class="q-gutter-md">
        <div>
          <q-input
            color="primary"
            v-model="task"
            label="Descrição da Tarefa"
            maxlength="30"
            dense
            style="border: 30px"
          >
            <template v-slot:append>
              <q-btn size="sm" round dense icon="add" @click="addTask()" color="blue-grey-6" :disable="!task"/>
            </template>
          </q-input>
        </div>
      </q-form>
      <div class="q-pt-sm">
        <q-expansion-item
          dense
          class="shadow-1 overflow-hidden"
          style="border-radius: 10px"
          icon="expand_more"
          label="Em aberto"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
          default-opened
        >
          <div v-for="(t, index) in tasks" :key="t.idTask">
            <div dense v-if="index === 0" class="bg-blue-grey-2 text-grey-9 text-center" style="font-size: X-small;heigth: 10px"><q-icon name="west" /> ARRASTE PARA REMOVER DEFINITIVAMENTE <q-icon name="east" /></div>
            <q-list bordered dense v-if="t.statusTask === 'A'" class="text-primary">
            <q-slide-item @left="onLeft(t.idTask, index)" @right="onLeft(t.idTask, index)" dense left-color="red-6" label="Excluir">
              <q-item dense>
                <q-item-section>{{t.dsTask}}</q-item-section>
                <q-item-section top side>
                  <div class="text-grey-8">
                    <q-btn outline round color="primary" icon="done"  size="xs" @click="concluirTask(t.idTask, index)"/>
                  </div>
                </q-item-section>
              </q-item>
              <template v-slot:right>
                <q-icon name="delete" /> Excluir
              </template>
              <template v-slot:left>
                <q-icon name="delete" /> Excluir
              </template>
            </q-slide-item>
            </q-list>
          </div>
        </q-expansion-item>
        <br>
        <q-expansion-item
          dense
          class="shadow-1 overflow-hidden"
          style="border-radius: 10px"
          icon="expand_more"
          label="Concluídas"
          header-class="bg-blue-grey-8 text-white"
          expand-icon-class="text-white"
        >
        <div v-for="(t, index) in tasks" :key="t.idTask">
          <div dense v-if="index === 0" class="bg-blue-grey-2 text-grey-9 text-center" style="font-size: X-small;heigth: 10px"><q-icon name="west" /> ARRASTE PARA REMOVER DEFINITIVAMENTE <q-icon name="east" /></div>
            <q-list bordered dense v-if="t.statusTask === 'C'" class="text-red-6">
            <q-slide-item @left="onLeft(t.idTask, index)" @right="onLeft(t.idTask, index)" dense left-color="red-6" label="Excluir">
              <q-item dense>
                <q-item-section style="text-decoration: line-through">{{t.dsTask}}</q-item-section>
                <q-item-section top side>
                  <div class="text-grey-8">
                    <q-btn outline round color="red-6" icon="remove"  size="xs" @click="restaurar(t.idTask, index)"/>
                  </div>
                </q-item-section>
              </q-item>
              <template v-slot:left>
                <q-icon name="delete" /> Excluir
              </template>
              <template v-slot:right>
                <q-icon name="delete" /> Excluir
              </template>
            </q-slide-item>
          </q-list>
        </div>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      task: null,
      concluiTask: null,
      tasks: [{}],
      url: 'https://to-do-ihc.herokuapp.com'
    };
  },
  mounted() {
    this.carregaTasks();
  },
  methods: {
    async carregaTasks() {
      this.$axios
        .get(this.url + "/task/carregarTask/")
        .then((response) => {
          this.tasks = response.data;
        })
        .catch(() => {
          this.$q.notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    },
    async addTask() {
      const dados = {}
      if (this.task) {
        dados.dsTask = this.task
          const axiosConfig = {
            method: 'post',
            url: this.url + '/task/inserirTask/',
            data: dados
          }
          this.onReset()
          await this.$axios(axiosConfig.url, axiosConfig)
            .then(R => {
              this.tasks.push(R.data[0]);
            })
            .catch(this.AxiosCatch)
      }
    },
    async concluirTask(idtask, index) {
      const dados = {}
      dados.idTask = idtask
        const axiosConfig = {
          method: 'put',
          url: this.url + '/task/concluirTask/',
          data: dados
        }
        this.onReset()
        await this.$axios(axiosConfig.url, axiosConfig)
          .then(R => {
            this.tasks.splice(index, 1)
            this.tasks.push(R.data[0]);
          })
          .catch(this.AxiosCatch)
    },
    async restaurar(idtask, index) {
      const dados = {}
      dados.idTask = idtask
        const axiosConfig = {
          method: 'put',
          url: this.url + '/task/restaurar/',
          data: dados
        }
        this.onReset()
        await this.$axios(axiosConfig.url, axiosConfig)
          .then(R => {
            this.tasks.splice(index, 1)
            this.tasks.push(R.data[0]);
          })
          .catch(this.AxiosCatch)
    },
    async onLeft (idtask, index) {
      const dados = {}
      dados.idTask = idtask
        const axiosConfig = {
          method: 'delete',
           url: this.url + '/task/excluir/',
          data: dados
        }
        await this.$axios(axiosConfig.url, axiosConfig)
          .then(R => {
            this.tasks.splice(index, 1)
          })
          .catch(this.AxiosCatch)
    },

    onRight ({ reset }) {
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    },
    beforeDestroy () {
      clearTimeout(this.timer)
    },
    async onReset() {
      this.task = null
    },
  },
};
</script>

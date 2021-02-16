const App = {
    data() {
        return {
            servers: [],
            name: ''
        }
    },
    async mounted() {
        const res = await fetch('/api/server');
        this.servers = await res.json();
    },
    methods: {
        async createServer() {
            const data = {
                name: this.name,
                status: 'created'
            }

            const res = await fetch('/api/server', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const newServer = await res.json();

            this.name = ''
            this.servers.push(newServer)
            console.log(res)
        },
        async remove(id) {
            const res = await fetch(`/api/server/${id}`, {
                method: 'DELETE'
            });

            const { success, message } = await res.json();

            if (success) {
                this.servers = this.servers.filter(server => server.id !== id);
            } else {
                console.log(message)
            }
            
        }
    }
}


Vue.createApp(App).mount('#app');
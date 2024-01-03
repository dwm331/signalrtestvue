<template>
  <div class="hello">
  <h1>測試員 ID: {{ connectionId }}</h1>
  <h1>{{ msg }}</h1>
	<h4>收到BusUpdate訊息，呼叫API結果 {{ serverTime }}</h4>
    <button @click="onClickButton" >呼叫後端</button>
  </div>
</template>
<script>
import axios from 'axios';
	
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      serverTime: null,
      connectionId: null
    };
  },
  methods: {
    onClickButton() {
        console.log(this.$signalr)
        this.$signalr
            .invoke('SendMessage', JSON.stringify({"ID": this.connectionId, "Message": "我是測試員"}))
            .catch(function(err) {return console.error(err) })
    },
	GetSeverTime() {
        axios
            .get('http://localhost:5777/api/time')
            .then(
				response => {

					console.log(response);
					this.serverTime = response.data.serverTime;
				}
			)
            .catch(function (error) { // 请求失败处理
				console.log(error);
		});
    }
	
  },
  mounted () {
    console.log(this.$signalr)

    this.$signalr.on('BusUpdate', (res) => {
      console.log(res, '收到消息')
      this.GetSeverTime()
    })

    this.$signalr.on('SetHubConnId', (res) => {
      console.log(res, 'SetHubConnId 收到消息')
      this.connectionId = res
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
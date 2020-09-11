<template>
  <div id="app">
    <message-list :messages="messages" />
    <!-- <router-view /> -->
  </div>
</template>

<script>
import MessageList from "//components/MessageList";
export default {
  name: "App",
  components: {
    MessageList,
  },
  data: () => ({ messages: ["Hey John", "Howdy Paco"] }),
};
</script>

<template>
  <div class="midi-controller-header">
    <div class="error" v-if="error">{{ error }}</div>
    <div class="state" v-if="message">{{ message.data }}</div>
    <div class="information" v-if="message">
      <div>{{ message.target.manufacturer }}</div>
      <div>{{ message.target.name }}</div>
    </div>
    <div class="overlay" :style="{ backgroundColor }"/>
  </div>
</template>

<script>
import WebMidi from "webmidi";
import { setInterval, clearInterval } from "timers";

export default {
  name: "MidiController",
  data() {
    return {
      error: null,
      message: null,
      timers: [],
      backgroundColor: "transparent",
    };
  },
  mounted() {
    WebMidi.enable(err => {
      if (err) {
        console.error(err);
        this.error = err;

        return;
      }
      WebMidi.addListener("connected", this.addAllListeners);
      WebMidi.addListener("disconnected", this.removeAllListeners);

      this.timers = [
        setInterval(() => {
          console.log("f1");
          this.backgroundColor = "white";
          WebMidi.outputs.map(output =>
            output.playNote("C3", "all", { duration: 500 })
          );
          WebMidi.outputs.map(output =>
            output.playNote("D3", "all", { duration: 500 })
          );
        }, 500),
        setInterval(() => {
          console.log("f2");
          this.backgroundColor = "rgba(255, 200, 200)";
          WebMidi.outputs.map(output =>
            output.playNote("C4", "all", { duration: 500 })
          );
        }, 1000),
        setInterval(() => {
          console.log("f3");
          this.backgroundColor = "rgba(0, 200, 200)";
          // this.backgroundColor = `rgb(${this.message.data || "0,0,0"})`;
          WebMidi.outputs.map(output =>
            output.playNote("C2", "all", { duration: 100 })
          );
        }, 1200)
      ];
    });
  },
  beforeDestroy() {
    this.timers.map(timer => clearInterval(timer));
    WebMidi.disable();
  },
  methods: {
    removeAllListeners() {
      WebMidi.inputs.map(input => input.removeListener());
    },
    addAllListeners() {
      WebMidi.inputs.map(input => {
        if (!input.hasListener("midimessage", "all", this.callback)) {
          input.addListener("midimessage", "all", this.callback);
        }
      });
    },
    callback(message) {
      if (message.data && (message.data[0] !== 248 || !this.message)) {
        this.message = message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: -1;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.state {
  font-size: 10rem;
  line-height: 7.5rem;
}

.information {
  font-size: 0.8rem;
}
</style>

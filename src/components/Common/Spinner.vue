<template>

    <div class="v-spinner" v-show="loading && isValidLoading()">
      <div class="v-carregamento">
            <div id="v-loader">
              <div class="v-ring v-ring1" v-bind:style="spinnerBasicStyle">
              </div>
              <div class="v-ring v-ring2" v-bind:style="spinnerStyle">
              </div>
              <div class="v-ring v-ring3" v-bind:style="spinnerStyle">
            </div>
          </div>
      </div>
    </div>

</template>

<script>
export default {
  name: "SpinnerLoader",
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: "#1b75bb"
    },
    size: {
      type: String,
      default: "80px"
    },
    margin: {
      type: String,
      default: "2px"
    },
    radius: {
      type: String,
      default: "100%"
    }
  },
  data() {
    return {
       routeTypeName: ['Tela Inicial'],
    };
  },
  computed: {
    spinnerStyle() {
      return {
        height: this.size,
        width: this.size,
        border: parseFloat(this.size) / 10 + "px solid" + this.color,
        opacity: 0.4,
        borderRadius: this.radius
      };
    },
    spinnerBasicStyle() {
      return {
        height: this.size,
        width: this.size,
        position: "relative"
      };
    }
  },
  methods: {
    isValidLoading() {
      for (let i = 0; i <= this.routeTypeName.length; i++) {
        if (this.routeTypeName[i] === this.$router.currentRoute.name) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style lang="scss">

$SECONDARY: #b5cbda; /* BackGround */
$BLUEDARK: #1e3369;

.v-carregamento {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  display: -webkit-flex;
  align-content: center;
  justify-content: center;
  text-align: center;
  background-color: $SECONDARY;
  > div {
    margin-top: 10%;
  }
  #v-loader {
    margin: auto;
    position: relative;
    text-align: center;
  }
}

.v-spinner {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 1;
  z-index: 500000999;
}

.v-spinner .v-ring2 {
  -webkit-animation: v-ringRightRotate 2s 0s infinite linear;
  animation: v-ringRightRotate 2s 0s infinite linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  perspective: 800px;
  position: absolute;
  top: 0;
  left: 0;
}

.v-spinner .v-ring3 {
  -webkit-animation: v-ringLeftRotate 2s 0s infinite linear;
  animation: v-ringLeftRotate 2s 0s infinite linear;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  perspective: 800px;
  position: absolute;
  top: 0;
  left: 0;
}

@-webkit-keyframes v-ringRightRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
    transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
  }
}

@keyframes v-ringRightRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
    transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg);
  }
}

@-webkit-keyframes v-ringLeftRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
    transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
  }
}

@keyframes v-ringLeftRotate {
  0% {
    -webkit-transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
    transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg);
  }
}
</style>
<template>
  <div>
    <div v-if="modal" id="modal-1" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="closeModal">&times;</span>
        </div>
        <div class="modal-body">
          <img :src="url">
          <!-- <hr> -->
        </div>
        <div v-if="description || origin" class="modal-footer">
          <p>
            <span v-if="description" id="description"></span>
            <span v-if="origin" style="font-size: 12px"> Fonte: </span>
            <span id="origin" style="font-size: 12px"></span>
          </p>
        </div>
      </div>

      <div id="caption"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-picture",
  data() {
    return {
      modal: true
    };
  },
  props: ["url", "description", "origin"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
    outsideClick() {
      window.onclick = event => {
        var modal = document.getElementById("modal-1");
        if (event.target == modal) {
          this.closeModal();
        }
      };
    },
    transformText() {
      const selector = selector => document.querySelector(selector);

      if (selector("#description")) {
        selector("#description").innerHTML = this.description;
      }
      if (selector("#origin")) {
        selector("#origin").innerHTML = this.origin;
      }
    }
  },
  mounted() {
    this.outsideClick();
    this.transformText();
  }
};
</script>

<style scoped>
/* Add Animation */
.modal-content,
#caption {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.4s;
  -moz-animation-name: zoom;
  -moz-animation-duration: 0.4s;
  -o-animation-name: zoom;
  -o-animation-duration: 0.4s;
  animation-name: zoom;
  animation-duration: 0.4s;
}

@keyframes zoom {
  from {
    -webkit-transform: scale(0);
    -moz-transform: scale(0);
    -o-transform: scale(0);
  }

  to {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -o-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}

/* hr{
  width: 100%;
  margin: 10px;
} */

img {
  max-height: 800px;
  max-width: 80%;
  position: relative;
  margin: auto;
}

.modal {
  display: block;
  position: fixed;
  z-index: 999;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7);
  /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
  border: 1px solid #888;
  max-width: 60%;
  text-align: center;
  margin-bottom: 50px;
}

.modal-header {
  border: none;
}

.modal-footer {
  text-align: left;
  justify-content: center;
}

p {
  margin-bottom: 5px;
  display: block;
}

.close {
  color: #aaaaaa;
  text-align: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>

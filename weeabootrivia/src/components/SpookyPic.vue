<template>
<div>
  <b-button v-b-modal.jumpScare>Launch centered modal</b-button>
  <b-modal id="jumpScare" centered hide-footer hide-header hide-body no-fade size="xl" class="text-left">
      <video alt="jumpscare" width="1100px" height="800px" autoplay>
        <source src="../assets/video/jumpscare.mp4">
      </video>
  </b-modal>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>

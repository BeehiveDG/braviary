<template>
    <div class="row" id="add-eagle">

        <!-- <div style="width: 100%" data-toggle="modal" data-target="#addNewEagle" v-on:click="toggleShow"> -->
            <div class="col-12">
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#addNewEagle" v-on:click="toggleShow">+ Add New Eagle</button>

            </div>
            <!-- <span>+ Add New Eagle</span> -->
        <!-- </div> -->
        <!-- use the modal component, pass in the prop -->
        <div v-if="isShow">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper" v-on:click="toggleShow">
                        <div class="modal-container" @click.stop>
                            <div class="modal-body">
                                <form @submit.prevent="submit">
                                    <div class="form-group">
                                        <label for="EagleName">Name</label>
                                        <input v-model="name" type="text" class="form-control" id="EagleName" placeholder="Eagle Name">
                                    </div>
                                    <div class="form-group">
                                        <label for="EagleFrequency">Frequency</label>
                                        <input v-model="frequency" type="number" class="form-control" id="EagleFrequency" placeholder="Frequency" min="1">
                                    </div>
                                    <div class="form-group">
                                        <label for="EagleTolerance">Tolerance</label>
                                        <input v-model="tolerance" type="number" class="form-control" id="EagleTolerance" placeholder="Tolerance" min="1">
                                    </div>
                                    <button type="submit" class="btn btn-primary round-button">
                                        <font-awesome-icon :icon="['fas', 'paper-plane']"></font-awesome-icon>
                                        <span>Send</span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'add-eagle',
    data(){
        return{
            isShow: false,
            name: '',
            frequency: 1,
            tolerance: 1,
            showModal: false
        }
    },
    methods: {
        toggleShow(){
            this.isShow = !this.isShow;
        },
        clearForm(){
            this.name = '';
            this.frequency = 1;
            this.tolerance = 1;
        },
        submit(){
            let name = this.name;
            let frequency = parseInt(this.frequency);
            let tolerance = parseInt(this.tolerance);

            this.$store.dispatch('eagle/createEagle', { 
                name,
                frequency,
                tolerance
                })
                .then(response => { 
                    // clear and close form after successful eagle creation
                    this.toggleShow();
                    this.clearForm();
                })
                .catch(error => {
                    // failed to create eagle
                })
        }
    },
}
</script>

<style scoped>
    /* #addNewEagle {
        width: 100%;
        margin-top: 15px;
    } */
    #AddEagleButton {
        widows: 100%;
        height: 100%;
    }
</style>
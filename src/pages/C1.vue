<template>
  <v-container grid-list-xl style="margin-top: -20px;">
    <v-layout
      flex-child
      wrap
      align-center
      justify-center
      fill-height
    >
      <v-flex
        xs12
        md4
        d-flex
      >
        <v-sheet
          class="d-flex"
          color="grey lighten-3"
          height="424"
          style="background-image: url('https://cdn.vuetifyjs.com/images/cards/desert.jpg');background-size: 100% 100%;"
        >
          <sheet-footer>
            这是第一个
          </sheet-footer>
        </v-sheet>
      </v-flex>

      <v-flex
        xs12
        md4
        d-flex
      >
        <v-layout wrap>
          <v-flex xs6>
            <v-sheet
              class="d-flex"
              color="green lighten-3"
              height="150"
            >
              <sheet-footer>
                #2: (1r x 1c)
              </sheet-footer>
            </v-sheet>
          </v-flex>
          <v-flex xs6>
            <v-sheet
              class="d-flex"
              color="yellow lighten-3"
              height="150"
            >
              <sheet-footer>
                #3: (1r x 1c)
              </sheet-footer>
            </v-sheet>
          </v-flex>
          <v-flex xs12>

            <v-sheet
              class="d-flex"
              color="red lighten-3"
              height="250"
            >
              <sheet-footer>
                #5: (2r x 2c)
              </sheet-footer>
            </v-sheet>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
        md8
      >
        <v-sheet
          class="d-flex"
          color="teal lighten-3"
          height="424"
        >
          <sheet-footer>
            #4: (2r x 1c)
          </sheet-footer>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'C1',
    components: {
      SheetFooter: {
        functional: true,

        render (h, { children }) {
          return h('v-sheet', {
            staticClass: 'mt-auto align-center justify-center d-flex',
            props: {
              color: 'rgba(0, 0, 0, .36)',
              dark: true,
              height: 50
            }
          }, children)
        }
      }
    }
  }
</script>
<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>

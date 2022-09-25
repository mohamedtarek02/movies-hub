export default {
  data() {
    return {
      isLoading: false,
      isFormValid: true,
      movieName: {
        val: null,
        isValid: true,
      },
      movieDesc: {
        val: null,
        isValid: true,
      },
      movieImg: {
        val: null,
        name: "",
        isValid: true,
      },
      movieGenre: {
        val: null,
        name: null,
        isValid: true,
      },
    };
  },
  computed: {
    categories() {
      return this.$store.getters["categories/getCategories"];
    },
  },
  methods: {
    imgVal(event) {
      this.movieImg.name = event.target.files[0].name;
      this.movieImg.val = event.target.files[0];
      this.clearValidity("movieImg");
    },
    generId(id, name) {
      this.movieGenre.val = id;
      this.movieGenre.name = name;
      this.clearValidity("movieGenre");
    },
    clearValidity(input) {
      if (this[input].val === "") {
        return;
      } else {
        this[input].isValid = true;
      }
    },
    validation() {
      this.isFormValid = true;

      if (this.movieName.val === null || this.movieName.val === "") {
        this.movieName.isValid = false;
        this.isFormValid = false;
      }
      if (this.movieDesc.val === null || this.movieDesc.val === "") {
        this.movieDesc.isValid = false;
        this.isFormValid = false;
      }

      if (this.movieImg.val === null) {
        this.movieImg.isValid = false;
        this.isFormValid = false;
      }
      if (this.movieGenre.name === null || this.movieDesc.name === "") {
        this.movieGenre.isValid = false;
        this.isFormValid = false;
      }
    },
  },
};

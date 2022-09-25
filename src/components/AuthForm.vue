<template>
  <div class="form">
    <form @submit.prevent="submitForm">
      <div class="name-fields-con">
        <div class="first-name-field" v-if="showNameInputs">
          <label for="fName">First Name</label>
          <input
            type="text"
            id="fName"
            v-model.trim="fName.val"
            @input="clearValidity('fName')"
          />
          <div class="error-message-con">
            <span v-if="!fName.isValid" class="error-message"
              >Kindly insert your first Name.</span
            >
          </div>
        </div>
        <div class="last-name-field" v-if="showNameInputs">
          <label for="lName">Last Name</label>
          <input
            type="text"
            id="lName"
            v-model.trim="lName.val"
            @input="clearValidity('lName')"
          />
          <div class="error-message-con">
            <span v-if="!lName.isValid" class="error-message"
              >Kindly insert your last Name.</span
            >
          </div>
        </div>
      </div>
      <div class="form-control">
        <label for="email">E-Mail</label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @input="clearValidity('email')"
        />
        <div class="error-message-con">
          <span v-if="!email.isValid" class="error-message"
            >Your Email is required.</span
          >
        </div>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model.trim="password.val"
          @input="clearValidity('password')"
        />
        <div class="error-message-con">
          <span v-if="!password.isValid" class="error-message"
            >Password is required.</span
          >
        </div>
      </div>

      <base-button style="width: 100%" type="submit">{{
        buttonCaption
      }}</base-button>
      <div v-if="!showNameInputs">
        <p class="sign-up">
          Do not have an account?
          <base-button link to="sign-up" mode="flat">Sign Up</base-button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    showNameInputs: {
      type: Boolean,
      required: false,
    },
    buttonCaption: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      fName: {
        val: "john",
        isValid: true,
      },
      lName: {
        val: "doe",
        isValid: true,
      },
      email: {
        val: "admin@test.com",
        isValid: true,
      },
      password: {
        val: "admin",
        isValid: true,
      },
      isFormValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      if (this[input].val === "") {
        return;
      } else {
        this[input].isValid = true;
      }
    },
    validation() {
      this.isFormValid = true;
      if (this.showNameInputs) {
        if (this.fName.val === "") {
          this.fName.isValid = false;
          this.isFormValid = false;
        }
        if (this.lName.val === "") {
          this.lName.isValid = false;
          this.isFormValid = false;
        }
      }

      if (this.email.val === "") {
        this.email.isValid = false;
        this.isFormValid = false;
      }
      if (this.password.val === "") {
        this.password.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm() {
      this.validation();

      if (!this.isFormValid) {
        return;
      }

      this.$emit("submitForm", {
        name: this.fName.val + " " + this.lName.val,
        email: this.email.val,
        password: this.password.val,
      });
    },
  },
};
</script>

<style>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 32px 0;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}
.name-fields-con {
  display: flex;
  justify-content: space-between;
}

.first-name-field,
.last-name-field {
  width: 45%;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  font: inherit;
  background-color: rgb(37, 37, 37);
  outline: none;
  border: transparent;
  padding: 8px 12px;
  color: white;
}

input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
}

input:focus {
  border-bottom: 1px solid white;
}

.remember {
  margin-top: 10px;
}
input[type="checkbox"] {
  cursor: pointer;
  padding: 3px;
}

.remember-label {
  display: inline-block;
  margin-left: 5px;
  cursor: pointer;
  color: #a0a0a0;
}
.sign-up {
  margin-top: 40px;
  color: #a0a0a0;
}

.sign-up strong {
  color: white;
  cursor: pointer;
  display: inline-block;
  margin-left: 5px;
}
.error-message-con {
  position: relative;
}
.error-message {
  position: absolute;
  padding-top: 2px;
  color: #ff2121;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
}

/* Media */
@media (min-width: 320px) and (max-width: 480px) {
  .name-fields-con {
    flex-direction: column;
  }
  .first-name-field,
  .last-name-field {
    width: 100%;
    margin-bottom: 30px;
  }
  .form-control {
    margin: 0 0 30px;
  }
}
</style>

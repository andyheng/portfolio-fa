<template>
  <main>
    <div class="container">
      <div v-bind:class="alert" v-show="projectUploadingComplete">
        <p v-if="projectUploadingComplete">Project upload complete!</p>
        <p v-else>There was an error uploading the project.</p>
      </div>
      <div class="form-container" v-if="loggedIn">
        <h2>Add a new project to <em>{{currentPortfolio}}</em></h2>
        <div class="buttons-container">
          <button @click="setPortfolio('projects')" class="btn">Upload to main portfolio</button>
          <button @click="setPortfolio('personal')" class="btn">Upload to personal portfolio</button>
        </div>
        <form @submit.prevent="handleSubmit" class="form">
          <div class="form-field form-title" >
            <label for="project-title">Project title</label>
            <input type="text" id="project-title" v-model="project.title" required>
          </div>
          <div class="form-field">
            <label for="project-description">Project description</label>
            <textarea id="project-description" rows="5" v-model="project.description" required></textarea>
          </div>
          <div class="form-field">
            <label for="project-input-file" class="form-file">
              Select image(s)
              <input type="file" id="project-input-file" accept="image/*" @change="handleFileSelected" multiple="multiple" ref="imageInput" required>
            </label>
            <button type="button" class="form-file-clear" @click="resetAllFileInputs" v-if="images.length > 0">Clear all images</button>
            <p v-if="imageUploadInvalid">One or more of your files is not a valid image!</p>
          </div>
          <div class="file-image-preview">
            <img v-for="src in imageUrls" :key="src" :src="src" @click="handleRemoveFile(src)">
          </div>
          <div class="form-field form-submit">
            <button type="submit" class="form-submit-btn">Submit</button>
          </div>
        </form>
        <p v-if="projectUploading">Uploading project...</p>
      </div>
      <div v-else>
        You must be logged in to see this page.
      </div>
    </div>
  </main>
</template>

<script>
import { db, storageRef, auth } from "../main";

export default {
  data() {
    return {
      project: {
        title: "",
        description: ""
      },
      imageUrls: [],
      images: [],
      imageUploadValid: true,
      imageUploadInvalid: false,
      projectUploading: false,
      projectUploadingComplete: false,
      uploadHex: [],
      loggedIn: false,
      currentPortfolio: "projects"
    };
  },
  computed: {
    alert: function() {
      return this.projectUploadingComplete ? "alert-container alert-success" : "alert-container alert-failure"
    }
  },
  methods: {
    setPortfolio(port) {
      this.currentPortfolio = port;
    },
    addInput() {
      this.inputs.push({
        id: `fruit${this.counter++}`,
        label: "Upload image",
        value: ""
      });
    },
    handleFileSelected(ev) {
      const files = ev.target.files;
      const filesArr = Array.from(files);
      this.validateFileSelected(filesArr);
      if (!this.imageUploadInvalid) {
        this.previewFileImages(filesArr);
        this.storeImageFile(filesArr);
      }
    },
    validateFileSelected(files) {
      for (let i = 0; i < files.length; i++) {
        let filename = files[i].name;
        let validExt = ["jpg", "jpeg", "png"];
        let ext = filename
          .split(".")
          .pop()
          .toLowerCase();
        this.validateFileType(files[i]);
        if (filename.lastIndexOf(".") <= 0 || validExt.indexOf(ext) < 0) {
          this.imageUploadInvalid = true;
          this.resetFileInputValue();
          return;
        }
        this.imageUploadInvalid = false;
      }
    },
    getMimeType(sig) {
      switch (sig) {
        case "89504E47":
          return "image/png";
        case "47494638":
          return "image/gif";
        case "25504446":
          return "application/pdf";
        case "FFD8FFE1":
        case "FFD8FFDB":
        case "FFD8FFE0":
          return "image/jpeg";
        case "504B0304":
          return "application/zip";
        default:
          return "Unknown filetype";
      }
    },
    validateFileType(file) {
      const fileReader = new FileReader();
      fileReader.onloadend = e => {
        if (e.target.readyState === FileReader.DONE) {
          const uint = new Uint8Array(e.target.result);
          let bytes = [];
          uint.forEach(byte => {
            bytes.push(byte.toString(16));
          });
          const hex = bytes.join("").toUpperCase();
          this.uploadHex.push(hex);
          let mimeResult = this.getMimeType(hex);
          if (mimeResult.indexOf("image") < 0) {
            this.imageUploadInvalid = true;
            this.resetFileInputValue();
            return;
          }
        }
      };
      const blob = file.slice(0, 4);
      fileReader.readAsArrayBuffer(blob);
    },
    previewFileImages(files) {
      files.forEach(file => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          this.imageUrls.push(fileReader.result);
        });
        fileReader.readAsDataURL(file);
      });
    },
    handleRemoveFile(src) {
      this.images.forEach(image => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          if (src === fileReader.result) {
            let arrWithoutRemovedFile = this.images.filter(fileToRemove => {
              return fileToRemove !== image;
            });
            let arrWithoutRemovedSrc = this.imageUrls.filter(urlToRemove => {
              return urlToRemove !== src;
            });
            this.imageUrls = arrWithoutRemovedSrc;
            this.images = arrWithoutRemovedFile;
          }
        });
        fileReader.readAsDataURL(image);
      });
    },
    storeImageFile(files) {
      files.forEach(file => {
        this.images.push(file);
      });
    },
    handleSubmit() {
      if (this.imageUploadInvalid) {
        return;
      }
      auth.onAuthStateChanged(user => {
        user.getIdTokenResult().then(idTokenResult => {
          if (!idTokenResult.claims.admin) {
            alert("Not verified account")
            return;
          }
        })
      })
      this.projectUploading = true;
      const projectData = {
        t: this.project.title,
        d: this.project.description,
        i: []
      };
      db.collection(this.currentPortfolio)
        .add(projectData)
        .then(key => {
          let id = key.id;
          //upload promise (put returns a promise)
          const uploadImage = image => {
            let path = `images/${image.name}`;
            let ref = storageRef.child(path);
            return ref.put(image);
          };
          //resolve promises
          Promise.all(this.images.map(image => uploadImage(image))).then(
            snapshot => {
              //url promise (getdownloadurl() returns a promise)
              const getURL = image => {
                return image.ref.getDownloadURL();
              };
              //resolve promises
              Promise.all(snapshot.map(image => getURL(image)))
                .then(urlArr => {
                  const firebaseImageUrls = urlArr.map((url, i) => ({
                    id: i,
                    src: url
                  }));
                  const updateData = {
                    ...projectData,
                    i: firebaseImageUrls
                  };
                  db.collection(this.currentPortfolio)
                    .doc(id)
                    .update(updateData);
                })
                .then(() => {
                  this.projectUploading = false;
                  this.projectUploadingComplete = true;
                  this.resetAllFileInputs();
                  // resetting
                  this.project = {
                    ttitle: "",
                    description: ""
                  }
                  setTimeout(() => {
                    this.projectUploadingComplete = false;
                  }, 2500)
                });
            }
          );
        });
    },
    resetFileInputValue() {
      this.$refs.imageInput.value = "";
    },
    resetAllFileInputs() {
      this.resetFileInputValue();
      this.imageUrls = [];
      this.images = [];
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      user.getIdTokenResult().then(idTokenResult => {
        if (idTokenResult.claims.admin) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      })
    })
  }
};
</script>

<style scoped>
.container {
  margin-top: 1em;
  color: #fff;
}
.buttons-container {
  margin-top: 1em;
}
</style>

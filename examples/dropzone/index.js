const { FileReceiver } = require("../../index");

const container = document.querySelector("#dropZone");
const fr = new FileReceiver();
fr.on("file.received", file => {
  console.log("File Received", file);
});

// Make sure to prevent both these events, or the drop
// event will never fire
container.ondragenter = evt => {
  evt.preventDefault();
};
container.ondragover = evt => {
  evt.preventDefault();
};

container.ondrop = evt => {
  evt.preventDefault();
  fr.getEventImages(evt);
};

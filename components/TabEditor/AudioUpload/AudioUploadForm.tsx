import { useState } from "react";
import { MaxAudioSize } from "../../../constants";
import AudioUploadFileInput from "../AudioUpload/AudioUploadFileInput";
import Input from "../Input/Input";
import Button from "../Button/Button";

function AudioUploadForm() {
  const [formValues, setFormValues] = useState({ title: "", file: null });
  const [label, setLabel] = useState("Audio File");
  const handleAudioFile = (e) => {
    document.querySelector("#file-input").className = "";

    const file = (e.target as HTMLInputElement).files[0];

    if (!file) return;

    if (!file.type.match(/audio-*/)) return;

    if (file.size >= MaxAudioSize.Audio) {
      alert(`File size should be less than ${MaxAudioSize.Audio / 1000000}MB`);
      return;
    }

    setFormValues({ ...formValues, file });
    setLabel(file.name);
    (e.target as HTMLInputElement).value = null;
  };
  const handleClick = (e) => {
    console.log(formValues);
    if (!formValues.title) {
      document.querySelector("#title-input").className = "red-border";
    }
    if (!formValues.file) {
      document.querySelector("#file-input").className = "red-border";
    }

    if (formValues.title) {
      document.querySelector("#title-input").className = "";
    }
    if (formValues.file) {
      document.querySelector("#file-input").className = "";
    }

    if (formValues.title && formValues.file) {
      console.log(formValues);
    }
  };
  return (
    <form>
      <div id="title-input">
        <Input
          name="title"
          value={formValues.title}
          onChange={(e) => {
            document.querySelector("#title-input").className = "";
            setFormValues({ ...formValues, title: e.target.value });
          }}
          type="text"
          placeholder="Audio Title"
        />
      </div>
      <div id="file-input">
        <AudioUploadFileInput handleChange={handleAudioFile} label={label} />
      </div>
      <Button onClick={handleClick}>Upload</Button>
    </form>
  );
}

export default AudioUploadForm;
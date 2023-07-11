import React, { ChangeEvent, FC } from "react";
import styled from "styled-components";

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 9px 14px;
  cursor: pointer;
  transition: background-color 0.1s;
  font-weight: ${(p) => p.theme.font.weight.bold};
  border-radius: ${(p) => p.theme.radius.lg};
  background-color: ${(p) => p.theme.colors.grey[500]};
  font-size: ${(p) => p.theme.font.size.xxs};
  &:hover {
    background-color: ${(p) => p.theme.colors.grey[800]};
  }
`;

interface AudioUploadProps {
  handleChange: (e: ChangeEvent) => void;
  label?: string;
}

const AudioUploadFileInput: FC<AudioUploadProps> = ({
  handleChange,
  label,
}) => (
  <>
    <Input
      name="audio"
      onChange={handleChange}
      type="file"
      id="audio-upload-input"
      accept="audio/*"
    />

    <Label htmlFor="audio-upload-input">{label}</Label>
  </>
);

export default AudioUploadFileInput;

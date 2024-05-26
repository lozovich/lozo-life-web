/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { TaskConstant } from 'store/reducers/task.reducer';

export interface TextAreaComboType {
  placeholder?: string;
  value?: string;

  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlurCapture?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocusCapture?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  className?: string;
  buttonText: string;
  onClose?: (e: any) => void;
  readOnly?: boolean;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
  textAreaId: string;
  submitButtonId: string;
}

export interface DropDownType {
  buttonId: string;
  buttonText: string | JSX.Element;
  title: string;
  children?: JSX.Element;
  buttonClass?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: JSX.Element;
  hideTitle?: boolean;
  render?: (props: any) => JSX.Element;
  buttonStyle?: React.CSSProperties;
  stopPropagation?: boolean;
  pos?: number;
}

export interface LabelSelectionType {
  clickOnEdit?: boolean;
  boardId?: string;
  task?: TaskConstant;
}

import React from "react";
import { DatePicker, Form, Input, TimePicker, Select, InputNumber } from "antd";

const FormItem = Form.Item;
const { Option } = Select;

const CreateAntField =
  (AntComponent) =>
    ({
      field,
      form,
      hasFeedback,
      label,
      selectOptions,
      submitCount,
      type,
      hasCustomError,
      ...props
    }) => {
      const touched = form.touched[field.name];
      const submitted = submitCount > 0;
      const hasError =
        field.name === "username" && hasCustomError !== ""
          ? hasCustomError
          : field.name === "username" && hasCustomError === ""
            ? form.errors["username"]
            : form.errors[field.name];
      const submittedError = hasError && submitted;
      const touchedError = hasError && touched;

      const onInputChange = (e) => {
        return form.setFieldValue(field.name, e?.target?.value);
      };

      const onChange = (value) => {
        return form.setFieldValue(field.name, value);
      };

      const onBlur = () => form.setFieldTouched(field.name, true);

      return (
        <div
          className={[
            "field-container ",
            hasCustomError ? "remove-form-item-margin" : null,
          ].join("")}
        >
          <FormItem
            label={label}
            hasFeedback={
              (hasFeedback && submitted) || (hasFeedback && touched)
                ? true
                : false
            }
            help={submittedError || touchedError ? hasError : false}
            validateStatus={submittedError || touchedError ? "error" : "success"}
          >
            <AntComponent
              size="large"
              {...field}
              {...props}
              onBlur={props.onBlur ? props.onBlur : onBlur}
              onChange={
                props.onChange ? props.onChange : type ? onInputChange : onChange
              }
            >
              {selectOptions &&
                selectOptions.map((v, i) => (
                  <Option
                    key={i}
                    value={
                      v.Name
                    }
                  >
                    {v.Name}
                  </Option>
                ))}
            </AntComponent>
          </FormItem>
        </div>
      );
    };

CreateAntField.defaultProps = {
  onBlur: null,
  onChange: null,
};

export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTextArea = CreateAntField(Input.TextArea);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntPassword = CreateAntField(Input.Password);
export const AntInputNumber = CreateAntField(InputNumber);

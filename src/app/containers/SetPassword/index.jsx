import React, { useState } from "react";
import styled from "styled-components";
import { Formik } from "formik";
import {
  Input,
  Tooltip,
  Loading,
  Checkbox,
  InputWrapper,
  Button,
} from "ofd-ui-toolkit";
import { maxLength, minLength, required } from "../../helpers/validation";
import * as yup from "yup";

const Wrapper = styled.div`
  margin: 0 auto;
  margin-top: 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-width: 460px;
`;

const Heading = styled.span`
  font-size: 20px;
  line-height: 1.3;
  font-weight: normal;
  margin-bottom: 50px;
`;

const Label = styled.span`
  left: -100px;
  top: 10px;
  font-size: 17px;
  line-height: 1.47;
  color: ${(props) => props.color || props.theme.gray};
  text-align: left;
  width: 100%;
`;

const StyledInputWrapper = styled(InputWrapper)`
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const InputWithTooltipWrapper = styled("div")`
  display: flex;
`;
const CheckboxWrapper = styled("div")`
  display: flex;
  align-items: flex-start;
  margin-bottom: 36px;
`;
const TermsLink = styled.a`
  color: blue;
`;
const FieldTooltip = styled(Tooltip)`
  position: absolute;
  right: -30px;
`;
const SubmitButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
`;
const QuestionBubble = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: gray;
  font-size: 12px;
  cursor: pointer;
  :hover {
    background-color: #ffdc7d;
  }
`;

const passwordRegex =
  /^(?=.*?[A-ZА-Я])(?=.*?[a-zа-я])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const tooltipText =
  "Пароль должен содержать не менее 8 символов, заглавные и строчные буквы, цифры и специальные символы: ! @ # $ % ^ & * ( ) - _ + = ; : , ./ ? | ` ~ [ ] { }";
const SetPassword = ({ title }) => {
  const isLoading = false;
  const requiredText = "Поле должно быть заполнено";

  const validationSchema = yup.object({
    password: yup
      .string()
      .matches(passwordRegex, tooltipText)
      .min(8, minLength(8))
      .max(16, maxLength(16))
      .required(requiredText),
    passwordConfirmation: yup
      .string()
      .min(8, minLength(8))
      .max(16, maxLength(16))
      .required(requiredText),
  });

  return (
    <Wrapper>
      <Loading
        loadingList={[isLoading]}
        withWrapper
        actualHeight="calc(100% + 66px)"
      >
        <Heading>{title}</Heading>
        <Formik
          initialValues={{
            password: "",
            passwordConfirmation: "",
            agreeWithTerms: false,
          }}
          onSubmit={(values) => onSubmit(values)}
          validateOnMount
          validationSchema={validationSchema}
        >
          {({
            values,
            isValid,
            touched,
            errors,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <>
                <StyledInputWrapper
                  style={{ marginBottom: "30px", marginRight: 0 }}
                >
                  <Label>Пароль</Label>
                  <InputWithTooltipWrapper>
                    <Input
                      withEye
                      type="password"
                      value={values.password}
                      onChange={({ target: { value } }) =>
                        setFieldValue("password", value)
                      }
                      noMarginRight
                      small
                      touched={touched.password}
                      error={touched.password && errors.password}
                      style={{ marginBottom: 0 }}
                      errorMsgStyles={{ marginTop: "8px" }}
                      onBlur={() => setFieldTouched("password")}
                    />

                    <FieldTooltip
                      text={tooltipText}
                      isActive={true}
                      arrowPosition="left"
                      textStyle={{ left: "40px", top: "0px", width: "300px" }}
                      wrapperStyle={{ position: "absolute", right: "-30px" }}
                      childrenWrapperStyle={{ width: "100%" }}
                    >
                      <QuestionBubble style={{ marginTop: "15px" }}>
                        ?
                      </QuestionBubble>
                    </FieldTooltip>
                  </InputWithTooltipWrapper>
                </StyledInputWrapper>
                <StyledInputWrapper
                  style={{ marginBottom: "45px", marginRight: 0 }}
                >
                  <Label>Подтвердите пароль</Label>
                  <Input
                    withEye
                    type="password"
                    touched={touched.passwordConfirmation}
                    value={values.passwordConfirmation}
                    onChange={({ target: { value } }) =>
                      setFieldValue("passwordConfirmation", value)
                    }
                    noMarginRight
                    small
                    error={
                      touched.passwordConfirmation &&
                      values.passwordConfirmation !== values.password &&
                      "Пароли не совпадают"
                    }
                    style={{ marginBottom: 0 }}
                    errorMsgStyles={{ marginTop: "8px" }}
                    onBlur={() => setFieldTouched("passwordConfirmation")}
                  />
                </StyledInputWrapper>
                <CheckboxWrapper>
                  <Checkbox
                    checked={values.agreeWithTerms}
                    onChange={() =>
                      setFieldValue("agreeWithTerms", !values.agreeWithTerms)
                    }
                    style={{ marginRight: "30px" }}
                  />
                  <div
                    onClick={() =>
                      setFieldValue("agreeWithTerms", !values.agreeWithTerms)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Регистрируясь, я соглашаюсь с{" "}
                    <TermsLink>условиями оферты</TermsLink> на подключение к
                    облачным кассам
                  </div>
                </CheckboxWrapper>
                <SubmitButtonWrapper>
                  <Button
                    disabled={
                      !isValid ||
                      values.passwordConfirmation !== values.password
                    }
                    type="submit"
                    extendStyle={{ width: "300px" }}
                  >
                    Сохранить
                  </Button>
                </SubmitButtonWrapper>
              </>
            );
          }}
        </Formik>
      </Loading>
    </Wrapper>
  );
};

export default SetPassword;

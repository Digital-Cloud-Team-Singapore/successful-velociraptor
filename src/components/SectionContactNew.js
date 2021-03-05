import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { htmlToReact, markdownify } from "../utils";
import styled from "styled-components";

const FormDiv = styled.div`
  form {
    width: 100%;
  }
  .input-field {
    position: relative;
    width: 100$;
    height: 44px;
    line-height: 44px;
    margin-bottom: 40px;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #231f20;
    transition: 0.2s all;
    cursor: text;
  }
  input,
  textarea {
    width: 100%;
    border: 0;
    outline: 0;
    padding: 0.5rem 0;
    border-bottom: 2px solid #231f20;
    box-shadow: none;
    color: #111;
    background-color: transparent;
  }
  input,
  textarea:invalid {
    outline: 0;
    // color: #ff2300;
    //   border-color: #ff2300;
  }
  input:focus,
  input:valid {
    border-color: #006e74;
  }
  input:focus ~ label,
  input:valid ~ label {
    font-size: 14px;
    top: -24px;
    color: #006e74;
  }

  textarea:focus ~ label,
  textarea:valid ~ label {
    font-size: 14px;
    top: -24px;
    color: #006e74;
  }
`;

const Child = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    let body = {
      email_content: "testing 123",
      email_subject: "Passcode for UST onboarding",
      from_email: "noreply@ustdigital.io",
      to_email: "mike.zhang@ust.com",
    };
    fetch(
      "https://fc-ipa-dev-send-email.azurewebsites.net/api/sendemail?code=es3a8ms7tfL2YOn3vMZj9EmTy77JXJeSG1Z0/VcKak06e1AJvzZcZA==",
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );
  };
  // console.log(errors);
  let section = _.get(props, "section", null);
  return (
    <section
      id={_.get(section, "section_id", null)}
      className={
        "block contact-block bg-" +
        _.get(section, "background", null) +
        " outer"
      }
    >
      <div className="block-header inner-small">
        {_.get(section, "title", null) && (
          <h2 className="block-title">{_.get(section, "title", null)}</h2>
        )}
        {_.get(section, "subtitle", null) && (
          <p className="block-subtitle">
            {htmlToReact(_.get(section, "subtitle", null))}
          </p>
        )}
      </div>
      <div className="block-content inner-medium">
        {markdownify(_.get(section, "content", null))}
        {/* <FormDiv>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field">
              <input
                type="text"
                id="name"
                required
                name="First name"
                ref={register({ required: true, maxLength: 80 })}
              />
              <label for="name">First Name*</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                required
                name="Last name"
                ref={register({ required: true, maxLength: 80 })}
              />
              <label for="name">Last Name*</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                required
                name="Email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
              <label for="name">Email*</label>
            </div>

            <div className="input-field">
              <input
                type="tel"
                required
                name="Subject"
                ref={register({ required: true, minLength: 6, maxLength: 12 })}
              />
              <label for="name">Subject*</label>
            </div>
            <div className="input-field">
              <textarea
                type="are"
                required
                name="Message"
                ref={register({ required: true, maxLength: 80 })}
              />
              <label for="name">Message*</label>
            </div>

            <input type="submit" />
          </form>
        </FormDiv> */}
        <FormDiv>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field">
              <input
                type="text"
                id="name"
                required
                name="First name"
                ref={register({ required: true, maxLength: 80 })}
              />
              <label for="name">First Name*</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                required
                name="Last name"
                ref={register({ required: true, maxLength: 80 })}
              />
              <label for="name">Last Name*</label>
            </div>
            <div className="input-field">
              <input
                type="text"
                required
                name="Email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
              <label for="name">Email*</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                required
                name="Subject"
                ref={register({ required: true })}
              />
              <label for="name">Subject*</label>
            </div>
            <div className="input-field">
              <textarea
                type="area"
                required
                name="Message"
                ref={register({ required: true })}
              />
              <label for="name">Message*</label>
            </div>
            <button type="submit" className="button secondary">
              Click to submit
            </button>
          </form>
        </FormDiv>
      </div>
    </section>
  );
};

export default Child;

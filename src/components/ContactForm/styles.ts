import styled from "styled-components";

export const ContactContainer = styled("div")`
  display: flex;              // Enables flexbox
  justify-content: center;    // Horizontally center the content
  // align-items: center;        // Vertically center the content
  flex-direction: column;     // Stack children vertically
  // padding: 5rem 0;

  @media only screen and (max-width: 1024px) {
    // padding: 3rem 0;
  }
`;

export const FormGroup = styled("form")`
  width: 100%;
  // max-width: 520px;
  input:focus, textarea:focus {
    background-color: #F4DCDC;
  }

  @media only screen and (max-width: 1045px) {
    max-width: 100%;
    margin-top: 2rem;
  }
`;

export const Span = styled("span")<any>`
  display: block;
  font-weight: 600;
  color: #F4DCDC;
  height: 0.775rem;
  padding: 0 0.675rem;
`;

export const ButtonContainer = styled("div")`
  text-align: end;
  position: relative;

  @media only screen and (max-width: 414px) {
    padding-top: 0.75rem;
  }
`;

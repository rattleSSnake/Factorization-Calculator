import styled, { createGlobalStyle, keyframes } from "styled-components";

const screen = {
  mobile: "700px",
  tablet: "1000px",
};

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const lightTheme = {
  background_color: "white",
  color: "black",
  panel: "#dbdbdb",
};

export const darkTheme = {
  background_color: "#262626",
  color: "white",
  panel: "#3c3c3c",
};

export const globalStyles = createGlobalStyle`
  * { font-family: monospace }
  
  body {
    background-color: ${props => props.theme.background_color};
    color: ${props => props.theme.color};
    animation: ${fadeIn} 2s;
  }
  
  details > summary {
    font-weight: bold;
    font-size: 1.8vw;
    margin-bottom: 1vw;
  }
  
  @media screen and (max-width: 1000px) {details > summary {font-size: 3vw}}
  @media screen and (max-width: 700px) {
    form {margin-bottom: 100px}
    details > summary {font-size: 6vw; margin-bottom: 2vw}
  }
`;

export const title = styled.h1`
  margin-top: 8vh;
  text-align: center;
  font-size: 5vw;
  @media (max-width: ${screen.tablet}) {
    font-size: 6vw;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 12vw;
  }
`;

const panel = styled.details.attrs({ open: true })`
  width: 26vw;
  position: absolute;
  margin: 0 2vw;
  top: 30vh;
  @media (max-width: ${screen.tablet}) {
    width: 31vw;
    top: 35vh;
  }
  @media (max-width: ${screen.mobile}) {
    width: 80vw;
    position: relative;
    margin: 100px auto;
    top: 0;
    right: 0;
  }
`;

export const panelContent = styled.section`
  animation: ${fadeIn} 1s;
  background-color: ${props => props.theme.panel};
  border-radius: 1vw;
  padding: 1vw;
  @media (max-width: ${screen.tablet}) {
    font-size: 6vw;
  }
  @media (max-width: ${screen.mobile}) {
    padding: 3vw;
    border-radius: 3vw;
  }
`;

export const wrapper = styled.span`
  word-wrap: break-word;
  font-size: 1.4vw;
  display: block;
  margin: 1vw;
  @media (max-width: ${screen.tablet}) {
    font-size: 2vw;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 5vw;
    margin: 3vw;
  }
`;

export const options = styled(panel)`
  left: 0;
  font-weight: bold;
`;

export const results = styled(panel)`
  right: 0;
`; //hidding benchmarking box why?????

export const button = styled.button`
  margin: auto;
  display: block;
  text-align: center;
  padding: 0.5vw 0.8vw;
  border-radius: 0.5vw;
  font-size: 1.3vw;
  border: none;
  outline: none;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    filter: drop-shadow(0 0 10px white);
  }
  @media (max-width: ${screen.tablet}) {
    padding: 0.6vw 1vw;
    border-radius: 0.5vw;
    font-size: 2vw;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 4vw;
    padding: 1.5vw 2vw;
    border-radius: 1.5vw;
  }
`;

export const select = styled.select`
  font-size: 1.2vw;
  text-align: center;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: white;
  color: black;
  border-radius: 0.3vw;
  padding: 0.2vw;
  margin-left: 1vw;
  @media (max-width: ${screen.tablet}) {
    font-size: 1.5vw;
    padding: 0.5vw;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 4vw;
    border-radius: 1vw;
    padding: 1vw;
  }
`;

export const input = styled.input.attrs(({ type }) => ({
  type: type,
}))`
  border: none;
  outline: none;
  ${({ type }) => {
    switch (type) {
      case "checkbox":
        return `
          cursor: pointer;
          width: 1vw;
          height: 1vw;
          margin-left: 1vw;
          @media (max-width: ${screen.tablet}) {
            width: 1.5vw;
            height: 1.5vw;
          }
          @media (max-width: ${screen.mobile}) {
            width: 3vw;
            height: 3vw;
            margin-left: 2vw;
          }
        `;
      default:
        return `
          margin: 15vh auto 4vh auto;
          display: block;
          text-align: center;
          padding: 1.2vw 2.4vw;
          font-size: 1.8vw;
          border-radius: 1vw;
          &:hover {
            filter: drop-shadow(0 0 15px white);
          }
          @media (max-width: ${screen.tablet}) {
            margin-top: 20vh;
            font-size: 2.5vw;
            padding: 1.2vw;
          }
          @media (max-width: ${screen.mobile}) {
            font-size: 6vw;
            padding: 3vw;
            border-radius: 3vw;
            margin-bottom: 25px;
          }
        `;
    }
  }}
`;

export const arrowWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
`;

export const arrow = styled.span`
  cursor: pointer;
  user-select: none;
  font-size: 2.5vw;
  transition: transform 0.1s ease-in;
  display: inline-block;
  &:first-child:hover {
    transform: translate(0, -2px);
  }
  &:last-child:hover {
    transform: translate(0, 2px);
  }
`;

export const link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer nofollow",
})`
  color: #75a0f0;
  text-decoration: none;
`;

export const btBox = styled.section`
  animation: ${fadeIn} 0.5s;
  text-align: center;
  width: 40vw;
  border-radius: 1vw;
  padding: 1vw 4vw;
  color: black;
  background-color: #e2e2e2cc;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: ${screen.tablet}) {
    width: 50vw;
    border-radius: 2vw;
    padding: 2vw 4vw;
  }
  @media (max-width: ${screen.mobile}) {
    width: 80vw;
    border-radius: 2vw;
    padding: 2vw 4vw;
  }
`;

export const btHeading = styled.h2`
  font-size: 2.5vw;
  margin-top: 1vw;
  @media (max-width: ${screen.tablet}) {
    font-size: 3vw;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 5vw;
  }
`;

export const p = styled.p`
  text-align: left;
  font-size: 1.5vw;
  @media (max-width: ${screen.tablet}) {
    font-size: 2vw;
  }
  @media (max-width: ${screen.mobile}) {
    font-size: 3vw;
  }
`;

export const theme = styled.div`
  position: fixed;
  display: inline-flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  gap: 10px;
  padding: 1vw 4vw;
  font-size: 35px;
  bottom: 0;
`;

export const toogleSwitch = styled.span`
  position: relative;
  height: 30px;
  width: 60px;
`;

export const themeLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 34px;
  border-radius: 34px;
  background-color: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    height: 26px;
    width: 26px;
    margin: 4px;
    background-color: white;
    transition: 0.5s;
  }
`;
export const toogleTheme = styled.input`
  display: none;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${themeLabel} {
    background-color: #75a0f0;
    &::after {
      content: "";
      border-radius: 50%;
      height: 26px;
      width: 26px;
      margin-left: 30px;
    }
  }
`;

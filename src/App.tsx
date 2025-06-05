import CatSlider from "./components/CatSlider";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #000;
`;

function App() {
  return (
    <AppContainer>
      <CatSlider />
    </AppContainer>
  );
}

export default App;

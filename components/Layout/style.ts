import styled from "styled-components";
import { Container } from "../ui";

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  margin: 0 auto;
  width: 100%;
  position: relative;
`;

interface StyledContainerProps {
  hideRightSidebar?: boolean;
}

export const StyledContainer = styled(Container)<StyledContainerProps>``;

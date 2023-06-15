import styled from "styled-components";
import { Layout } from "../../constants";

export const Root = styled.div`
  overflow: hidden;
  border-radius: ${(p) => p.theme.radius.sm};
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(p) => p.theme.spacing.xs};
  background-color: ${(p) => p.theme.colors.general.white};
  border-bottom: 1px solid ${(p) => p.theme.colors.border.main};

  &:last-child {
    border-bottom: 0;
  }
`;

export const Action = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: ${(p) => p.theme.spacing.xxs};
  font-size: ${(p) => p.theme.font.size.sm};
`;

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.paddings.pageTop};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Loader = styled.div`
  border: 8px solid ${({ theme }) => theme.colors.primary};
  border-top: 8px solid ${({ theme }) => theme.colors.light};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

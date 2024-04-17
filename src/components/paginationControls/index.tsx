import React from "react";
import styled from "styled-components";
interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const StyledButton = styled.button`
  font-size: 1rem;
  padding: 0.25rem;
`;
const StyledSpan = styled.span`
  font-size: 1rem;
  padding: ${({ theme }) => theme.paddings.button};
`;
const PaginationControls: React.FC<Props> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 0) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <>
      <StyledButton onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </StyledButton>
      <StyledSpan>{`Page ${currentPage} of ${totalPages}`}</StyledSpan>
      <StyledButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </StyledButton>
    </>
  );
};

export default PaginationControls;

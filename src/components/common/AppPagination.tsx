import Pagination from "@mui/material/Pagination";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function AppPagination({
  page,
  totalPages,
  onPageChange
}: Props) {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, value) => onPageChange(value)}
      shape="rounded"
      showFirstButton
      showLastButton
      siblingCount={1}
      boundaryCount={1}
      sx={{
        "& .MuiPaginationItem-root": {
          fontWeight: 600,
          border: "1px solid var(--color-border)",
          color: "var(--color-primary)"
        },

        "& .Mui-selected": {
          backgroundColor:
            "var(--color-primary) !important",
          color: "#fff",
          borderColor: "var(--color-primary)"
        },

        "& .MuiPaginationItem-root:hover": {
          backgroundColor:
            "var(--color-primary-light)"
        }
      }}
    />
  );
}

export default AppPagination;
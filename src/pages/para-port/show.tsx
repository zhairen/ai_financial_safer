import { Show, useShow } from "@refinedev/core";
import { Box, Typography } from "@mui/material";

export const ParaPortShow = () => {
  const { queryResult } = useShow({
    resource: "para-ports",
  });

  const record = queryResult?.data?.data;

  return (
    <Show recordItemId={record?.port_code}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>组合详情</Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ fontWeight: "bold", minWidth: 100 }}>组合代码:</Typography>
            <Typography>{record?.port_code}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ fontWeight: "bold", minWidth: 100 }}>组合名称:</Typography>
            <Typography>{record?.port_name}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ fontWeight: "bold", minWidth: 100 }}>组合类型:</Typography>
            <Typography>{record?.port_type}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ fontWeight: "bold", minWidth: 100 }}>开始日期:</Typography>
            <Typography>{record?.start_date}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography sx={{ fontWeight: "bold", minWidth: 100 }}>结束日期:</Typography>
            <Typography>{record?.end_date || "未结束"}</Typography>
          </Box>
        </Box>
      </Box>
    </Show>
  );
};

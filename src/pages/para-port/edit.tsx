import { Edit, useForm } from "@refinedev/core";
import { Box, Button, TextField } from "@mui/material";

export const ParaPortEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "para-ports",
  });

  const record = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps} recordItemId={record?.port_code}>
      <Box component="form" {...formProps} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField name="port_code" label="组合代码" disabled />
        <TextField name="port_name" label="组合名称" required />
        <TextField name="port_type" label="组合类型" required />
        <TextField name="start_date" label="开始日期" type="date" InputLabelProps={{ shrink: true }} />
        <TextField name="end_date" label="结束日期" type="date" InputLabelProps={{ shrink: true }} />
        <Button type="submit" variant="contained" color="primary">
          更新
        </Button>
      </Box>
    </Edit>
  );
};

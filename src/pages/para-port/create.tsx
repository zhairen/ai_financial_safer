import { Create, useForm } from "@refinedev/core";
import { Box, Button, TextField } from "@mui/material";

export const ParaPortCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "para-ports",
    initialValues: {
      port_name: "",
      port_type: "",
      start_date: new Date().toISOString().split('T')[0],
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Box component="form" {...formProps} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField name="port_code" label="组合代码" required />
        <TextField name="port_name" label="组合名称" required />
        <TextField name="port_type" label="组合类型" required />
        <TextField name="start_date" label="开始日期" type="date" InputLabelProps={{ shrink: true }} />
        <Button type="submit" variant="contained" color="primary">
          保存
        </Button>
      </Box>
    </Create>
  );
};

import { useTable } from "@refinedev/core";  // 导入 Refine 的 useTable 钩子
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography 
} from "@mui/material";  // 导入 Material-UI 表格组件

export const ParaPortList = () => {
  // 使用 useTable 钩子请求后端 para-ports 接口
  const { tableQueryResult } = useTable({
    resource: "para-ports",  // 对应后端资源路径（与 App.tsx 中 resources 配置一致）
  });

  // 解构数据、加载状态、错误状态
  const { data, isLoading, error } = tableQueryResult;

  // 处理加载中状态
  if (isLoading) {
    return <Paper sx={{ p: 2 }}><Typography>加载中...</Typography></Paper>;
  }

  // 处理请求错误状态
  if (error) {
    return <Paper sx={{ p: 2, color: 'error.main' }}><Typography>数据获取失败</Typography></Paper>;
  }

  // 渲染数据表格
  return (
    <Paper sx={{ p: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>组合代码</TableCell>
            <TableCell>组合名称</TableCell>
            <TableCell>开始日期</TableCell>
            <TableCell>结束日期</TableCell>
            <TableCell>组合类型</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* 遍历后端返回的组合数据（假设数据格式为 { data: [...] }） */}
          {data?.data?.map((item) => (
            <TableRow key={item.port_code}>
              <TableCell>{item.port_code}</TableCell>
              <TableCell>{item.port_name}</TableCell>
              <TableCell>{new Date(item.start_date).toLocaleDateString()}</TableCell>
              <TableCell>{item.end_date ? new Date(item.end_date).toLocaleDateString() : "未结束"}</TableCell>
              <TableCell>{item.port_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

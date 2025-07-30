import { List } from "@refinedev/mui";
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';

// 定义表头和行样式（调整表头颜色）
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e3f2fd', // 浅蓝背景（金融行业常用色）
    color: '#2c3e50', // 深色文字（保持对比度）
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// 定义数据类型（字段均为字符串）
interface Portfolio {
  id: number;
  name: string;
  assets: string;
  profit: string; // 转换为带%的字符串
  startDate: string; // 转换为'YYYY-MM-DD'字符串
  endDate: string; // 转换为'YYYY-MM-DD'字符串
}

// 生成数据时直接转换类型
const createPortfolio = (
  id: number,
  name: string,
  assets: string,
  profit: number,
  startDate: string,
  endDate: string
): Portfolio => ({
  id,
  name,
  assets,
  profit: `${profit.toFixed(2)}%`.toString(), // 数字转字符串（带%）
  startDate: dayjs(startDate).format('YYYY-MM-DD'), // Dayjs对象转字符串
  endDate: dayjs(endDate).format('YYYY-MM-DD'), // Dayjs对象转字符串
});

const rows: Portfolio[] = [
  createPortfolio(1, '稳健组合', '股票(60%)/债券(40%)', 4.25, '2024-01-01', '2024-06-30'),
  createPortfolio(2, '进取组合', '外汇(70%)/黄金(30%)', 6.89, '2024-02-01', '2024-07-31'),
  createPortfolio(3, '平衡组合', '基金(50%)/现金(50%)', 3.12, '2024-03-01', '2024-08-31'),
];

export const PortfolioList = () => {
  const [filterStartDate, setFilterStartDate] = React.useState<Dayjs | null>(dayjs('2024-01-01'));
  const [filterEndDate, setFilterEndDate] = React.useState<Dayjs | null>(dayjs('2024-06-30'));

  return (
    <List title="组合持仓">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction="row" gap={2} sx={{ mb: 2 }}>
          <DatePicker
            label="筛选开始时间"
            value={filterStartDate}
            onChange={(newValue) => setFilterStartDate(newValue)}
          />
          <DatePicker
            label="筛选结束时间"
            value={filterEndDate}
            onChange={(newValue) => setFilterEndDate(newValue)}
          />
        </Stack>
      </LocalizationProvider>

      <Box sx={{ mt: 2 }}> 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>组合ID</StyledTableCell>
                <StyledTableCell>组合名称</StyledTableCell>
                <StyledTableCell>持仓资产</StyledTableCell>
                <StyledTableCell>累计收益</StyledTableCell>
                <StyledTableCell>开始时间</StyledTableCell>
                <StyledTableCell>结束时间</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.assets}</StyledTableCell>
                  <StyledTableCell>{row.profit}</StyledTableCell>
                  <StyledTableCell>{row.startDate}</StyledTableCell>
                  <StyledTableCell>{row.endDate}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </List>
  );
};

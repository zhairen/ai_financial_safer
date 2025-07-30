import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { LineChart } from '@mui/x-charts/LineChart';
import * as React from 'react';

const dateFormatter = Intl.DateTimeFormat(undefined, {
  month: '2-digit',
  day: '2-digit'
});
const oneDay = 24 * 60 * 60 * 1000;

function randBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const transformStockData = (dates: Date[], values: number[]) => {
  return dates.map((date, index) => ({
    date: date.getTime(),
    value: values[index],
    category: '上证指数'
  }));
};

export const MarketQuotesPage = () => {
  const marketData = {
    stock: { name: 'A股', price: 3050.12, change: '+12.34', color: '#3ac47d' },
    bond: { name: '10年期国债', price: 2.68, change: '-0.02', color: '#d92550' },
    forex: { name: '美元/人民币', price: 7.15, change: '+0.03', color: '#2c7be5' }
  };

  const [running, setRunning] = React.useState(false);
  const [date, setDate] = React.useState(new Date(2024, 0, 1));
  const [stockData, setStockData] = React.useState<number[]>(() => 
    Array.from({ length: 50 }, (_, i) => 3000 + randBetween(-200, 200))
  );

  React.useEffect(() => {
    if (!running) return;
    const intervalId = setInterval(() => {
      setDate(prev => new Date(prev.getTime() + oneDay));
      setStockData(prev => [...prev.slice(1), prev.at(-1)! + randBetween(-50, 50)]);
    }, 100);
    return () => clearInterval(intervalId);
  }, [running]);

  const chartData = transformStockData(
    stockData.map((_, index) => new Date(date.getTime() + index * oneDay)),
    stockData
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        市场行情概览
      </Typography>

      {/* 恢复实时行情卡片（包含涨跌幅） */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* 股票行情卡片 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={marketData.stock.name} subheader="实时行情" />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: marketData.stock.color }}>
                {marketData.stock.price}
              </Typography>
              {/* 恢复涨跌幅显示 */}
              <Typography variant="body2" color="text.secondary">
                日涨跌幅：{marketData.stock.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 债券行情卡片 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={marketData.bond.name} subheader="实时行情" />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: marketData.bond.color }}>
                {marketData.bond.price}
              </Typography>
              {/* 恢复涨跌幅显示 */}
              <Typography variant="body2" color="text.secondary">
                日涨跌幅：{marketData.bond.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 外汇行情卡片 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title={marketData.forex.name} subheader="实时行情" />
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: marketData.forex.color }}>
                {marketData.forex.price}
              </Typography>
              {/* 恢复涨跌幅显示 */}
              <Typography variant="body2" color="text.secondary">
                日涨跌幅：{marketData.forex.change}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 重新实现的A股趋势图 */}
      <Card sx={{ p: 2 }}>
        <CardHeader title="A股近期走势" subheader="实时更新价格趋势（模拟数据）" />
        <div style={{ width: '100%' }}>
          <LineChart
            height={350}
            xAxis={[{
              dataKey: 'date',
              valueFormatter: (value) => dateFormatter.format(new Date(value)),
              label: '日期',
              tickMinStep: oneDay
            }]}
            yAxis={[{
              label: '指数点数',
              tickMinStep: 100,
              valueFormatter: (value) => value.toFixed(0)
            }]}
            series={[{
              dataKey: 'value',
              label: '上证指数',
              color: marketData.stock.color,
              area: true,
              showMark: false
            }]}
            dataset={chartData}
            margin={{ left: 70, right: 40 }}
          />
        </div>
      </Card>
    </Container>
  );
};
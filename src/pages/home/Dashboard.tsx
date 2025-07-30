import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader 
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { 
  LineChart, 
  LineSeries, 
  ChartsXAxis, 
  ChartsYAxis, 
  ChartsGrid, 
  ChartsTooltip, 
  PieChart,
  pieArcLabelClasses  // 新增导入
} from '@mui/x-charts';

// 资产分布数据类型（明确字段）
type AssetDistribution = {
  type: string;  // 资产类型（如股票/债券）
  value: number; // 占比数值（百分比）
};

// 收益趋势数据类型（明确字段）
type RevenueTrend = {
  date: string;  // 日期（如"2024-01-01"）
  amount: number;// 收益金额（万元）
};

export const DashboardPage = () => {
  // 模拟资产分布数据（符合AssetDistribution类型）
  const assetData: AssetDistribution[] = [
    { type: '股票', value: 45 },
    { type: '债券', value: 30 },
    { type: '基金', value: 15 },
    { type: '其他', value: 10 },
  ];

  // 模拟收益趋势数据（符合RevenueTrend类型）
  const revenueData: RevenueTrend[] = [
    { date: '01/01', amount: 112 },
    { date: '01/02', amount: 135 },
    { date: '01/03', amount: 98 },
    { date: '01/04', amount: 142 },
    { date: '01/05', amount: 155 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 页面头部 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <DashboardIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          资产管理仪表盘
        </Typography>
        <Typography variant="body2" color="text.secondary">
          核心资产数据概览与趋势分析
        </Typography>
      </Box>

      {/* 关键指标卡片 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', p: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">总管理规模</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>86.5亿</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', p: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">当日收益</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, color: '#3ac47d' }}>+128万</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', p: 2 }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary">资产类别数</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1 }}>12类</Typography>
            </CardContent>
          </Card>
        </Grid>        
      </Grid>

      {/* 资产分布图表（带类别说明） */}
      <Card sx={{ p: 2 }}>
        <CardHeader title="资产类别分布" subheader="当前配置占比" />
        {/* 使用Grid布局并排显示图表和图例 */}
        <Grid container alignItems="center" spacing={4}>
          {/* 饼图组件 */}
          <Grid item>
            <PieChart
              // 应用示例中的size配置
              width={200}
              height={200}
              series={[
                {
                  data: assetData,
                  arcLabel: (item) => `${item.value}%`,
                  arcLabelMinAngle: 35,
                  arcLabelRadius: '60%',
                  colors: ['#2c7be5', '#3ac47d', '#ff9029', '#d92550']
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fontWeight: 'bold',
                },
              }}
            >
              <ChartsTooltip />
            </PieChart>
          </Grid>

          {/* 类别说明（图例） */}
          <Grid item>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {assetData.map((item, index) => (
                <li key={item.type} style={{ display: 'flex', alignItems: 'center', mb: 8 }}>
                  {/* 颜色标识 */}
                  <div 
                    style={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: 4, 
                      backgroundColor: ['#2c7be5', '#3ac47d', '#ff9029', '#d92550'][index],
                      mr: 8 
                    }}
                  />
                  {/* 资产类型名称 */}
                  <Typography variant="body2">{item.type}</Typography>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};
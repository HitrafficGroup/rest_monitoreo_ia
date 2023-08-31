import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export const CardCounter = (props) => {
  const { value, sx,color_icono } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              conteo
            </Typography>
            <Typography variant="h6">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              bgcolor: color_icono,
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <DirectionsCarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

CardCounter.propTypes = {
  value: PropTypes.number,
  sx: PropTypes.object,
  color_icono:PropTypes.string
};

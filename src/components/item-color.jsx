
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';


export const ColorPicker = (props) => {
  const {fill,onClick,selected} = props;

  

  return (
    <div className={`color-picker  ${selected? "selected":""}`} onClick={onClick}  style={{backgroundColor:fill}}>
        {selected? <CheckIcon style={{color:"white"}}/>:""}
    </div>
      
  );
};

ColorPicker.propTypes = {
  onClick: PropTypes.func,
  fill: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

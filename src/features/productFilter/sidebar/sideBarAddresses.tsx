import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectFilterProvince } from "../../../app/store/ui/productFilterPage";
import { filterProvinces } from "../../../config.json";

export interface SideBarAddressesProps {}

export default function SideBarAddresses(props: SideBarAddressesProps) {
  const dispatch = useAppDispatch();
  const selectedProvinceId = useAppSelector(
    (state) => state.ui.productFilterPage.selectedProvinceId
  );
  return (
    <Box sx={{ mt: 1 }}>
      <Typography fontSize={17}>Theo nơi bán</Typography>
      <Box sx={{ mt: 1 }}>
        <RadioGroup
          value={selectedProvinceId}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.target.value);
            dispatch(selectFilterProvince(value ? value : null));
          }}
        >
          {filterProvinces.map((province) => {
            return (
              <FormControlLabel
                sx={{ height: 30 }}
                key={province.provinceId}
                value={province.provinceId}
                control={<Radio size="small" />}
                label={province.label}
              />
            );
          })}
        </RadioGroup>
      </Box>
    </Box>
  );
}

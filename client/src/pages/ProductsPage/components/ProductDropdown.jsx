import {
  TableCell,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import GLBoolean from "../../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import { toCapitalize } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { useDispatch } from "react-redux";
import { open_edit_product_modal } from "../productsPageSlice";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";

const ProductDropdown = ({ row, determineColor, colspan }) => {
  const dispatch = useDispatch();
  return (
    <TableRow sx={{ backgroundColor: determineColor(row), p: 0 }}>
      <TableCell colSpan={colspan}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, color: "white", p: 0 }}>
          <Grid container spacing={2}>
            {row?.options?.map((option, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: 5, p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {option.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {toCapitalize(option.optionType)}
                  </Typography>
                  {option.isAddOn && (
                    <Typography variant="body2" gutterBottom>
                      Is Add-On:
                    </Typography>
                  )}
                  <Divider />
                  <List dense>
                    {option.values?.map(value => (
                      <ListItem key={value._id} sx={{ p: 0 }}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Typography variant="body2">{value.value}</Typography>
                              {value.isDefault && <Chip label="Default" size="small" color="primary" />}
                            </Box>
                          }
                          secondary={
                            ((value.replacePrice && value.additionalCost > 0) ||
                              (option.isAddOn && value.replacePrice)) && (
                              <Typography variant="body2">
                                ${value.additionalCost.toFixed(2)}
                                <GLBoolean boolean={value.replacePrice} />
                              </Typography>
                            )
                          }
                        />
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {((value.replacePrice && value.additionalCost > 0) ||
                                (option.isAddOn && value.replacePrice)) && (
                                <Typography variant="body2">
                                  ${value.additionalCost.toFixed(2)}
                                  <GLBoolean boolean={value.replacePrice} />
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                        <ListItemText
                          primary={
                            <div className="jc-fe">
                              <GLIconButton
                                title="Edit"
                                onClick={() => {
                                  dispatch(API.detailsProduct(value.product._id));
                                  dispatch(open_edit_product_modal());
                                }}
                              >
                                <EditIcon color="white" />
                              </GLIconButton>
                              <GLIconButton
                                title="Copy Product"
                                onClick={() =>
                                  dispatch(
                                    API.saveProduct({
                                      ...value.product,
                                      _id: null,
                                      name: `${value.product.name} Copy`,
                                      pathname: `${value.product.pathname}_copy`,
                                    })
                                  )
                                }
                              >
                                <FileCopyIcon color="white" />
                              </GLIconButton>
                              <GLIconButton
                                onClick={() => dispatch(API.deleteProduct(value.product.pathname))}
                                title="Delete"
                              >
                                <DeleteIcon color="white" />
                              </GLIconButton>
                            </div>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductDropdown;

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
  Button,
} from "@mui/material";
import GLBoolean from "../../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import { toCapitalize } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { useDispatch } from "react-redux";
import { open_edit_product_modal, addOption } from "../productsPageSlice";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLFlexGrid from "../../../shared/GlowLEDsComponents/GLFlexGrid/GLFlexGrid";

const ProductDropdown = ({ row, determineColor, colspan }) => {
  const dispatch = useDispatch();
  console.log({ row });
  return (
    <TableRow sx={{ backgroundColor: determineColor(row), p: 0 }}>
      <TableCell colSpan={colspan}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, color: "white", p: 0 }}>
          <GLFlexGrid gap={15}>
            {row?.options?.map((option, i) => (
              <Box key={i} sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: 5, p: 2 }} flexGrow={1}>
                <Typography variant="h6" gutterBottom>
                  {option.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {toCapitalize(option.optionType)}
                </Typography>
                {option.isAddOn && (
                  <Typography variant="body2" gutterBottom>
                    Is Add-On
                  </Typography>
                )}
                <Divider />
                <List dense>
                  {option.values?.map(value => (
                    <ListItem key={value._id} sx={{ p: 0 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Typography variant="body2">{value.value}</Typography>
                              {value.isDefault && <Chip label="Default" size="small" color="primary" />}
                            </Box>
                            <Box display={"flex"} justifyContent={"flex-end"}>
                              {value.additionalCost > 0 && (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                                  <Typography variant="body2">${value.additionalCost.toFixed(2)}</Typography>
                                  {/* <GLBoolean tooltip={"Replace Price"} boolean={value.replacePrice} /> */}
                                </Box>
                              )}
                              {value.replacePrice && (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                                  <Typography variant="body2">${value.product.price}</Typography>
                                </Box>
                              )}
                              <GLIconButton
                                tooltip="Edit"
                                onClick={() => {
                                  dispatch(API.detailsProduct({ pathname: value.product._id, openEditModal: true }));
                                }}
                              >
                                <EditIcon color="white" />
                              </GLIconButton>
                              <GLIconButton
                                tooltip="Create New Option Product From "
                                onClick={() =>
                                  dispatch(
                                    API.createOptionProduct({
                                      productId: row._id,
                                      optionProductId: value.product._id,
                                      optionId: option._id,
                                    })
                                  )
                                }
                              >
                                <FileCopyIcon color="white" />
                              </GLIconButton>
                              <GLIconButton
                                onClick={() => dispatch(API.deleteProduct(value.product.pathname))}
                                tooltip="Delete"
                              >
                                <DeleteIcon color="white" />
                              </GLIconButton>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText
                      primary={
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() =>
                            dispatch(
                              addOption({
                                row,
                                optionId: option._id,
                              })
                            )
                          }
                        >
                          Add Option
                        </Button>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
            ))}
          </GLFlexGrid>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ProductDropdown;

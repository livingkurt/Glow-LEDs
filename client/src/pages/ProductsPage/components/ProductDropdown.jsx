import {
  TableCell,
  TableRow,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  Divider,
  Tooltip,
  useTheme,
} from "@mui/material";
import { toCapitalize } from "../../../utils/helper_functions";
import * as API from "../../../api";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLFlexGrid from "../../../shared/GlowLEDsComponents/GLFlexGrid/GLFlexGrid";
import GLBoolean from "../../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const ProductDropdown = ({ row, determineColor, colspan }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <TableRow sx={{ backgroundColor: determineColor(row), p: 0 }}>
      <TableCell colSpan={colspan}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, color: "white", p: 0 }}>
          <GLFlexGrid gap={15}>
            {row?.options?.map((option, i) => (
              <Box key={i} sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", borderRadius: 5, p: 2 }} flexGrow={1}>
                <Typography variant="h6" gutterBottom>
                  {option.name} {option.isAddOn && "Is Add-On"}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {toCapitalize(option.optionType)}
                </Typography>

                <Divider />
                <List dense>
                  {option.values?.map(value => (
                    <ListItem
                      key={value._id}
                      sx={{
                        backgroundColor: value.isDefault ? theme.palette.primary.main : "",
                        borderRadius: 10,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              {(value?.filament || value?.colorCode?.length > 0) && (
                                <Box display="flex" gap={1}>
                                  <Tooltip title={value?.filament ? value?.filament.color_code : value?.colorCode}>
                                    <Box
                                      sx={{
                                        width: "36px",
                                        height: "14px",
                                        borderRadius: "4px",
                                        bgcolor: value?.filament ? value?.filament.color_code : value?.colorCode,
                                        boxShadow: "0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)",
                                      }}
                                    />
                                  </Tooltip>
                                </Box>
                              )}
                              <Typography variant="body2">{value.name}</Typography>
                              {/* {value.isDefault && <Chip label="Default" size="small" color="primary" />} */}
                              {value?.filament && !value?.filament?.active ? (
                                <Chip label="Inactive" size="small" color="error" />
                              ) : (
                                ""
                              )}
                            </Box>

                            <Box display={"flex"} justifyContent={"flex-end"}>
                              {value.additionalCost > 0 && (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                                  <Typography variant="body2">+${value.additionalCost.toFixed(2)}</Typography>
                                </Box>
                              )}
                              {value.replacePrice && (
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 1 }}>
                                  <GLBoolean tooltip={"Replace Price"} boolean={!!value.replacePrice} />
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
                  {/* <ListItem sx={{ p: 0 }}>
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
                  </ListItem> */}
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
